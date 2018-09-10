import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { StyleSheet, View, Text } from "react-native";

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
    backgroundColor: "tomato"
  }
});

class ForecastWeather extends Component {
  render() {
    const { forecast, selectedField } = this.props.app.fieldsStore;

    return (
      <View style={styles.root}>
        <View style={styles.top}>
          <Text>{selectedField.name}</Text>
        </View>

        <View style={styles.middle}>
          <Text style={{ fontSize: 24 }}>
            {Math.round(forecast.currently.temperature, 1)}˚
          </Text>
        </View>

        <View style={styles.bottom}>
          <Text style={{ fontSize: 18 }}>Next 7 Days</Text>
          {forecast.daily.data.map(day => {
            return <Text key={day.time}>{day.summary}</Text>;
          })}
        </View>
      </View>
    );
  }
}

export default inject("app")(observer(ForecastWeather));
