import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  Dimensions,
} from 'react-native';

import { Button } from 'react-native-elements';

import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

// const BG_IMAGE = require('../../../assets/images/bg_screen4.jpg');

var keypair = require('keypair');

const storage = new Storage({
  // maximum capacity, default 1000
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  }
});


export default class LoginScreen2 extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
        key: '',
      }
    }
  getKey() 
  {  
    var key = keypair({bits: 256})
    this.setState({
      key: key,
    });

    storage.save({
      key: 'publicKey', // Note: Do not use underscore("_") in key!
      data: {
        content:  this.state.key.public,
      },      
      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: 365 * 24 * 3600,
    });
    storage.save({
      key: 'privateKey', // Note: Do not use underscore("_") in key!
      data: {
        content:  this.state.key.private,
      },
      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: 365 * 24 * 3600,
    });

    console.log(this.state.key.public);
    console.log(this.state.key.private);

    storage
    .load({
      key: 'privateKey',
  
      // autoSync (default: true) means if data is not found or has expired,
      // then invoke the corresponding sync method
      autoSync: true,
  
      // syncInBackground (default: true) means if data expired,
      // return the outdated data first while invoking the sync method.
      // If syncInBackground is set to false, and there is expired data,
      // it will wait for the new data and return only after the sync completed.
      // (This, of course, is slower)
      syncInBackground: true,
  
      // you can pass extra params to the sync method
      // see sync example below
      syncParams: {
        extraFetchOptions: {
          // blahblah
        },
        someFlag: true
      }
    })
    .then(ret => {
      // found data go to then()
      console.log("xxxxxxxx\n"+ret.content+"xxxxxx\n");
    })
    .catch(err => {
      // any exception including data not found
      // goes to catch()
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          break;
        case 'ExpiredError':
          // TODO
          break;
      }
    });
    
    
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.bgImage}>
        {/* source={BG_IMAGE}  */}
          <Text style={styles.loginText}>啟動碼</Text>
          {/* <Text style={styles.travelText}>{this.state.key.public}</Text> */}
          <TextInput multiline style={styles.travelText}>{this.state.key.public}</TextInput>
          <Button
                // onPress={() => {var key = keypair({bits: 256}); console.log(key)}}
                onPress={() => {this.getKey()}}
                title="通知啟動"
                activeOpacity={1}
                underlayColor="transparent"
                buttonStyle={{
                  height: 50,
                  width: 250,
                  backgroundColor: 'transparent',
                  borderWidth: 2,
                  borderColor: 'white',
                  borderRadius: 30,
                }}
                containerStyle={{ marginVertical: 10 }}
                titleStyle={{ fontWeight: 'bold', color: 'white' }}
              />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  travelText: {
    color: 'white',
    fontSize: 20,
  },
});
