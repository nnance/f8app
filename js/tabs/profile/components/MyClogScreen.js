import React from 'react';

import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';

import PureListView from '../../../common/PureListView';

import NavBar from './NavBar';
import {styles as commonStyles} from '../common';

import ClogListView from '../../../common/ClogListView';

class MyClogScreen extends React.Component {
  render() {
    return (<View style={commonStyles.listViewContainer}>
      <NavBar title="Clog ของฉัน" onBackPress={this.props.onBackPress}/>
      <ClogListView clogs={this.props.clogs}/>
    </View>);
  }
}

export default MyClogScreen;
