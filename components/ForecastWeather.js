import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { StyleSheet, View, Text, Image } from "react-native";

import format from "date-fns/format";
import { Icon } from "native-base";
import { weatherIcons } from "../utils/weatherIcons";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: "pink",
    marginLeft: 16,
    marginRight: 16
  },
  top: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "pink"
  },
  middle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "teal"
  },
  bottom: {
    flex: 6,
    // backgroundColor: "tomato",
    alignItems: "stretch",
    marginBottom: 32
  },
  icon: {
    width: 25,
    height: 25
  }
});

class ForecastWeather extends Component {
  render() {
    const { forecast, selectedField } = this.props.app.fieldsStore;

    return (
      <View style={styles.root}>
        <View style={styles.top}>
          <Text style={{ fontSize: 20 }}>
            {selectedField ? selectedField.name : ""}
          </Text>
        </View>

        <View style={styles.middle}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                width: 40,
                height: 40,
                marginRight: 8
              }}
              source={weatherIcons[forecast.daily.data[0].icon]}
            />
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              {Math.round(forecast.currently.temperature, 1)}˚
            </Text>
          </View>
          <Text style={{ fontSize: 14 }}>{forecast.currently.summary}</Text>
        </View>

        <View style={styles.bottom}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Next 7 Days</Text>
          <Text style={{ fontSize: 12, marginBottom: 32 }}>
            {forecast.daily.summary}
          </Text>
          {forecast.daily.data.map(day => {
            // console.log(day.summary, day.icon);
            return (
              <View
                key={day.time}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center"
                }}
              >
                <View style={{ alignItems: "center", width: 40 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16
                    }}
                  >
                    {format(new Date(day.time) * 1000, "ddd").toUpperCase()}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                      onPress={null}
                      name="ios-water"
                      style={{
                        fontSize: 12,
                        color: "#4A86E5",
                        marginRight: 4
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#4A86E5",
                        textAlign: "center"
                      }}
                    >
                      {Math.round(day.precipProbability) * 100}%
                    </Text>
                  </View>
                </View>
                <Image style={styles.icon} source={weatherIcons[day.icon]} />
                <Text style={{ fontSize: 16 }}>
                  {Math.round(day.temperatureLow, 1)}˚
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {Math.round(day.temperatureHigh, 1)}˚
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default inject("app")(observer(ForecastWeather));
