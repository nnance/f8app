'use strict';

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
import ProfilePicture from '../../common/ProfilePicture';

const menuList = [
  {
    icon: require('./img/icons/bookmark.png'),
    title: 'Bookmark'
  },
  {
    icon: require('./img/icons/myclog.png'),
    title: 'Clog ของฉัน'
  },
  {
    icon: require('./img/icons/myfan.png'),
    title: 'แฟนคลับของฉัน'
  },
  {
    icon: require('./img/icons/candy-shop.png'),
    title: 'Candy Shop'
  },
  {
    icon: require('./img/icons/activity.png'),
    title: 'กิจกรรม'
  },
  {
    icon: require('./img/icons/logout.png'),
    title: 'Logout'
  }
]

const NumberDetail = (props) => {
  return (
    <View style={[styles.numberDetail, {borderRightWidth: props.borderRight ? 1 : 0}]}>
      <View style={styles.headNumberDetail}>
        <Text style={styles.smallText}>
          {props.number}
        </Text>
      </View>
      <Text style={styles.smallText}>
        {props.title}
      </Text>
    </View>
  );
}

const CandyCorner = (props) => (
  <View style={{
    position: 'absolute',
    left: 0,
    top: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <Image
      source={require('./img/icons/candy.png')}
      style={{
        width: 15,
        height: 15,
        marginLeft: 5,
        marginRight: 5
      }}
      />
    <View style={{
        color: 'white',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white'
      }}>
      <Text style={{color: 'white', fontSize: 13}}>{props.candys}</Text>
    </View>
  </View>
)

export default class ProfileScreen extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    const name = 'Art nattapat'
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../maps/img/maps-background.png')} style={styles.header}>
            <ProfilePicture size={100} />
            <Text style={styles.name}>
              {name.toUpperCase()}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <NumberDetail title='ผู้ติดตาม' number='1850' borderRight={true} />
              <NumberDetail title='กำลังติดตาม' number='425' borderRight={true} />
              <NumberDetail title='Candys' number='185000' />
            </View>
          </Image>
        </View>
        <View style={styles.menuList}>
          <PureListView
            title="Profile"
            renderEmptyList={() => null}
            data={menuList}
            renderRow={({title, icon}) => (
              <TouchableOpacity>
                <View style={styles.row}>
                  <Image style={styles.menuIcon} source={icon}/>
                  <Text style={styles.menuText}>{title}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <CandyCorner candys={1890} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuList: {
    flex: 2,
    backgroundColor: 'white'
  },
  row: {
    padding: 20,
    flex: 1,
    flexDirection: 'row'
  },
  menuIcon: {
    width: 20,
    height: 20
  },
  menuText: {
    paddingLeft: 20
  },
  name: {
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  smallText: {
    color: 'white',
    fontWeight: 'bold'
  },
  headNumberDetail: {
    color: 'white',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 5
  },
  whiteLine: {
    borderRightWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    height: 10
  },
  numberDetail: {
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: 'rgba(255, 255, 255, 0.3)'
  }
})
