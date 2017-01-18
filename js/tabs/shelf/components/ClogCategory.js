import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors} from '../../../common/styles';
import BorderButton from '../../../common/BorderButton';
import PureListView from '../../../common/PureListView';
import {toHumanNumber} from '../../../common/utils';
import {getCategoryLogo} from '../../../models/clog';
import NavBar, {HEIGHT} from './NavBar';
import WriterList from './WriterList';
import ClogListView from './ClogListView';

const clogThemes = {
  D: {
    logo: getCategoryLogo('D'),
    title: 'Diary Clog',
    color: 'rgb(252, 246, 67)',
    borderNavBar: 'rgb(212, 206, 27)',
    bannerColor: 'rgb(249, 220, 73)'
  },
  G: {
    logo: getCategoryLogo('G'),
    title: 'Gag Clog',
    color: 'rgb(49, 240, 185)',
    borderNavBar: 'rgb(9, 200, 145)',
    bannerColor: 'rgb(49, 240, 185)'
  },
  M: {
    logo: getCategoryLogo('M'),
    title: 'Myth Clog',
    color: 'rgb(30, 153, 246)',
    borderNavBar: 'rgb(0, 113, 216)',
    bannerColor: 'rgb(30, 153, 246)'
  },
  N: {
    logo: getCategoryLogo('N'),
    title: 'Novel Clog',
    color: 'rgb(244, 68, 54)',
    borderNavBar: 'rgba(200, 40, 30, 1)',
    bannerColor: 'rgb(230, 35, 70)'
  }
};

const OpacityCircle = props => {
  return (
    <View style={[
        styles.centerItems,
        {
          width: props.size,
          height: props.size,
          borderRadius: props.size / 2,
          backgroundColor: `rgba(255, 255, 255, ${props.opacity})`,
        },
        props.style
      ]}>{props.children}</View>
  )
}

class ClogLogo extends React.Component {
  render() {
    const clogTheme = clogThemes[this.props.category];
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <OpacityCircle size={325} opacity={0.1}>
          <OpacityCircle size={250} opacity={0.15}>
            <OpacityCircle size={175} opacity={0.2}>
              <OpacityCircle size={100} opacity={0.25}>
                <Image
                  source={clogTheme.logo}
                  style={{
                    height: 80,
                    resizeMode: 'contain'
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
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{
            flex: 4,
            backgroundColor: clogTheme.bannerColor,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10
        }}>
          <Image source={require('../img/mock-clog-banner.png')}
            style={{
              flex: 1,
              resizeMode: 'cover',
              borderRadius: 10,
              width: undefined
            }}
            >
            <LinearGradient
              start={{
                x: 0.1,
                y: 0.5
              }}
              end={{
                x: 1,
                y: 0.5
              }}
              colors={['rgba(255, 255, 255, 0)', clogTheme.bannerColor]}
              style={{
                flex: 1,
                top: 0,
                height: undefined
              }}
              />
          </Image>
        </View>
        <View style={{
          flex: 5,
          backgroundColor: clogTheme.bannerColor,
          height: undefined,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10
        }}>
          <View style={{
              flex: 1,
              paddingHorizontal: 10,
              justifyContent: 'center'
            }}>
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

class ClogCategory extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      currentClogBanner: 0
    };
  }

  render() {
    const clogTheme = clogThemes[this.props.category];
    const currentClogBanner = this.props.recommendedClogs[this.state.currentClogBanner];
    return (
      <LinearGradient locations={[0, 0.5, 0.5, 1]} colors={[clogTheme.color, clogTheme.color, 'rgb(220, 4, 87)', 'rgb(220, 4, 87)']} style={{flex: 1, backgroundColor: 'transparent'}}>
        <ScrollView style={{flex: 1, backgroundColor: 'transparent'}}>
          <LinearGradient style={{height: 570}} colors={[clogTheme.color, 'rgb(164, 58, 124)']}>
            <Image source={require('../img/star-bg.png')}
              style={{
                flex: 1,
                width: undefined,
                resizeMode: 'cover'
              }}
            >
              <View style={{flex: 1}}>
                <View style={{height: HEIGHT}}/>
                <View style={{height: 50, width: undefined, flexDirection: 'row', padding: 5, alignItems: 'center'}}>
                  <View style={{flex: 1}}>
                    <WriterList editors={currentClogBanner ? this.props.recommendedClogs[this.state.currentClogBanner].followersYouKnow : []}/>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                      <View style={[{backgroundColor: 'transparent', paddingHorizontal: 8}]}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.followerNumber}>
                            {toHumanNumber(currentClogBanner ? currentClogBanner.followerCount : 0)}
                          </Text>
                          <Text style={styles.followingWord}> คน</Text></View>
                        <View><Text style={styles.followingWord}>กำลังติดตาม</Text></View>
                      </View>
                      <View>
                        <BorderButton type="fadedWhite" caption="ติดตาม"/>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{height: 150, width: undefined, padding: 5, justifyContent: 'center'}}>
                  <ClogLogo category={this.props.category}/>
                </View>
                <View style={{height: 150, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <PureListView
                  data={this.props.recommendedClogs}
                  pagingEnabled
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  minContentHeight={0}
                  renderRow={this.renderClogBanner.bind(this)}
                  onScroll={this.onScroll.bind(this)}
                  />
                </View>
                <View style={{height: 160, padding: 5}}>
                  <ClogListView header="What's New" clogs={this.props.recentlyClogs} renderButton={this.renderViewAllClog.bind(this)}/>
                </View>
              </View>
            </Image>
          </LinearGradient>
          <LinearGradient colors={['rgb(164, 58, 124)', 'rgb(220, 4, 87)']}>
            <View style={{height: 160, padding: 5}}>
              <ClogListView header="Top Chart" clogs={this.props.trendingClogs} renderButton={this.renderViewAllClog.bind(this)}/>
            </View>
            <View style={{height: 180, padding: 5}}>
              <WriterList type="big" editors={this.props.editors}/>
            </View>
          </LinearGradient>
        </ScrollView>
        <NavBar
          onBackPress={() => this.props.navigator.pop()}
          renderRightMenu={() => (
            <TouchableOpacity><Image style={{height: 20, resizeMode: 'contain'}} source={require('../img/white-search.png')}/></TouchableOpacity>
          )}
          renderTitle={() => (
            <Text style={{
                color: colors.textWhite,
                fontWeight: 'bold',
                fontSize: 20
              }}>
              {clogTheme.title}
            </Text>
          )}
          containerStyle={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: clogTheme.color,
            borderBottomWidth: 0.3,
            borderColor: clogTheme.borderNavBar
          }}
        />
      </LinearGradient>
    );
  }

  onScroll(e) {
    const offsetX = e.nativeEvent.contentOffset.x;
    const heroBannerWidth = Dimensions.get('window').width - 20;
    let idx = Math.floor(offsetX / heroBannerWidth);
    idx = idx >= 0 ? idx : 0;
    this.setState({
      currentClogBanner: idx
    });
  }

  renderClogBanner(data) {
    return (
      <View style={{flex: 1, width: 320, marginHorizontal: (Dimensions.get('window').width - 320 - 20) / 2}}>
        <ClogBanner category={this.props.category} clog={data}/>
      </View>
    );
  }

  renderViewAllClog() {
    return <BorderButton type="fadedWhite" caption="ทั้งหมด"/>
  }
}

const styles = StyleSheet.create({
  centerItems: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  followerNumber: {
    fontWeight: 'bold',
    fontSize: 11,
    color: 'white'
  },
  followingWord: {
    fontSize: 10,
    color: 'white'
  },
  bannerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  bannerAuthorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textFadedWhite
  }
});

export default ClogCategory;
