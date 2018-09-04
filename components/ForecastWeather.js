import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  root: {
    backgroundColor: "pink"
  }
});

class ForecastWeather extends Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  render() {
    return (
      <View style={styles.root}>
        <Text>Ciccio</Text>
        <Text>Ciccio</Text>
        <Text>Ciccio</Text>
      </View>
    );
  }
}

export default inject("app")(observer(ForecastWeather));
