import _ from 'lodash';

import React, { Component } from 'react';
import { RefreshControl, ActivityIndicator, View, ScrollView, StyleSheet, Image, ListView, Alert, AlertIOS } from 'react-native';

import {
  Text,
  Card,
  Tile,
  Icon,
  ListItem,
  Avatar,
} from 'react-native-elements';

import colors from '../config/colors';

const log = () => console.log('this is an example method');

class Icons extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      refreshing: false,
    }
  }

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
    });
  }

  componentDidMount() {
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
      <View style={{flex: 1, paddingTop:0}}>
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
