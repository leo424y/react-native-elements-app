import _ from 'lodash';

import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Image, ListView } from 'react-native';

import {
  Text,
  Card,
  Tile,
  Icon,
  ListItem,
  Avatar,
} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

import colors from '../config/colors';

const log = () => console.log('this is an example method');

const phone_lists = [
  {
    name: '0988134234',
    subtitle: '2019/01/22-19:00:20-19:00:25',
  },
];

class Icons extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      selectedIndex: 0,
    };

    this.updateIndex = this.updateIndex.bind(this);
    this.renderRow = this.renderRow.bind(this);
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
    const buttons = ['Button1', 'Button2'];
    const { selectedIndex } = this.state;

    return (
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>0988134234</Text>
          <Text style={{fontSize: 12}}>2019/01/22-19:00:20-19:00:25</Text>
        </View>  
        <Card containerStyle={{ marginTop: 20, marginBottom: 20}}>
          <Tile
            title="這是內容；這是內容；這是內容；這是內容；這是內容；這是內容；這是內容；這是內容；"
            titleStyle={{ fontSize: 18 }}
            width={310}
          />
        </Card>
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
