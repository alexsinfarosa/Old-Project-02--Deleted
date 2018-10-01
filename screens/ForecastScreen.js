import React from "react";
import { inject, observer } from "mobx-react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "native-base";

import ForecastWeather from "../components/ForecastWeather";

class ForecastScreen extends React.Component {
  render() {
    const { forecast } = this.props.app.fieldsStore;

    return (
      <View style={styles.container}>
        <View style={styles.colFlexEnd}>
          <View style={styles.colToRow}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text />
            </View>
            <View style={{ flex: 2, alignItems: "center" }}>
              <Icon
                name="ios-cloud"
                style={{ fontSize: 37, color: "#355691", padding: 8 }}
              />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Icon
                onPress={this.props.scrollForward}
                name="ios-stats"
                style={{ fontSize: 30, color: "#c5c6c8", padding: 8 }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 8
            // justifyContent: "center",
            // alignItems: "center"
          }}
        >
          {forecast && <ForecastWeather />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  colFlexEnd: {
    flex: 1.1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 16
  },
  colToRow: {
    flexDirection: "row"
  },
  colCentered: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  field: {
    height: 100,
    padding: 8
  }
});

export default inject("app")(observer(ForecastScreen));
