import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ButtonsTab from '../tabs/buttons';
import ListsTab from '../tabs/lists';
import InputTab from '../tabs/input';
import FontsTab from '../tabs/fonts';
import SettingsTab from '../tabs/settings';


const Components = TabNavigator(
  {
    // ButtonsTab: {
    //   screen: ButtonsTab,
    //   path: '/buttons',
    //   navigationOptions: {
    //     tabBarLabel: 'Buttons',
    //     tabBarIcon: ({ tintColor, focused }) => (
    //       <Icon
    //         name={focused ? 'emoticon-cool' : 'emoticon-neutral'}
    //         size={30}
    //         type="material-community"
    //         color={tintColor}
    //       />
    //     ),
    //   },
    // },
    ListsTab: {
      screen: ListsTab,
      path: '/lists',
      navigationOptions: {
        tabBarLabel: '總覽',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon name="list" size={30} type="entypo" color={tintColor} />
        ),
      },
    },
    InputTab: {
      screen: InputTab,
      path: '/input',
      navigationOptions: {
        tabBarLabel: '登入',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name="wpforms"
            size={30}
            type="font-awesome"
            color={tintColor}
          />
        ),
      },
    },
    // FontsTab: {
    //   screen: FontsTab,
    //   path: '/fonts',
    //   navigationOptions: {
    //     tabBarLabel: 'Fonts',
    //     tabBarIcon: ({ tintColor, focused }) => (
    //       <Icon
    //         name={focused ? 'font' : 'font'}
    //         size={30}
    //         type="font-awesome"
    //         color={tintColor}
    //       />
    //     ),
    //   },
    // },
    SettingsTab: {
      screen: SettingsTab,
      path: '/fonts',
      navigationOptions: {
        tabBarLabel: '讀取碼',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'font' : 'font'}
            size={30}
            type="font-awesome"
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'ListsTab',
    animationEnabled: false,
    swipeEnabled: true,
    // Android's default option displays tabBars on top, but iOS is bottom
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#e91e63',
      // Android's default showing of icons is false whereas iOS is true
      showIcon: true,
    },
  }
);

Components.navigationOptions = {
  drawerLabel: '首頁',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="settings"
      size={30}
      iconStyle={{
        width: 30,
        height: 30,
      }}
      type="material"
      color={tintColor}
    />
  ),
};

// Workaround to avoid crashing when you come back on Components screen
// and you were not on the Buttons tab
export default StackNavigator(
  {
    ComponentsTabs: { screen: Components },
  },
  {
    headerMode: 'none',
  }
);
