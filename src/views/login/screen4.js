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

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

// const BG_IMAGE = require('../../../assets/images/bg_screen4.jpg');

var keypair = require('keypair');

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
    console.log(this.state.key.public);
    console.log(this.state.key.private);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.bgImage}>
        {/* source={BG_IMAGE}  */}
          <Text style={styles.loginText}>啟動碼</Text>
          <Text style={styles.travelText}>{this.state.key.public}</Text>
          {/* <TextInput style={styles.travelText}>{this.state.key.public}</TextInput> */}
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
