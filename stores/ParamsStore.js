import { decorate, observable, action, computed, reaction } from "mobx";

export default class ParamsStore {
  constructor(
    latLon,
    irrigationDate,
    soilWaterCapacity = "Medium",
    crop = "Grass",
    isSelected = false
  ) {
    this.latLon = latLon;
    this.irrigationDate = irrigationDate;
    this.soilWaterCapacity = soilWaterCapacity;
    this.crop = crop;
    this.isSelected = isSelected;

    reaction(() => this.asJson, () => console.log(this.asJson));
  }

  latLon;
  setLatLon = d => (this.latLon = d);
  irrigationDate;
  setIrrigationDate = d => (this.irrigationDate = d);
  soilWaterCapacity;
  crop;
  isSelected;

  get asJson() {
    return {
      latLon: this.latLon,
      irrigationDate: this.irrigationDate,
      soilWaterCapacity: this.soilWaterCapacity,
      crop: this.crop,
      isSelected: this.isSelected
    };
  }
}

decorate(ParamsStore, {
  latLon: observable,
  setLatLon: action,
  irrigationDate: observable,
  setIrrigationDate: action,
  soilWaterCapacity: observable,
  crop: observable,
  isSelected: observable
});
