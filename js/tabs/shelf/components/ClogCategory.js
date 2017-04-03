import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import gql from 'graphql-tag';

import { colors } from '../../../common/styles';
import FixBugScrollView from '../../../common/FixBugScrollView';
import BorderButton from '../../../common/BorderButton';
import HorizontalListView from '../../../common/HorizontalListView';
import { bindFn, toHumanNumber } from '../../../common/utils';
import { getCategoryLogo } from '../../../models/clog';
import NavBar, { HEIGHT } from './NavBar';
import FollowerShortenList from './FollowerShortenList';
import MetaEditorList from './MetaEditorList';
import MetaClogListView from './MetaClogListView';

/* eslint react/no-multi-comp: off */

const styles = StyleSheet.create({
  centerItems: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  followerNumber: {
    fontWeight: 'bold',
    fontSize: 11,
    color: 'white',
  },
  followingWord: {
    fontSize: 10,
    color: 'white',
  },
  bannerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  bannerAuthorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textFadedWhite,
  },
});

const clogThemes = {
  D: {
    logo: getCategoryLogo('D'),
    title: 'Diary Clog',
    color: 'rgb(252, 246, 67)',
    borderNavBar: 'rgb(212, 206, 27)',
    bannerColor: 'rgb(249, 220, 73)',
  },
  G: {
    logo: getCategoryLogo('G'),
    title: 'Gag Clog',
    color: 'rgb(49, 240, 185)',
    borderNavBar: 'rgb(9, 200, 145)',
    bannerColor: 'rgb(49, 240, 185)',
  },
  M: {
    logo: getCategoryLogo('M'),
    title: 'Myth Clog',
    color: 'rgb(30, 153, 246)',
    borderNavBar: 'rgb(0, 113, 216)',
    bannerColor: 'rgb(30, 153, 246)',
  },
  N: {
    logo: getCategoryLogo('N'),
    title: 'Novel Clog',
    color: 'rgb(244, 68, 54)',
    borderNavBar: 'rgba(200, 40, 30, 1)',
    bannerColor: 'rgb(230, 35, 70)',
  },
};

const OpacityCircle = props => (
  <View
    style={[
      styles.centerItems,
      {
        width: props.size,
        height: props.size,
        borderRadius: props.size / 2,
        backgroundColor: `rgba(255, 255, 255, ${props.opacity})`,
      },
      props.style,
    ]}
  >{props.children}</View>
  );

class ClogLogo extends React.Component {
  render() {
    const clogTheme = clogThemes[this.props.category];
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <OpacityCircle size={325} opacity={0.1}>
          <OpacityCircle size={250} opacity={0.15}>
            <OpacityCircle size={175} opacity={0.2}>
              <OpacityCircle size={100} opacity={0.25}>
                <Image
                  source={clogTheme.logo}
                  style={{
                    height: 80,
                    resizeMode: 'contain',
                  }}
                />
              </OpacityCircle>
            </OpacityCircle>
          </OpacityCircle>
        </OpacityCircle>
      </View>
    );
  }
}

class ClogBanner extends React.Component {
  render() {
    const clogTheme = clogThemes[this.props.category];
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View
          style={{
            flex: 4,
            backgroundColor: clogTheme.bannerColor,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <Image
            source={require('../../../assets/shelf/mock-clog-banner.png')}
            style={{
              flex: 1,
              resizeMode: 'cover',
              borderRadius: 10,
              width: undefined,
            }}
          >
            <LinearGradient
              start={{
                x: 0.1,
                y: 0.5,
              }}
              end={{
                x: 1,
                y: 0.5,
              }}
              colors={['rgba(255, 255, 255, 0)', clogTheme.bannerColor]}
              style={{
                flex: 1,
                top: 0,
                height: undefined,
              }}
            />
          </Image>
        </View>
        <View
          style={{
            flex: 5,
            backgroundColor: clogTheme.bannerColor,
            height: undefined,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: 10,
              justifyContent: 'center',
            }}
          >
            <View>
              <Text style={styles.bannerTitleText}>{this.props.clog.title}</Text>
              <Text style={styles.bannerAuthorText}>{this.props.clog.author.name}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export const RecommendClogWidth = Dimensions.get('window').width * 0.9;

export class RecommendClogs extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      currentClogBanner: 0,
    };

    this.onPress = this.onPress.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.renderClogBanner = this.renderClogBanner.bind(this);
  }

  onPress(id) {
    if (this.props.goToBook) {
      this.props.goToBook(id);
    }
  }

  onScroll(e) {
    const offsetX = e.nativeEvent.contentOffset.x;
    const heroBannerWidth = Dimensions.get('window').width - 20;
    const oldIdx = this.state.currentClogBanner;
    let idx = Math.floor(offsetX / heroBannerWidth);
    idx = idx >= 0 ? idx : 0;
    this.setState({
      currentClogBanner: idx,
    });
    if (oldIdx !== idx && this.props.onIndexChange) {
      this.props.onIndexChange(idx);
    }
  }

  renderClogBanner(data) {
    return (
      <TouchableOpacity onPress={() => this.onPress(data.id)} style={{ flex: 1, width: RecommendClogWidth, marginHorizontal: (Dimensions.get('window').width - RecommendClogWidth - 20) / 2 }}>
        <ClogBanner category={this.props.category} clog={data} />
      </TouchableOpacity>
    );
  }

  render() {
    return (<HorizontalListView
      data={this.props.clogs}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderRow={this.renderClogBanner}
      onScroll={this.onScroll}
    />);
  }
}

class ClogCategory extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      currentClogBanner: 0,
    };

    this.renderButtonViewAllClog = this.renderButtonViewAllClog.bind(this);
    this.onRecommendClogChange = this.onRecommendClogChange.bind(this);
  }

  onRecommendClogChange(idx) {
    this.setState({
      currentClogBanner: idx,
    });
  }

  renderButtonViewAllClog(onPress) {
    return (<BorderButton
      type="fadedWhite" caption="ทั้งหมด" containerStyle={{ flex: 1 }}
      onPress={onPress}
    />);
  }

  render() {
    const clogTheme = clogThemes[this.props.category];
    const currentClogBanner = this.props.recommendedClogs[this.state.currentClogBanner];
    return (
      <LinearGradient locations={[0, 0.5, 0.5, 1]} colors={[clogTheme.color, clogTheme.color, 'rgb(220, 4, 87)', 'rgb(220, 4, 87)']} style={{ flex: 1, backgroundColor: 'transparent' }}>
        <FixBugScrollView
          style={{ flex: 1, backgroundColor: 'transparent' }}
        >
          <LinearGradient style={{ height: 420 + HEIGHT }} colors={[clogTheme.color, 'rgb(164, 58, 124)']}>
            <Image
              source={require('../../../assets/shelf/star-bg.png')}
              style={{
                flex: 1,
                width: undefined,
                resizeMode: 'cover',
              }}
            >
              <View style={{ flex: 1 }}>
                <View style={{ height: HEIGHT }} />
                <View style={{ height: 50, width: undefined, flexDirection: 'row', padding: 5, alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <FollowerShortenList
                      followers={currentClogBanner ?
                        this.props.recommendedClogs[this.state.currentClogBanner].followersYouKnow
                      : []}
                    />
                  </View>
                  {/*<View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                      <View style={[{ backgroundColor: 'transparent', paddingHorizontal: 8 }]}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.followerNumber}>
                            {toHumanNumber(currentClogBanner ? currentClogBanner.followerCount : 0)}
                          </Text>
                          <Text style={styles.followingWord}> คน</Text></View>
                        <View><Text style={styles.followingWord}>กำลังติดตาม</Text></View>
                      </View>
                      <View>
                        <BorderButton type="fadedWhite" caption="ติดตาม" />
                      </View>
                    </View>
                  </View>*/}
                </View>
                <View style={{ height: 150, width: undefined, padding: 5, justifyContent: 'center' }}>
                  <ClogLogo category={this.props.category} />
                </View>
                {/*<View style={{ height: 150, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <RecommendClogs
                    goToBook={this.props.goToBook}
                    category={this.props.category}
                    clogs={this.props.recommendedClogs}
                    onIndexChange={this.onRecommendClogChange}
                  />
                </View>*/}
                <View style={{ padding: 5 , height: 180}}>
                  <MetaClogListView
                    goToBook={this.props.goToBook} header="What's New" clogs={this.props.recentlyClogs}
                    renderButton={() => this.renderButtonViewAllClog(
                      () => this.props.goToClogListView({ category: this.props.category, title: 'What\'s new', sort: 'CREATEDAT_DESC' }),
                    )}
                  />
                </View>
              </View>
            </Image>
          </LinearGradient>
          <LinearGradient colors={['rgb(164, 58, 124)', 'rgb(220, 4, 87)']}>
            {/*<View style={{ height: 180, padding: 5 }}>
              <MetaClogListView
                goToBook={this.props.goToBook} header="Top Chart" clogs={this.props.trendingClogs}
                renderButton={() => this.renderButtonViewAllClog(
                  () => this.props.goToTrendingListView({ category: this.props.category, title: 'ยอดนิยม' }),
                )}
              />
            </View>*/}
            <View style={{ height: 180, padding: 5 }}>
              <MetaEditorList
                editors={this.props.editors}
                onViewAllPress={bindFn(this.props.goToEditorListView, this.props.category)}
              />
            </View>
          </LinearGradient>
        </FixBugScrollView>
        <NavBar
          onBackPress={this.props.onBackPress}
          renderRightMenu={() => (
            <TouchableOpacity>
              <View style={{width: 40, height: 40 }}>
                <Image style={{ height: 30, resizeMode: 'contain' }} source={require('../../../assets/common/white-search.png')} />
              </View>
            </TouchableOpacity>
          )}
          renderTitle={() => (
            <Text
              style={{
                color: colors.textWhite,
                fontWeight: 'bold',
                fontSize: 20,
              }}
            >
              {clogTheme.title}
            </Text>
          )}
          containerStyle={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: clogTheme.color,
            borderBottomWidth: 0.3,
            borderColor: clogTheme.borderNavBar,
          }}
        />
      </LinearGradient>
    );
  }
}

ClogCategory.fragments = {
  ClogCategoryEditor: gql`
    fragment ClogCategoryEditor on Editor {
      name
      profilePicture
    }
  `,
  RecommendClog: gql`
    fragment RecommendClog on Clog {
      id
      title
      author {
        name
      }
      followersYouKnow(limit: 20) {
        name
        profilePicture
      }
      followerCount
    }
  `,
  MetaClogListView: MetaClogListView.fragments.clog,
};

export default ClogCategory;
