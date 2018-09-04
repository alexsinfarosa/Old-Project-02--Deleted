import React from "react";
import { inject, observer } from "mobx-react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "native-base";

class Header extends React.Component {
  render() {
    const { swiperTitle } = this.props.app.fieldsStore;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text />
        </View>
        <View style={{ flex: 3, alignItems: "center" }}>
          <Text style={styles.text}>{swiperTitle}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Icon
            style={{ color: "#fff" }}
            onPress={e => console.log(e)}
            name="ios-add"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontWeight: "bold"
  }
});

export default inject("app")(observer(Header));
