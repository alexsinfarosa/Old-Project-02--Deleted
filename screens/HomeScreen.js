import React from "react";
import { inject, observer } from "mobx-react";
import { StyleSheet, View } from "react-native";
import { Button, Text, H1, H2 } from "native-base";
import Swiper from "react-native-swiper";

// components
import ForecastScreen from "./ForecastScreen";
import FieldsScreen from "./FieldsScreen";
import GraphScreen from "./GraphScreen";
import NewFieldScreen from "./NewFieldScreen";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    idx: 1
  };

  scrollForward = () => this.myRef.current.scrollBy(1);
  scrollBack = () => this.myRef.current.scrollBy(-1);

  render() {
    // const { isNewField } = this.props.app.fieldsStore;

    return (
      <View style={styles.container}>
        {this.props.app.fieldsStore.fields.length === 0 ? (
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
        ) : (
          <Swiper
            showsButtons={false}
            showsPagination={false}
            loop={false}
            index={1}
            ref={this.myRef}
            onIndexChanged={idx => this.setState({ idx })}
            // activeDotColor="#f4511e"
          >
            <ForecastScreen
              idx={this.state.idx}
              scrollForward={this.scrollForward}
            />
            <GraphScreen
              field={this.props.app.fieldsStore.selectedField}
              idx={this.state.idx}
              scrollBack={this.scrollBack}
              scrollForward={this.scrollForward}
              navigation={this.props.navigation}
            />
            <FieldsScreen
              idx={this.state.idx}
              scrollBack={this.scrollBack}
              navigation={this.props.navigation}
            />
          </Swiper>
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
