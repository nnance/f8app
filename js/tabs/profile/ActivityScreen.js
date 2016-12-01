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
import {toHumanNumber, random} from '../../common/utils';

import NavBar from './NavBar';
import {styles as commonStyles} from './common';

const mockUri = [
  "http://3.bp.blogspot.com/-zW6wqY_1Me0/VYvJMOV4mcI/AAAAAAAAD-4/mB_AxhFoJH4/s1600/178491main_sig07-009-516.jpg",
  "http://www.fujisan.ne.jp/fit/th/images/ohishikouen430.jpg"
];

const ActivityRow = (props) => (<TouchableOpacity style={styles.rowContainer}>
  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    <Text style={{
        alignSelf: 'flex-start',
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.55)'
      }}>
      {props.type === 'like' ? 'liked' : 'read'} funny clog
    </Text>
    <Text style={{
        alignSelf: 'flex-end',
        fontSize: 10,
        color: 'rgba(0, 0, 0, 0.2)'
      }}>12 mins ago</Text>
  </View>
  <View style={{paddingVertical: 10}}>
    <Image
      style={{height: 150, borderRadius: 5}}
      source={{uri: mockUri[random(mockUri.length)]}}
      />
  </View>
  <View>
    <Text style={{
        fontSize: 14,
        fontWeight: 'bold',
      }}>
      แมค เดมอน ตะลุยอวกาศ
    </Text>
    <Text style={{
        fontSize: 10,
        color: 'rgba(0, 0, 0, 0.3)'
      }}>
      The Martain กำกับโดย ริดลีย์ สก๊อต เนื้อหาเล่าถึง นักบินอวกาศที่ถูกทิ้งไว้บนดาว...
    </Text>
  </View>
</TouchableOpacity>);

class ActivityScreen extends React.Component {
  render() {
    return (<View style={commonStyles.listViewContainer}>
        <NavBar title="กิจกรรม" onLeftPress={() => this.props.onBackPress && this.props.onBackPress()}>
        </NavBar>
        <PureListView
          data={[{type: 'like'}, {type: 'read'}, {type: 'like'}]}
          renderRow={() => {
            return <ActivityRow/>;
          }}
          />
      </View>);
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    paddingVertical: 13,
    paddingHorizontal: 13
  }
});

export default ActivityScreen;
