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
  Platform,
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

import {Crypt, keyManager, RSA} from 'hybrid-crypto-js';

import { Permissions, Notifications, SecureStore, Constants} from 'expo';

const log = () => console.log('this is an example method');

class Icons extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      refreshing: false,
      token: null,
      notification: null,
      title: '通知系統',
      body: '有新資料！',
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
    return fetch(Constants.manifest.extra.push_server_path, {
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
    fetch(Constants.manifest.extra.server_host)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      })
    .then(() => {
      this.setState({ refreshing: false });
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  reloadCalls() {
    const last_count = this.state.dataSource.length
    console.log(last_count)
    return fetch(Constants.manifest.extra.server_host)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.length);
        if (responseJson.length > last_count){
          this.sendPushNotification();
        }
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      });    
  }

  enc(message){
    SecureStore.getItemAsync('some_key').then((data)=>{
      console.log("Storage content:", data);
    });
    Alert.alert(
      'Details',
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
      ],
      {cancelable: false},
    )
  }
  
  componentDidMount() {
    this.interval = setInterval(() => this.reloadCalls(), Constants.manifest.extra.reload_timer);

    this.registerForPushNotifications();

    // this.timeoutCheck = setTimeout(() => {
    //   this.sendPushNotification();
    //   console.log('3 seconds!');
    // }, 3000);

    // https://db9d7e5d.ngrok.io/calls.json
    // https://demo0195867.mockable.io/a.json

    return fetch( Constants.manifest.extra.server_host)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
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
        <View style={{ flex: 1, padding: 20}}>
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
      <View style={{flex: 1, paddingTop:((Platform.OS === 'ios') ? 60 : 0)}}>
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
                onPress={() => this.enc(l.content)}
                // onPress={()=>AlertIOS.prompt(
                //   '請輸入讀取碼',
                //   null,
                //   text => console.log("You entered "+text)
                // )}
                title={l.num}
                subtitle={l.stamp}
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
