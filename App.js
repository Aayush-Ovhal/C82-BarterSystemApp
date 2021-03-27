import * as React from 'react';
import {View} from 'react-native'
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { BottomTabNavigator } from './components/bottomTabNavigator';
import LSscreen from './screens/LS_screen';
import {DrawerNavigator} from './components/appDrawerNavigator'

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const SwitchNavigatior = createSwitchNavigator({
  LSscreen: {screen: LSscreen},
  BottomTab: {screen: DrawerNavigator}
});

const AppContainer = createAppContainer(SwitchNavigatior);