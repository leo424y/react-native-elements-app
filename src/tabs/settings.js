import React from 'react';

import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Settings from '../views/settings';

const SettingsTabView = ({ navigation }) => (
  <Settings banner="Settings" navigation={navigation} />
);

const SettingsTab = StackNavigator({
  Home: {
    screen: SettingsTabView,
    path: '/',
    navigationOptions: ({ navigation }) => ({
      title: 'Fonts',
      headerLeft: (
        <Icon
          name="menu"
          size={30}
          type="entypo"
          containerStyle={{ marginLeft: 10 }}
          onPress={() => navigation.navigate('DrawerOpen')}
        />
      ),
    }),
  },
});

export default SettingsTab;
