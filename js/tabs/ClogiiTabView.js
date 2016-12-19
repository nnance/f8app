import React from 'react';
import {
  Text,
  Platform
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import ProfileScreen from './profile/ProfileScreen';
import MyScheduleView from './schedule/MyScheduleView';

import ClogiiTabBar from './ClogiiTabBar';

class ClogiiTabView extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      activeTab: 0
    };
  }

  render() {
    return (
      <ScrollableTabView
        tabBarPosition={Platform.OS === 'ios' ? 'bottom' : 'top'}
        style={{}}
        renderTabBar={() => <ClogiiTabBar badges={{Profile: 10}}/>}
        onChangeTab={(i) => this.setState({
          activeTab: i
        })}
      >
        <Text tabLabel='Clogii'>My Clogii</Text>
        <Text tabLabel='Feed'>My Feed</Text>
        <Text tabLabel='Notifications'>My Notifications</Text>
        <ProfileScreen tabLabel='Profile' isActive={this.state.activeTab === 3}/>
      </ScrollableTabView>
    );
  }
}

export default ClogiiTabView;
