import React from 'react';
import {
  Text,
  Platform
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import ProfileScreen from './profile/ProfileScreen';
import MyScheduleView from './schedule/MyScheduleView';

import ClogiiTabBar from './ClogiiTabBar';

import {connect} from 'react-redux';

class ClogiiTabView extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      activeTab: 0
    };
  }

  componentDidMount() {
    this.props.init();
  }

  render() {
    return (
      <ScrollableTabView
        tabBarPosition={'bottom'}
        style={{}}
        renderTabBar={() => {
          return <ClogiiTabBar badges={this.props.badges}/>;
          }
        }
        onChangeTab={({i}) => {
            this.setState({
              activeTab: i
            })
          }
        }
      >
        <TestBadges tabLabel='Clogii' isActive={this.state.activeTab === 0 ? true : false}>My Clogii</TestBadges>
        <TestBadges tabLabel='Feed' isActive={this.state.activeTab === 1 ? true : false}>My Feed</TestBadges>
        <TestBadges tabLabel='Notifications' isActive={this.state.activeTab === 2 ? true : false}>My Notifications</TestBadges>
        <ProfileScreen tabLabel='Profile' isActive={this.state.activeTab === 3}/>
      </ScrollableTabView>
    );
  }
}

class _TestBadges extends React.Component {
  constructor(...args) {
    super(...args);
    this.clearBadge(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isActive && nextProps.isActive) {
      this.clearBadge(nextProps);
    }
  }

  clearBadge(props) {
    if (props.isActive) {
      props.clearBadge && props.clearBadge();
    }
  }

  render() {
    return <Text>{this.props.children}</Text>;
  }
}

const TestBadges = connect(null, (dispatch, ownProps) => ({
  clearBadge: () => dispatch({type: 'CLEAR_MOCK_BADGE', payload: ownProps.tabLabel})
}))(_TestBadges);

const select = state => ({
  badges: state.mockBadges ? state.mockBadges.badges : {}
});

const actions = ({
  clear: (iden) => ({type: 'CLEAR_MOCK_BADGE', payload: iden}),
  init: () => ({type: 'INIT_MOCK_BADGES'})
});

export default connect(select, actions)(ClogiiTabView);
