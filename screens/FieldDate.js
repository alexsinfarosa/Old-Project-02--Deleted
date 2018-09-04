import React from "react";
import { inject, observer } from "mobx-react";
import DatePicker from "react-native-datepicker";

import { View, Text, StyleSheet, Button } from "react-native";
import { Icon } from "native-base";

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
    padding: 16
    // backgroundColor: "tomato"
  },
  bottom: {
    flex: 0.3,
    padding: 8,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#1faadb"
  },
  h1: {
    fontSize: 20
  }
});

class FieldDate extends React.Component {
  render() {
    const {
      latLon,
      irrigationDate,
      setIrrigationDate,
      addField
    } = this.props.app.fieldsStore;

    return (
      <View style={styles.root}>
        <View style={styles.top}>
          <Icon
            name="ios-arrow-back"
            onPress={() => this.props.navigation.navigate("FieldLocation")}
          />
          <View
            style={{
              flex: 5,
              alignItems: "center",
              paddingBottom: 7
            }}
          >
            <Text style={styles.h1}>Date of last irrigation</Text>
          </View>

          <Button
            style={{
              flex: 1,
              alignItems: "flex-start"
            }}
            onPress={() => console.log("")}
            title=""
          />
        </View>

        <View style={styles.main}>
          <DatePicker
            style={{ width: "100%" }}
            date={irrigationDate}
            mode="date"
            placeholder="Select Date"
            format="MMMM Do, YYYY"
            showIcon={false}
            // minDate="2016-05-01"
            maxDate={new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateText: {
                fontSize: 16,
                color: "#646464"
              },
              placeholderText: {
                fontSize: 16,
                color: "#B0B0B0"
              },
              dateInput: {
                // marginLeft: 36
                borderWidth: 0,
                borderBottomWidth: 1,
                borderColor: "#171717",
                alignItems: "flex-start"
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => setIrrigationDate(date)}
          />
        </View>

        <View style={styles.bottom}>
          <Button
            disabled={latLon ? false : true}
            onPress={() => {
              addField();
              this.props.navigation.navigate("Home");
            }}
            title="Create Field"
            color="white"
          />
        </View>
      </View>
    );
  }
}

export default inject("app")(observer(FieldDate));
