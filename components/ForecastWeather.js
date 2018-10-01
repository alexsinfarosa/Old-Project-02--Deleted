import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { StyleSheet, View, Text } from "react-native";

import format from "date-fns/format";
import { Icon } from "native-base";

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
          <Text style={{ fontSize: 27 }}>
            {Math.round(forecast.currently.temperature, 1)}˚
          </Text>
          <Text style={{ fontSize: 14 }}>{forecast.currently.summary}</Text>
        </View>

        <View style={styles.bottom}>
          <Text style={{ fontSize: 18 }}>Next 7 Days</Text>
          <Text style={{ fontSize: 12, marginBottom: 32 }}>
            {forecast.daily.summary}
          </Text>
          {forecast.daily.data.map(day => {
            return (
              <View
                key={day.time}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center"
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text>{format(new Date(day.time) * 1000, "ddd")}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                      onPress={null}
                      name="ios-water"
                      style={{
                        fontSize: 10,
                        color: "#4A86E5",
                        marginRight: 4
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#4A86E5",
                        textAlign: "center"
                      }}
                    >
                      {Math.round(day.precipProbability) * 100}%
                    </Text>
                  </View>
                </View>
                <Text>ICON</Text>
                <Text>{Math.round(day.temperatureLow, 1)}˚</Text>
                <Text>{Math.round(day.temperatureHigh, 1)}˚</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default inject("app")(observer(ForecastWeather));
