import { decorate, observable, action, computed, reaction, when } from "mobx";
import { AsyncStorage } from "react-native";
import { API_KEY } from "../utils/weatherAPIKey";
import axios from "axios";

export default class FieldsStore {
  constructor() {
    console.log(this.fields.length);
    console.log(this.selectedField);
    when(
      () => this.fields.length > 0,
      () => {
        console.log("fields is empty");
        this.readFromLocalstorage();
        // this.fetchWeather();
      }
    );

    reaction(() => this.selectedField, () => this.fetchWeather());
    // reaction(() => this.selectedField, () => console.log(this.selectedField));
  }

  get areFields() {
    return this.fields.length > 0;
  }

  id;
  name;
  lat;
  lon;
  irrigationDate;
  soilWaterCapacity = "Medium";
  crop = "Grass";
  isSelected = false;
  isLoading = false;

  setIrrigationDate = d => (this.irrigationDate = d);
  setLatLon = d => {
    this.lat = d.lat;
    this.lon = d.lng;
  };
  setName = d => (this.name = d);

  get asJson() {
    return {
      id: this.id,
      name: this.name,
      lat: this.lat,
      lon: this.lon,
      irrigationDate: this.irrigationDate,
      soilWaterCapacity: this.soilWaterCapacity,
      crop: this.crop,
      isSelected: this.isSelected
    };
  }

  fields = [];
  addField = () => {
    if (this.fields.length !== 0) {
      this.fields.map(field => (field.isSelected = false));
    }
    const id = Date.now().toString();
    const field = { ...this.asJson, id };
    field.isSelected = true;
    this.fields.push(field);
    this.writeToLocalstorage();
    this.irrigationDate = null;
  };

  selectField = id => {
    this.fields.map(field => {
      field.id === id ? (field.isSelected = true) : (field.isSelected = false);
    });
  };

  get selectedField() {
    if (this.fields.length !== 0) {
      const field = this.fields.filter(field => field.isSelected)[0];
      return !field ? this.fields[0] : field;
    }
  }

  get url() {
    return this.selectedField
      ? `https://api.darksky.net/forecast/${API_KEY}/${
          this.selectedField.lat
        },${this.selectedField.lon}?exclude='flags,minutely,alerts,hourly'`
      : `https://api.darksky.net/forecast/${API_KEY}/42.4439614,-76.5018807?exclude=flags,minutely,alerts,hourly`;
  }

  forecast;
  // setForecast = d => (this.forecast = d);
  fetchWeather() {
    this.isLoading = true;
    return axios
      .get(this.url)
      .then(res => {
        // console.log(res.data);
        this.forecast = {
          currently: res.data.currently,
          daily: res.data.daily,
          lat: res.data.latitude,
          lon: res.data.longitude
        };
        this.isLoading = false;
      })
      .catch(err => {
        console.log("Failed to load forecast weather data", err);
      });
  }

  removeField = id => {
    const idx = this.fields.findIndex(field => field.id === id);
    this.fields.splice(idx, 1);
    this.writeToLocalstorage();
  };

  //   localstorage
  writeToLocalstorage = async () => {
    console.log("writing to localStorage");
    const fields = this.fields.slice();
    try {
      await AsyncStorage.setItem(`irriTool-model`, JSON.stringify(fields));
    } catch (error) {
      console.log(`There was an error writing to asynStorage: ${error}`);
    }
  };

  readFromLocalstorage = async () => {
    console.log("reading from localStorage");
    try {
      const retreivedField = await AsyncStorage.getItem("irriTool-model");
      const fields = JSON.parse(retreivedField);
      // console.log(fields); // if nothing in localStorage, fields is null
      if (fields) {
        fields[fields.length - 1].isSelected = true;
        this.fields = fields;
      }
    } catch (error) {
      console.log(error);
    }
  };

  defaultValueMap = "";
  setDefaultValueMap = d => (this.defaultValueMap = d);

  data = [
    {
      date: "July 31",
      noDeficit: 0,
      deficitNoStress: 0,
      deficitStress: 0,
      severeStress: 0
    },
    {
      date: "August 1",
      noDeficit: 3,
      deficitNoStress: 3,
      deficitStress: 3,
      severeStress: 3
    },
    {
      date: "August 2",
      noDeficit: 9,
      deficitNoStress: 9,
      deficitStress: 9,
      severeStress: 9
    }
  ];
}

decorate(FieldsStore, {
  areFields: computed,
  id: observable,
  name: observable,
  lat: observable,
  lon: observable,
  irrigationDate: observable,
  soilWaterCapacity: observable,
  crop: observable,
  isSelected: observable,
  isLoading: observable,
  setField: action,
  setName: action,
  removeField: action,
  fields: observable,
  selectedField: computed,
  selectField: action,
  setIrrigationDate: action,
  setLatLon: action,
  data: observable,
  defaultValueMap: observable,
  setDefaultValueMap: action,
  url: computed,
  fetchWeather: action,
  forecast: observable
});
