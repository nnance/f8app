import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import { BUTTOM_TAB_HEIGHT } from '../common/styles';

const icons = {
  Shelf: {
    active: require('../assets/tab-icon/shelf-active.png'),
    inactive: require('../assets/tab-icon/shelf-inactive.png'),
  },
  Feed: {
    active: require('../assets/tab-icon/feed-active.png'),
    inactive: require('../assets/tab-icon/feed-inactive.png'),
  },
  Notifications: {
    active: require('../assets/tab-icon/notifications-active.png'),
    inactive: require('../assets/tab-icon/notifications-inactive.png'),
  },
  Profile: {
    active: require('../assets/tab-icon/profile-active.png'),
    inactive: require('../assets/tab-icon/profile-inactive.png'),
  },
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: BUTTOM_TAB_HEIGHT,
    flexDirection: 'row',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
});

const IconWithBadge = ({ badge, tab, active }) => (
  <View style={{ padding: 2 }}>
    <Image
      source={icons[tab][active ? 'active' : 'inactive']}
      style={{
        width: 25,
        height: 25,
        resizeMode: 'contain',
      }}
    />
    {
      !badge ? null :
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(54, 107, 245, 1)',
          width: 14,
          height: 14,
          borderRadius: 7,
          alignItems: 'center',
          justifyContent: 'center',
          top: 0,
          right: -4,
        }}
      >
        <Text
          style={{
            fontSize: 8,
            color: 'white',
          }}
        >
          {badge}
        </Text>
      </View>
    }
  </View>
);

class ClogiiTabBar extends React.Component {
  render() {
    return (
      <View style={[styles.tabs, this.props.style]}>
        {
          this.props.tabs.map((tab, i) =>
            <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
              <IconWithBadge
                active={this.props.activeTab === i}
                tab={tab}
                badge={this.props.badges[tab] || 0}
              />
            </TouchableOpacity>,
          )
        }
      </View>
    );
  }
}

export default ClogiiTabBar;
