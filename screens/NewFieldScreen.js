import React from "react";
import { inject, observer } from "mobx-react";
import { StyleSheet, View, Text, Button } from "react-native";

class NewFieldScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>New Field</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }
});

export default inject("app")(observer(NewFieldScreen));
