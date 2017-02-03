import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Platform,
  InteractionManager,
  Linking
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import Drawer from 'react-native-drawer';

import {STATUS_BAR_HEIGHT, NAV_BAR_HEIGHT} from '../common/styles';

import ProfileScreen from './profile/containers/ProfileScreen';
import ShelfScreen from './shelf';
import FeedScreen from './feed';
import ShelfMenu from './ShelfMenu';
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
    // <TestBadges tabLabel="Clogii" isActive={this.state.activeTab === 0 ? true : false}><Image style={styles.mockScreen} source={require('./img/mock/clog.png')}/></TestBadges>
    return (
      <Drawer
        ref="shelfMenu"
        type="overlay"
        content={<ShelfMenu
          onClose={this.closeShelfMenu.bind(this)}
          onGagClogPress={this.goToClogCategory.bind(this, 'G')}
          onDiaryClogPress={this.goToClogCategory.bind(this, 'D')}
          onNovelClogPress={this.goToClogCategory.bind(this, 'N')}
          onMythClogPress={this.goToClogCategory.bind(this, 'M')}
          onProfilePress={this.goToProfile.bind(this)}
          onFacebookPress={this.goToFacebook.bind(this)}
          onLinePress={this.goToLine.bind(this)}
          onInstagramPress={this.goToInstagram.bind(this)}
        />}
        openDrawerOffset={0}
        >
        <ScrollableTabView
          ref="tabView"
          tabBarPosition={'bottom'}
          style={{}}
          renderTabBar={() => {
            return <ClogiiTabBar badges={this.props.badges}/>;
            }
          }
          onChangeTab={({i}) => {
              this.setState({
                activeTab: i
              });
            }
          }
          locked={Platform.OS === 'android'}
        >
          <ShelfScreen ref="shelf" onOpenShelfMenu={this.openShelfMenu.bind(this)} navigator={this.props.navigator} tabLabel="Clogii"/>
          <TestBadges navigator={this.props.navigator} tabLabel="Feed" isActive={this.state.activeTab === 1 ? true : false}><FeedScreen navigator={this.props.navigator}/></TestBadges>
          <TestBadges navigator={this.props.navigator} tabLabel="Notifications" isActive={this.state.activeTab === 2 ? true : false}><Image style={styles.mockScreen} source={require('./img/mock/notification.png')}/></TestBadges>
          <ProfileScreen navigator={this.props.navigator} tabLabel="Profile" isActive={this.state.activeTab === 3}/>
        </ScrollableTabView>
      </Drawer>
    );
  }

  goToClogCategory(category) {
    this.refs.shelf.goToClogCategory(category);
    this.closeShelfMenu();
    // InteractionManager.runAfterInteractions(() => this.closeShelfMenu());
  }

  goToProfile() {
    this.refs.tabView.goToPage(3);
    this.closeShelfMenu();
  }

  openAppOrWeb(appUrl, webUrl) {
    Linking.canOpenURL(appUrl).then(can => {
      if(can) {
        Linking.openURL(appUrl);
      }
      else {
        Linking.openURL(webUrl);
      }
    });
  }

  goToFacebook() {
    this.openAppOrWeb('fb://page/', 'https://www.facebook.com');
  }

  goToInstagram() {
    this.openAppOrWeb('instagram://user?username=', 'https://www.instagram.com/');
  }

  goToLine() {
    this.openAppOrWeb('line://', 'https://www.line.me');
  }

  openShelfMenu() {
    this.refs.shelfMenu.open();
  }

  closeShelfMenu() {
    this.refs.shelfMenu.close();
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
