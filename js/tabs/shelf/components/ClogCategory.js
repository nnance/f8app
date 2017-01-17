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
import NavBar from './NavBar';
import WriterList from './WriterList';
import ClogListView from './ClogListView';

const clogTheme = {
  color: 'rgb(244, 68, 54)',
  borderNavBar: 'rgba(200, 40, 30, 1)',
  bannerColor: 'rgb(230, 35, 70)'
};

class ClogBanner extends React.Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{
            flex: 4,
            backgroundColor: clogTheme.bannerColor,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10
        }}>
          <Image source={{uri: 'http://scontent-fbkk5-7.us-fbcdn.net/v1/t.1-48/1426l78O9684I4108ZPH0J4S8_842023153_K1DlXQOI5DHP/dskvvc.qpjhg.xmwo/p/data/143/143382-2-6462.jpg'}}
            style={{
              flex: 1,
              resizeMode: 'cover',
              borderRadius: 10
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
              <Text style={styles.bannerTitleText}>Mon Oncle</Text>
              <Text style={styles.bannerOwnerText}>Steve Jobs</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

class ClogCategory extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1, backgroundColor: 'transparent'}}>
          <LinearGradient style={{height: 600}} colors={[clogTheme.color, 'rgb(164, 58, 124)']}>
            <NavBar
              renderRightMenu={() => (
                <TouchableOpacity><Image style={{height: 20, resizeMode: 'contain'}} source={require('../img/white-search.png')}/></TouchableOpacity>
              )}
              renderTitle={() => (
                <Text style={{
                    color: colors.textWhite,
                    fontWeight: 'bold',
                    fontSize: 20
                  }}>
                  Novel Clog
                </Text>
              )}
              containerStyle={{
                backgroundColor: 'transparent',
                borderBottomWidth: 0.3,
                borderColor: clogTheme.borderNavBar
              }}
            />
            <Image source={require('../img/star-bg.png')}
              style={{
                flex: 1,
                width: undefined,
                resizeMode: 'stretch'
              }}
            >
              <View style={{flex: 1}}>
                <View style={{height: 50, width: undefined, flexDirection: 'row', padding: 5, alignItems: 'center'}}>
                  <View style={{flex: 1}}>
                    <WriterList/>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                      <View style={[{backgroundColor: 'transparent', paddingHorizontal: 8}]}>
                        <View style={{flexDirection: 'row'}}><Text style={styles.followingNumber}>1,500</Text><Text style={styles.followingWord}>คน</Text></View>
                        <View><Text style={styles.followingWord}>กำลังติดตาม</Text></View>
                      </View>
                      <View>
                        <BorderButton type="fadedWhite" caption="ติดตาม"/>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{height: 150, width: undefined, padding: 5, justifyContent: 'center'}}>
                  <Image
                    source={require('../img/gag-clog.png')}
                    style={{
                      height: 80,
                      resizeMode: 'contain'
                    }}
                    />
                </View>
                <View style={{height: 150, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <PureListView
                  data={[1, 1, 1, 1, 1, 1]}
                  pagingEnabled
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  minContentHeight={0}
                  renderRow={this.renderClogBanner.bind(this)}
                  />
                </View>
                <View style={{height: 180, padding: 5}}>
                  <ClogListView header="What's New" clogs={require('../mockData').fakeMetaClog} renderButton={this.renderViewAllClog.bind(this)}/>
                </View>
              </View>
            </Image>
          </LinearGradient>
          <LinearGradient colors={['rgb(164, 58, 124)', 'rgb(220, 4, 87)']}>
            <View style={{height: 180, padding: 5}}>
              <ClogListView header="Top Chart" clogs={require('../mockData').fakeMetaClog} renderButton={this.renderViewAllClog.bind(this)}/>
            </View>
            <View style={{height: 180, padding: 5}}>
              <WriterList type="big"/>
            </View>
          </LinearGradient>
        </ScrollView>
      </View>
    );
  }

  renderClogBanner() {
    return <View style={{flex: 1, width: 320, marginHorizontal: (Dimensions.get('window').width - 320 - 20) / 2}}><ClogBanner/></View>;
  }

  renderViewAllClog() {
    return <BorderButton type="fadedWhite" caption="ทั้งหมด"/>
  }
}

const styles = StyleSheet.create({
  followingNumber: {
    fontWeight: 'bold',
    fontSize: 12,
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
  bannerOwnerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textFadedWhite
  }
});

export default ClogCategory;
