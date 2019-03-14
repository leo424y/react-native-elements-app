
import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

import { SecureStore, Constants} from 'expo';

import {Crypt, keyManager, RSA} from 'hybrid-crypto-js';

export default class SignupScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            password: "",
            passwordConfirm: "",
        };
    }

    new_key(uid){
        // Basic initialization
        var crypt = new Crypt();
        var rsa = new RSA();

        // Generate RSA key pair, defaults on 4096 bit key
        rsa.generateKeypair(function(keypair) {

            // Callback function receives new keypair as a first argument
            var publicKey = keypair.publicKey;
            var privateKey = keypair.privateKey;
            
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
                pub: publicKey,
                pri: privateKey,
                uid: uid
              }
              //console.log(obj);
              
              Stor('some_key', obj) // Stores the object as a string.
        }, 1024);
    }    

    onSignupPress = () => {
        if (this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { 
            }, (error) => { Alert.alert(error.message); });
            
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user.uid);
                this.new_key(user.uid);
            }
        });        
    }

    onBackToLoginPress = () => {
        var navActions = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "Login"})]
        });
        this.props.navigation.dispatch(navActions);
    }

    render() {
        return (
            <View style={{paddingTop:50, alignItems:"center"}}>

                <Text>Signup</Text>

                <TextInput style={{width: 200, height: 40, borderWidth: 1}}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({email: text}) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <View style={{paddingTop:10}} />

                <TextInput style={{width: 200, height: 40, borderWidth: 1}}
                    value={this.state.password}
                    onChangeText={(text) => { this.setState({password: text}) }}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <View style={{paddingTop:10}} />

                <TextInput style={{width: 200, height: 40, borderWidth: 1}}
                    value={this.state.passwordConfirm}
                    onChangeText={(text) => { this.setState({passwordConfirm: text}) }}
                    placeholder="Password (confirm)"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Button title="Signup" onPress={this.onSignupPress} />

                <Button title="Back to Login" onPress={this.onBackToLoginPress} />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});