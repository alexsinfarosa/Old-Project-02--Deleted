import React from "react";
import { inject, observer } from "mobx-react";
import { StyleSheet, View, Text } from "react-native";

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
        <Swiper
          showsButtons={false}
          showsPagination={false}
          loop={false}
          index={0}
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
