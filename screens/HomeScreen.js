import React from "react";
import { inject, observer } from "mobx-react";
import { StyleSheet, View } from "react-native";
import { Button, Text, H1, H2 } from "native-base";
import Swiper from "react-native-swiper";

// components
import ForecastScreen from "./ForecastScreen";
import FieldsScreen from "./FieldsScreen";
import GraphScreen from "./GraphScreen";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  scrollForward = () => this.myRef.current.scrollBy(1);
  scrollBack = () => this.myRef.current.scrollBy(-1);
  scrollBy = d => this.myRef.current.scrollBy(d);

  render() {
    const {
      homePageIdx,
      setHomePageIdx,
      selectedField,
      isLoading,
      fields
    } = this.props.app.fieldsStore;

    return (
      <View style={styles.container}>
        {!isLoading &&
          fields.length > 0 && (
            <Swiper
              showsButtons={false}
              showsPagination={false}
              loop={false}
              index={homePageIdx}
              ref={this.myRef}
              onIndexChanged={idx => setHomePageIdx(idx)}
              // activeDotColor="#f4511e"
            >
              <ForecastScreen
                idx={homePageIdx}
                scrollForward={this.scrollForward}
              />
              <GraphScreen
                field={selectedField}
                idx={homePageIdx}
                scrollBack={this.scrollBack}
                scrollForward={this.scrollForward}
                navigation={this.props.navigation}
                scrollBy={this.scrollBy}
              />
              <FieldsScreen
                idx={homePageIdx}
                scrollBack={this.scrollBack}
                navigation={this.props.navigation}
              />
            </Swiper>
          )}
        {!isLoading &&
          fields.length === 0 && (
            <View
              style={{
                flex: 8,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  marginBottom: 96,
                  width: 350,
                  height: 100,
                  // backgroundColor: "pink",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <H1
                  style={{
                    textAlign: "center",
                    color: "#222222",
                    marginBottom: 8,
                    padding: 8,
                    fontSize: 35
                  }}
                >
                  Welcome to
                </H1>
                <H1
                  style={{
                    textAlign: "center",
                    color: "#222222",
                    marginBottom: 8,
                    padding: 8,
                    fontSize: 35
                  }}
                >
                  CSF Water Deficit
                </H1>
                <H1
                  style={{
                    textAlign: "center",
                    color: "#222222",
                    marginBottom: 8,
                    padding: 8,
                    fontSize: 35
                  }}
                >
                  Calculator!
                </H1>
              </View>
              <View>
                <Button
                  bordered
                  style={{
                    borderColor: "#355691"
                  }}
                  onPress={() => {
                    this.props.navigation.navigate("FieldLocation");
                  }}
                >
                  <Text
                    style={{
                      color: "#355691"
                    }}
                  >
                    Add Field
                  </Text>
                </Button>
              </View>
            </View>
          )}
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

export default inject("app")(observer(HomeScreen));
