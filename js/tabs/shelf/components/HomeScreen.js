import React from 'react';

import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import NavBar from '../../../common/NavBar';
import BorderButton from '../../../common/BorderButton';

import ClogListView from './ClogListView';
import TopClog from './TopClog';
import ExploreCategory from './ExploreCategory';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <NavBar
          renderLeftMenu={() => (
            <TouchableOpacity><Image style={{height: 20, resizeMode: 'contain'}} source={require('../img/menu.png')}/></TouchableOpacity>
          )}
          renderRightMenu={() => (
            <TouchableOpacity><Image style={{height: 20, resizeMode: 'contain'}} source={require('../img/search.png')}/></TouchableOpacity>
          )}
          renderTitle={() => (
            <Image style={{width: 80, height: 30, resizeMode: 'contain'}} source={require('../img/title.png')}/>
          )}
          titleStyle={{
            flex: 1,
            alignItems: 'flex-start'
          }}
          />
        <ScrollView>
          <Image source={require('../img/home-bg-1.png')} style={{width: undefined, height: 700, resizeMode: 'stretch', backgroundColor: 'transparent'}}>
            <View style={{flex: 2}}>
              <Image source={require('../img/mock-head.png')} style={{resizeMode: 'stretch', width: 350, height: 280}}/>
            </View>
            <View style={{flex: 1, paddingLeft: 10}}>
              <ClogListView header="TRENDING" clogs={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]} renderButton={this.renderTrendingButton.bind(this)}/>
            </View>
            <View style={{flex: 1.6}}>
              <TopClog/>
            </View>
          </Image>
          <Image source={require('../img/home-bg-1.5.png')} style={{resizeMode: 'stretch', backgroundColor: 'transparent', width: undefined, height: undefined, paddingTop: 20}}>
            <View style={{paddingLeft: 10}}>
              <ClogListView header="DRAMATIC SERIES" clogs={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]} renderButton={this.renderFollowButton.bind(this)}/>
            </View>
            <View style={{paddingLeft: 10, paddingTop: 10}}>
              <ClogListView header="NEW FUNNY CLOG" clogs={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]} renderButton={this.renderFollowButton.bind(this)}/>
            </View>
            <View style={{paddingLeft: 10, paddingTop: 10}}>
              <ClogListView header="FANTASY SCI-FI" clogs={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]} renderButton={this.renderUnfollowButton.bind(this)}/>
            </View>
          </Image>
          <ExploreCategory/>
        </ScrollView>
      </View>
    );
  }

  renderFollowButton() {
    return (
      <BorderButton caption="ติดตาม" type="fadedWhite" containerStyle={styles.clogListButton}/>
    );
  }

  renderUnfollowButton() {
    return (
      <BorderButton caption="เลิกติดตาม" type="fadedGrey" containerStyle={styles.clogListButton}/>
    );
  }

  renderTrendingButton() {
    return (
      <BorderButton caption="ทั้งหมด" type="fadedWhite" containerStyle={styles.clogListButton}/>
    );
  }
}

const styles = StyleSheet.create({
  clogListButton: {
    width: 80,
    paddingHorizontal: 0,
    alignItems: 'center'
  }
});

export default HomeScreen;
