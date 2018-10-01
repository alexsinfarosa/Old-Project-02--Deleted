import React from "react";
import { inject, observer } from "mobx-react";
import { StyleSheet, View } from "react-native";
import { Icon, Button, Text } from "native-base";

class GraphScreen extends React.Component {
  render() {
    const { field } = this.props;
    const { setIsNewField } = this.props.app.fieldsStore;

    return (
      <View style={styles.container}>
        <View style={styles.colFlexEnd}>
          <View style={styles.colToRow}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Icon
                onPress={this.props.scrollBack}
                name="ios-cloud"
                style={{ fontSize: 30, color: "#c5c6c8", padding: 8 }}
              />
            </View>
            <View style={{ flex: 2, alignItems: "center" }}>
              <Icon
                name="md-stats"
                style={{ fontSize: 37, color: "#355691", padding: 8 }}
              />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Icon
                onPress={this.props.scrollForward}
                name="ios-water"
                style={{
                  fontSize: 30,
                  color: "#c5c6c8",
                  padding: 8
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 8,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={styles.field}>
            <Text style={{ fontSize: 20 }}>{field.name}</Text>
            <Text style={{ color: "teal", fontSize: 16 }}>
              {field.irrigationDate}
            </Text>
          </View>
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

export default inject("app")(observer(GraphScreen));
