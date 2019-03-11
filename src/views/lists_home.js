import _ from 'lodash';

import React, { Component } from 'react';
import { 
  RefreshControl, 
  ActivityIndicator, 
  View, 
  ScrollView, 
  StyleSheet, 
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image, ListView, Alert, AlertIOS 
} from 'react-native';

import {
  Text,
  Card,
  Tile,
  Icon,
  ListItem,
  Avatar,
} from 'react-native-elements';

import colors from '../config/colors';

import { Permissions, Notifications, SecureStore} from 'expo';

const log = () => console.log('this is an example method');

const Stor = async (key: string, value?: Object) => {

  let json = ''

  if ('object' == typeof value) {
    SecureStore.setItemAsync(key, JSON.stringify(value))
  }
  else {
    json = await Expo.SecureStore.getItemAsync(key)
    return json
  }

}

let obj = {
  something: 'hey there'
}
//console.log(obj);

Stor('some_key', obj) // Stores the object as a string.

// let my_var = Stor('some_key') // Gets the stringified value out of storage.
SecureStore.getItemAsync('some_key').then((data)=>{
  //console.log("Storage content:",data);
});

class Icons extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      refreshing: false,
      token: null,
      notification: null,
      title: '通知系統',
      body: '有新訊息！',
    }
  }

  async registerForPushNotifications() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        return;
      }
    }

    const token = await Notifications.getExpoPushTokenAsync();

    this.subscription = Notifications.addListener(this.handleNotification);

    this.setState({
      token,
    });
  }

  sendPushNotification(token = this.state.token, title = this.state.title, body = this.state.body) {
    return fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
        title: title,
        body: body,
        data: { message: `${title} - ${body}` },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  }

  handleNotification = notification => {
    this.setState({
      notification,
    });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    fetch('https://demo0195867.mockable.io/a.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      })
    .then(() => {
      this.setState({ refreshing: false });
      this.sendPushNotification();
    });
  }

  componentDidMount() {
    this.registerForPushNotifications();

    return fetch('https://demo0195867.mockable.io/a.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  renderRow(rowData, sectionID) {
    return (
      <ListItem
        key={sectionID}
        onPress={log}
        title={rowData.title}
        chevron
        bottomDivider
      />
    );
  }

  render() {
    const { navigation } = this.props;
    const { selectedIndex } = this.state;

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }  
    
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
      <View style={{flex: 1, paddingTop:60}}>
        <KeyboardAvoidingView style={styles.keyboard} behavior="position" hidden>
          <TextInput
            style={styles.input}
            onChangeText={title => this.setState({ title })}
            maxLength={100}
            value={this.state.title}
          />
          <Text style={styles.text}>Message</Text>
          <TextInput
            style={styles.input}
            onChangeText={body => this.setState({ body })}
            maxLength={100}
            value={this.state.body}
          />
          <TouchableOpacity
            onPress={() => this.registerForPushNotifications()}
            style={styles.touchable}>
            <Text>Register me for notifications!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.sendPushNotification()} style={styles.touchable}>
            <Text>Send me a notification!</Text>
          </TouchableOpacity>
          {this.state.token ? (
            <View>
              <Text style={styles.text}>Token</Text>
              <TextInput
                style={styles.input}
                onChangeText={token => this.setState({ token })}
                value={this.state.token}
              />
            </View>
          ) : null}
          {this.state.notification ? (
            <View>
              <Text style={styles.text}>Last Notification:</Text>
              <Text style={styles.text}>{JSON.stringify(this.state.notification.data.message)}</Text>
            </View>
          ) : null}
        </KeyboardAvoidingView>
          <View style={styles.list}>
            {this.state.dataSource.map((l, i) => (
              <ListItem
                key={i}
                onPress={() => alert('請先輸入讀取碼')}
                // onPress={()=>AlertIOS.prompt(
                //   '請輸入讀取碼',
                //   null,
                //   text => console.log("You entered "+text)
                // )}
                title={l.title}
                subtitle={l.releaseYear}
                chevron
                bottomDivider
              />
            ))}
          </View>           
      </View>
        {/* <View style={styles.headerContainer}>
          <Text style={styles.heading}>總覽</Text>
        </View> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  keyboard: {
    height: 0,
  },
  title: {
    fontSize: 18,
    padding: 8,
  },
  text: {
    paddingBottom: 2,
    padding: 8,
  },
  touchable: {
    borderWidth: 1,
    borderRadius: 4,
    margin: 8,
    padding: 8,
    width: '95%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    margin: 8,
    padding: 8,
    width: '95%',
  },
  container: {
    flex: 1,
  },
  list: {
    borderTopWidth: 1,
    borderColor: colors.greyOutline,
    backgroundColor: '#fff',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    // backgroundColor: '#FD6B78',
  },
  heading: {
    // color: 'white',
    color: 'black',
    marginTop: 10,
    fontSize: 22,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
});

export default Icons;
