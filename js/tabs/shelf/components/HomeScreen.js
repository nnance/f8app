import React from 'react';

import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import NavBar from '../../../common/NavBar';

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
          <Image source={require('../img/home-bg-1.png')} style={{width: undefined, height: 1400, resizeMode: 'stretch', backgroundColor: 'transparent'}}>
          </Image>
          <Image source={require('../img/home-bg-2.png')} style={{width: undefined, height: 450, resizeMode: 'stretch', backgroundColor: 'transparent'}}>
          </Image>
        </ScrollView>
      </View>
    );
  }
}

export default HomeScreen;
