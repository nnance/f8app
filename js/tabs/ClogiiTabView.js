import React from 'react';
import {
  Text,
  Platform,
  Image,
  View,
  StyleSheet
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import ProfileScreen from './profile/containers/ProfileScreen';
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
        <TestBadges tabLabel='Clogii' isActive={this.state.activeTab === 0 ? true : false}><Image style={styles.mockScreen} source={require('./img/mock/clog.png')}></Image></TestBadges>
        <TestBadges tabLabel='Feed' isActive={this.state.activeTab === 1 ? true : false}><Image style={styles.mockScreen} source={require('./img/mock/feed.png')}></Image></TestBadges>
        <TestBadges tabLabel='Notifications' isActive={this.state.activeTab === 2 ? true : false}><Image style={styles.mockScreen} source={require('./img/mock/notification.png')}></Image></TestBadges>
        <ProfileScreen tabLabel='Profile' isActive={this.state.activeTab === 3}/>
      </ScrollableTabView>
    );
  }
}

// require('Dimensions').get('window').width

const styles = StyleSheet.create({
  mockScreen: {
    flex: 1,
    resizeMode: 'stretch',
    height: undefined,
    width: require('Dimensions').get('window').width
  }
});

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
    // {this.props.children}
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: undefined, height: undefined}}>
      {this.props.children}
    </View>;
  }
}

let x = 0;

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
