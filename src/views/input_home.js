import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, Dimensions } from 'react-native';
import { Input, SearchBar, Icon, Button } from 'react-native-elements';

import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;

const dummySearchBarProps = {
  showLoading: true,
  onFocus: () => console.log('focus'),
  onBlur: () => console.log('blur'),
  onCancel: () => console.log('cancel'),
  onClearText: () => console.log('cleared'),
  onChangeText: text => console.log('text:', text),
};

class InputHome extends Component {
  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <Input
            label="帳號"
            placeholder="test@mail.com"
            // placeholderTextColor="black"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardAppearance="light"
            keyboardType="email-address"
            returnKeyType="next"
            ref={input => (this.emailInput = input)}
            onSubmitEditing={() => {
              this.passwordInput.focus();
            }}
            blurOnSubmit={false}
            containerStyle={[styles.inputContainerStyle]}
          />
          <Input
            containerStyle={[styles.inputContainerStyle]}
            label="密碼"
            placeholder="****"
            // placeholderTextColor="black"
            autoCapitalize="none"
            keyboardAppearance="light"
            secureTextEntry={true}
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="done"
            ref={input => (this.passwordInput = input)}
            blurOnSubmit={true}
          />
          <Button
            title="確定"
            containerViewStyle={{ width: '100%', marginLeft: 0 }}
            style={{
              marginVertical: 30,
            }}
          // onPress={() => this.shakeInput2 && this.shakeInput2.shake()}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#B46486',
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangleLeft: {
    position: 'absolute',
    left: -20,
    bottom: 0,
    width: 0,
    height: 0,
    borderRightWidth: 20,
    borderRightColor: 'white',
    borderBottomWidth: 25,
    borderBottomColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'transparent',
  },
  triangleRight: {
    position: 'absolute',
    right: -20,
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderLeftColor: 'white',
    borderBottomWidth: 25,
    borderBottomColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'transparent',
  },
  inputContainerStyle: {
    marginTop: 16,
    width: '90%',
  },
});

export default InputHome;
