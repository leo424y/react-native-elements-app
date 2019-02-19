import React from 'react';

import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Settings from '../views/settings-4-code';

const SettingsTabView = ({ navigation }) => (
  <Settings banner="讀取碼" navigation={navigation} />
);

const SettingsTab = StackNavigator({
  Home: {
    screen: SettingsTabView,
    path: '/',
    navigationOptions: ({ navigation }) => ({
      title: '讀取碼',
      // headerLeft: (
      //   <Icon
      //     name="menu"
      //     size={30}
      //     type="entypo"
      //     containerStyle={{ marginLeft: 10 }}
      //     onPress={() => navigation.navigate('DrawerOpen')}
      //   />
      // ),
    }),
  },
});

export default SettingsTab;
