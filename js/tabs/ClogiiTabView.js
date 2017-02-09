import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Platform,
  Linking,
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import Drawer from 'react-native-drawer';
import { connect } from 'react-redux';

import ProfileScreen from './profile';
import ShelfScreen from './shelf';
import FeedScreen from './feed';
import ShelfMenu from './ShelfMenu';
import NotificationsScreen from './notifications';
import ClogiiTabBar from './ClogiiTabBar';

const styles = StyleSheet.create({
  mockScreen: {
    flex: 1,
    resizeMode: 'stretch',
    height: undefined,
    width: require('Dimensions').get('window').width,
  },
});

/* eslint react/no-multi-comp: warn */

class ClogiiTabView extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      activeTab: 0,
    };

    this.goToClogCategory = this.goToClogCategory.bind(this);
    this.closeShelfMenu = this.closeShelfMenu.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.goToFacebook = this.goToFacebook.bind(this);
    this.goToLine = this.goToLine.bind(this);
    this.goToInstagram = this.goToInstagram.bind(this);
    this.openShelfMenu = this.openShelfMenu.bind(this);
  }

  componentDidMount() {
    this.props.init();
  }

  /* eslint class-methods-use-this: warn */
  openAppOrWeb(appUrl, webUrl) {
    Linking.canOpenURL(appUrl).then((can) => {
      if (can) {
        Linking.openURL(appUrl);
      } else {
        Linking.openURL(webUrl);
      }
    });
  }

  goToClogCategory(category) {
    this.shelf.goToClogCategory(category);
    this.closeShelfMenu();
    // InteractionManager.runAfterInteractions(() => this.closeShelfMenu());
  }

  goToProfile() {
    this.tabView.goToPage(3);
    this.closeShelfMenu();
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
    this.shelfMenu.open();
  }

  closeShelfMenu() {
    this.shelfMenu.close();
  }

  render() {
    return (
      <Drawer
        ref={
          (node) => {
            this.shelfMenu = node;
          }
        }
        type="overlay"
        content={<ShelfMenu
          onClose={this.closeShelfMenu}
          onGagClogPress={() => this.goToClogCategory('G')}
          onDiaryClogPress={() => this.goToClogCategory('D')}
          onNovelClogPress={() => this.goToClogCategory('N')}
          onMythClogPress={() => this.goToClogCategory('M')}
          onProfilePress={this.goToProfile}
          onFacebookPress={this.goToFacebook}
          onLinePress={this.goToLine}
          onInstagramPress={this.goToInstagram}
        />}
        openDrawerOffset={0}
      >
        <ScrollableTabView
          ref={
            (node) => {
              this.tabView = node;
            }
          }
          tabBarPosition={'bottom'}
          style={{}}
          renderTabBar={() => <ClogiiTabBar badges={this.props.badges} />
          }
          onChangeTab={({ i }) => {
            this.setState({
              activeTab: i,
            });
          }
          }
          locked={Platform.OS === 'android'}
        >
          <ShelfScreen
            ref={
              (node) => {
                this.shelf = node;
              }
            }
            goToBook={this.props.goToBook}
            onOpenShelfMenu={this.openShelfMenu}
            navigator={this.props.navigator}
            tabLabel="Clogii"
          />
          <FeedScreen
            goToBook={this.props.goToBook}
            navigator={this.props.navigator}
            tabLabel="Feed"
          />
          <NotificationsScreen
            goToBook={this.props.goToBook}
            navigator={this.props.navigator}
            tabLabel="Notifications"
          />
          <TestBadges
            navigator={this.props.navigator}
            tabLabel="Notifications"
            isActive={this.state.activeTab === 2}
          >
            <Image style={styles.mockScreen} source={require('./img/mock/notification.png')} />
          </TestBadges>
          <ProfileScreen navigator={this.props.navigator} tabLabel="Profile" isActive={this.state.activeTab === 3} />
        </ScrollableTabView>
      </Drawer>
    );
  }
}

// require('Dimensions').get('window').width

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
    if (props.isActive && props.clearBadge) {
      props.clearBadge();
    }
  }

  render() {
    // {this.props.children}
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: undefined, height: undefined }}>
        {this.props.children}
      </View>);
  }
}

const TestBadges = connect(null, (dispatch, ownProps) => ({
  clearBadge: () => dispatch({ type: 'CLEAR_MOCK_BADGE', payload: ownProps.tabLabel }),
}))(_TestBadges);

const select = state => ({
  badges: state.mockBadges ? state.mockBadges.badges : {},
});

const actions = ({
  clear: iden => ({ type: 'CLEAR_MOCK_BADGE', payload: iden }),
  init: () => ({ type: 'INIT_MOCK_BADGES' }),
});

export default connect(select, actions)(ClogiiTabView);
