import React from 'react';
import {
  Platform,
  Linking,
  StatusBar,
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
import { withTracking } from '../common/navigateTracking';

/* eslint react/no-multi-comp: warn */

class ClogiiTabView extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      activeTab: 0,
      canScroll: true,
      drawerOpen: false,
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
    this.props.navigate('shelf');
    // this.tabView.goToPage(3);
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
    this.setState({drawerOpen: true})
  }

  closeShelfMenu() {
    this.setState({drawerOpen: false})
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
        open={this.state.drawerOpen}
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
          onChangeTab={({ i, ref }) => {
            this.setState({
              activeTab: i,
            });
            this.props.navigate(ref.props.tabLabel);
          }
          }
          locked={Platform.OS === 'android' ? true : !this.state.canScroll}
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
            tabLabel="Shelf"
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
          <ProfileScreen
            navigator={this.props.navigator}
            goToPlayer={this.props.goToPlayer}
            goToBook={this.props.goToBook}
            redirectTo={this.props.redirectTo}
            tabLabel="Profile"
            isActive={this.state.activeTab === 3}
            setTabViewScrollable={can => this.setState({ canScroll: can })}
          />
        </ScrollableTabView>
        <StatusBar 
          barStyle={this.state.drawerOpen ? 'light-content' : 'dark-content'}
        />
      </Drawer>
    );
  }
}

const select = state => ({
  badges: state.mockBadges ? state.mockBadges.badges : {},
});

const actions = ({
  clear: iden => ({ type: 'CLEAR_MOCK_BADGE', payload: iden }),
  init: () => ({ type: 'INIT_MOCK_BADGES' }),
});

export default withTracking(connect(select, actions)(ClogiiTabView));
