import React from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import gql from 'graphql-tag';

import NavBar from './NavBar';
import BorderButton from '../../../common/BorderButton';
import FixBugScrollView from '../../../common/FixBugScrollView';

import MetaClogListView from './MetaClogListView';
import RecommendedClog from './RecommendedClog';
import ExploreCategory from './ExploreCategory';
import HeroBanner from './HeroBanner';

const styles = StyleSheet.create({
  clogListButton: {
    flex: 1,
    width: 80,
    paddingHorizontal: 0,
    alignItems: 'center',
  },
});

class Home extends React.Component {
  constructor(...args) {
    super(...args);

    this.renderFollowButton = this.renderFollowButton.bind(this);
    this.renderUnfollowButton = this.renderUnfollowButton.bind(this);
    this.renderTrendingButton = this.renderTrendingButton.bind(this);
  }

  renderFollowButton() {
    // remove when implement
    /* eslint class-methods-use-this: off */
    return (
      <BorderButton caption="ติดตาม" type="fadedWhite" containerStyle={styles.clogListButton} />
    );
  }

  renderUnfollowButton() {
    // remove when implement
    /* eslint class-methods-use-this: off */
    return (
      <BorderButton caption="เลิกติดตาม" type="fadedGrey" containerStyle={styles.clogListButton} />
    );
  }

  renderTrendingButton() {
    return (
      <BorderButton
        caption="ทั้งหมด" type="fadedWhite" containerStyle={styles.clogListButton}
        onPress={() => this.props.goToTrendingListView({ title: 'ยอดนิยม' })}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'rgb(81, 20, 64)' }}>
        <NavBar
          renderLeftMenu={() => (
            <TouchableOpacity onPress={this.props.onOpenShelfMenu}>
              <View style={{ height: 40, flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                <Image style={{ height: 15, resizeMode: 'contain' }} source={require('../../../assets/shelf/menu.png')} />
              </View>
              </TouchableOpacity>
          )}
          renderRightMenu={() => (
            <TouchableOpacity><Image style={{ height: 20, resizeMode: 'contain' }} source={require('../../../assets/common/pink-search.png')} /></TouchableOpacity>
          )}
          renderTitle={() => (
            <View style={{ height: 30, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ height: 30, resizeMode: 'contain' }} source={require('../../../assets/shelf/title.png')} />
            </View>
          )}
          titleStyle={{
            flex: 1,
            alignItems: 'flex-start',
          }}
        />
        <FixBugScrollView>
          {/*<Image source={require('../../../assets/shelf/home-bg-1.png')} style={{ width: undefined, height: 700, resizeMode: 'stretch', backgroundColor: 'transparent' }}>
            <View style={{ flex: 2 }}>
              <HeroBanner goToBook={this.props.goToBook} clogs={this.props.heroBanners} />
            </View>
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <MetaClogListView goToBook={this.props.goToBook} header="TRENDING" clogs={this.props.trendingClogs} renderButton={this.renderTrendingButton} />
            </View>
            <View style={{ flex: 1.6 }}>
              <RecommendedClog clog={this.props.recommendedClog} goToBook={this.props.goToBook} />
            </View>
          </Image>
          */}
          <Image source={require('../../../assets/shelf/home-bg-1.5.png')} style={{ resizeMode: 'stretch', backgroundColor: 'transparent', width: undefined, height: undefined, paddingTop: 20 }}>
            {
              this.props.favoriteTags.map(tag => (
                <View key={tag.id} style={{ paddingLeft: 0, paddingTop: 10 }}>
                  <MetaClogListView
                    goToBook={this.props.goToBook}
                    header={tag.name.toUpperCase()}
                    clogs={tag.trendingClogs}
                    renderButton={
                      !tag.following ?
                          this.renderFollowButton
                        : this.renderUnfollowButton
                    }
                  />
                </View>
              ))
            }
          </Image>
          <ExploreCategory onPress={category => this.props.goToClogCategory(category)} />
        </FixBugScrollView>
      </View>
    );
  }
}

Home.fragments = {
  HeroBanner: HeroBanner.fragments.clog,
  RecommendedClog: RecommendedClog.fragments.clog,
  MetaClogListView: MetaClogListView.fragments.clog,
  FavoritTag: gql`
    fragment FavoritTag on Tag {
      id
      name
      trendingClogs(limit: 10) {
        ...MetaClogListView
      }
    }
  `,
};

export default Home;
