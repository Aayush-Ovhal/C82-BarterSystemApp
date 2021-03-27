import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {BottomTabNavigator} from './bottomTabNavigator';
import CustomSideBarMenu from './customSideBarMenu';
import SettingScreen from '../screens/SettingScreen';

import {Icon} from "react-native-elements";

export const DrawerNavigator = createDrawerNavigator({
    HomeScreen: {
        screen:  BottomTabNavigator,
        navigationOptions: {
            drawerIcon: <Icon name="home" type = "fontawesome5"/>
        }
    },
    SettingScreen: {
        screen: SettingScreen
    }
},
{
  contentComponent: CustomSideBarMenu
}
)