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
import {colors} from '../../../common/styles';

const likeIcon = require('../img/icons/heart.png');
const readIcon = require('../img/icons/read.png');

const ActivityRow = (props) => (<TouchableOpacity style={styles.rowContainer}>
  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    <View style={{
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center'
      }}>
      <Image
        source={props.activity === 'like' ? likeIcon : readIcon}
        style={{
          width: 15,
          height: 15,
          resizeMode: 'contain'
        }}
        />
      <Text style={{
          fontSize: 13,
          color: colors.textGrey,
          marginLeft: 5
        }}>
        {props.activity === 'like' ? 'liked' : 'read'} funny clog
      </Text>
    </View>
    <Text style={{
        alignSelf: 'flex-end',
        fontSize: 10,
        color: colors.textFadedGrey
      }}>{moment(props.date).fromNow()}</Text>
  </View>
  <View style={{paddingVertical: 10}}>
    <Image
      style={{height: 150, borderRadius: 5}}
      source={{uri: props.uri}}
      />
  </View>
  <View>
    <Text style={{
        fontSize: 14,
        fontWeight: 'bold',
      }}>
      {props.title}
    </Text>
    <Text style={{
        fontSize: 10,
        color: colors.textFadedGrey
      }}
      numberOfLines={1}
      >
      {props.outline}
    </Text>
  </View>
</TouchableOpacity>);

class ActivityScreen extends React.Component {
  render() {
    return (<View style={commonStyles.listViewContainer}>
        <NavBar title="กิจกรรม" onBackPress={this.props.onBackPress}/>
        <PureListView
          data={this.props.activity}
          renderRow={(props) => {
            return <ActivityRow {...props}/>;
          }}
          />
      </View>);
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    padding: 13
  }
});

export default ActivityScreen;
export {
  ActivityRow
};
