import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';

const icons = {
  Clogii: {
    active: require('./img/icons/profile-active.png'),
    inactive: require('./img/icons/profile-inactive.png')
  },
  Feed: {
    active: require('./img/icons/profile-active.png'),
    inactive: require('./img/icons/profile-inactive.png')
  },
  Notifications: {
    active: require('./img/icons/profile-active.png'),
    inactive: require('./img/icons/profile-inactive.png')
  },
  Profile: {
    active: require('./img/icons/profile-active.png'),
    inactive: require('./img/icons/profile-inactive.png')
  }
}

const IconWithBadge = ({badge, tab, active}) => (
   <View style={{padding: 2}}>
    <Image
    source={icons[tab][active ? 'active' : 'inactive']}
    style={{
      width: 25,
      height: 25,
      resizeMode: 'contain',
    }}>
    </Image>
    {
      !badge ? null :
      <View style={{
          position: 'absolute',
          backgroundColor: 'rgba(54, 107, 245, 1)',
          width: 14,
          height: 14,
          borderRadius: 7,
          alignItems: 'center',
          justifyContent: 'center',
          top: 0,
          right: -4
        }}>
        <Text style={{
            fontSize: 8,
            color: 'white'
          }}>
          {badge}
        </Text>
      </View>
    }
  </View>
);

const ClogiiTabBar = React.createClass({
  render() {
    return <View style={[Platform.OS === 'ios' ? styles.tabsIOS : styles.tabsAndroid , this.props.style, ]}>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
          <IconWithBadge active={this.props.activeTab === i} tab={tab} badge={this.props.badges[tab] || 0}/>
        </TouchableOpacity>;
      })}
    </View>;
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabsIOS: {
    height: 45,
    flexDirection: 'row',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopColor: 'rgba(0, 0, 0, 0.05)'
  },
  tabsAndroid: {
    height: 45,
    flexDirection: 'row',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)'
  }
});

export default ClogiiTabBar;
