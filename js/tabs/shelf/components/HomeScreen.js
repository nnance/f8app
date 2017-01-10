import React from 'react';

import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import NavBar from '../../../common/NavBar';

import ClogListView from './ClogListView';
import TopClog from './TopClog';

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
          <Image source={require('../img/home-bg-1.png')} style={{width: undefined, height: 1300, resizeMode: 'stretch', backgroundColor: 'transparent'}}>
            <View style={{paddingButtom: 30}}>
              <Image source={require('../img/mock-head.png')} style={{resizeMode: 'stretch', width: 350, height: 280}}/>
            </View>
            <View style={{flex: 1}}>
              <ClogListView header="TRENDING" clogs={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}/>
            </View>
            <View style={{flex: 1.8}}>
              <TopClog/>
            </View>
            <View style={{flex: 3}}/>
            <View style={{flex: 0.3}}/>
          </Image>
          <Image source={require('../img/home-bg-2.png')} style={{width: undefined, height: 450, resizeMode: 'stretch', backgroundColor: 'transparent'}}>
          </Image>
        </ScrollView>
      </View>
    );
  }
}

export default HomeScreen;
