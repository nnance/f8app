import React from 'react';

import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import NavBar from './NavBar';
import BorderButton from '../../../common/BorderButton';
import FixBugScrollView from '../../../common/FixBugScrollView';

import MetaClogListView from './MetaClogListView';
import RecommendedClog from './RecommendedClog';
import ExploreCategory from './ExploreCategory';
import HeroBanner from './HeroBanner';

import mockData from '../mockData';

class Home extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'rgb(81, 20, 64)'}}>
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
        <FixBugScrollView>
          <Image source={require('../img/home-bg-1.png')} style={{width: undefined, height: 700, resizeMode: 'stretch', backgroundColor: 'transparent'}}>
            <View style={{flex: 2}}>
              <HeroBanner navigator={this.props.navigator} clogs={this.props.heroBanners}/>
            </View>
            <View style={{flex: 1, paddingLeft: 10}}>
              <MetaClogListView navigator={this.props.navigator} header="TRENDING" clogs={this.props.trendingClogs} renderButton={this.renderTrendingButton.bind(this)}/>
            </View>
            <View style={{flex: 1.6}}>
              <RecommendedClog {...this.props.recommendedClog} navigator={this.props.navigator}/>
            </View>
          </Image>
          <Image source={require('../img/home-bg-1.5.png')} style={{resizeMode: 'stretch', backgroundColor: 'transparent', width: undefined, height: undefined, paddingTop: 20}}>
            {
              this.props.favoriteTags.map((tag, idx) => (
                <View key={idx} style={{paddingLeft: 10, paddingTop: 10}}>
                  <MetaClogListView navigator={this.props.navigator} header={tag.name.toUpperCase()} clogs={tag.trendingClogs} renderButton={!tag.following ? this.renderFollowButton.bind(this) : this.renderUnfollowButton.bind(this)}/>
                </View>
              ))
            }
          </Image>
          <ExploreCategory onPress={(category) => this.props.navigator.push({page: 'clog-category', category})}/>
        </FixBugScrollView>
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
      <BorderButton caption="ทั้งหมด" type="fadedWhite" containerStyle={styles.clogListButton}
        onPress={() => this.props.navigator.push({page: 'clog-list-view', title: 'ยอดนิยม', orderBy: 'TRENDING'})}
        />
    );
  }
}

const styles = StyleSheet.create({
  clogListButton: {
    flex: 1,
    width: 80,
    paddingHorizontal: 0,
    alignItems: 'center'
  }
});

export default Home;
