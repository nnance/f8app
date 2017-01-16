import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors} from '../../../common/styles';
import BorderButton from '../../../common/BorderButton';
import NavBar from './NavBar';
import WriterList from './WriterList';
import ClogListView from './ClogListView';

class ClogCategory extends React.Component {
  render() {
    const clogTheme = {
      color: 'rgb(244, 68, 54)',
      borderNavBar: 'rgba(200, 40, 30, 1)'
    };
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
  }
});

export default ClogCategory;
