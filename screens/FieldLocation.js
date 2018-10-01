import React from "react";
import { inject, observer } from "mobx-react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { View, Text, StyleSheet } from "react-native";
import { Icon, Button } from "native-base";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white"
  },
  top: {
    flexDirection: "row",
    flex: 0.7,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  main: {
    flex: 3,
    padding: 32
    // backgroundColor: "tomato",
    // height: 200
  },
  bottom: {
    flex: 0.3,
    padding: 16,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#1faadb"
  },
  h1: {
    fontSize: 20
  }
});

class FieldLocation extends React.Component {
  render() {
    const {
      lat,
      setLatLon,
      setName,
      defaultValueMap
    } = this.props.app.fieldsStore;
    const { scrollForward } = this.props;

    return (
      <View style={styles.root}>
        <View style={styles.top}>
          <Icon
            style={{ padding: 8, fontSize: 35 }}
            name="ios-arrow-back"
            onPress={() => this.props.navigation.navigate("Home")}
          />
          <View
            style={{
              flex: 5,
              alignItems: "center",
              paddingBottom: 7
            }}
          >
            <Text style={styles.h1}>Where is your field?</Text>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "flex-start"
            }}
          />
        </View>

        <View style={styles.main}>
          <GooglePlacesAutocomplete
            placeholder="Enter Location"
            minLength={3}
            autoFocus={false}
            listViewDisplayed="auto"
            returnKeyType={"search"}
            fetchDetails={true}
            onPress={(data, details = null) => {
              setLatLon(details.geometry.location);
              setName(data.description);
            }}
            getDefaultValue={() => defaultValueMap}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: "AIzaSyAUk9begav92si1W6yVe39GlOO7Au2aB0A",
              language: "en" // language of the results
              // types: "(cities)" // default: 'geocode'
            }}
            styles={{
              textInputContainer: {
                backgroundColor: "rgba(0,0,0,0)",
                borderTopWidth: 0,
                borderBottomWidth: 0
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: "#5d5d5d",
                fontSize: 16,
                borderBottomWidth: 1
              },
              predefinedPlacesDescription: {
                color: "#1faadb"
              }
            }}
            debounce={200}
            currentLocation={true}
            currentLocationLabel="Current location"
            nearbyPlacesAPI="GoogleReverseGeocoding"
          />
        </View>

        <View style={styles.bottom}>
          <Button
            full
            transparent
            disabled={lat ? false : true}
            onPress={() => this.props.navigation.navigate("FieldDate")}
          >
            <Text
              style={{ opacity: lat ? 1 : 0.7, color: "white", fontSize: 25 }}
            >
              Select Date
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default inject("app")(observer(FieldLocation));
