import React from 'react';

import {
  Image,
  Text,
  View,
  StyleSheet,
  ListView,
  TouchableOpacity
} from 'react-native';

import PureListView from '../../common/PureListView';
import {toHumanNumber} from '../../common/utils';

import NavBar from './NavBar';
import {styles as commonStyles} from './common';

class ActivityScreen extends React.Component {
  render() {
    return (<View style={commonStyles.listViewContainer}>
        <NavBar title="กิจกรรม" onLeftPress={() => this.props.onBackPress && this.props.onBackPress()}>
        </NavBar>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(250, 250, 250)'
  },
  rowContainer: {

  }
});

export default ActivityScreen;
