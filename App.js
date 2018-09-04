import React from "react";
import { Provider } from "mobx-react";
import { createStackNavigator } from "react-navigation";

import RootStore from "./stores/RootStore";

import HomeScreen from "./screens/HomeScreen";
import FieldLocation from "./screens/FieldLocation";
import FieldDate from "./screens/FieldDate";

// router
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    FieldLocation: FieldLocation,
    FieldDate: FieldDate
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

//  mobx
const app = new RootStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider app={app}>
        <RootStack />
      </Provider>
    );
  }
}
