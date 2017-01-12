import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

const categories = [
  {
    title: 'Diary Clog',
    img: require('../../img/category/D.png'),
    size: 90,
    pos: {
      x: 45,
      y: 120
    }
  },
  {
    title: 'Myth Clog',
    img: require('../../img/category/M.png'),
    size: 80,
    pos: {
      x: 220,
      y: 105
    }
  },
  {
    title: 'Gag Clog',
    img: require('../../img/category/G.png'),
    size: 100,
    pos: {
      x: 80,
      y: 280
    }
  },
  {
    title: 'Novel Clog',
    img: require('../../img/category/N.png'),
    size: 80,
    pos: {
      x: 250,
      y: 235
    }
  }
];

class ExploreCategory extends React.Component {
  render() {
    return (
      <Image source={require('../img/home-bg-2.png')} style={{width: undefined, height: 450, resizeMode: 'stretch', backgroundColor: 'transparent'}}>
        {
          categories.map(this.renderCategory)
        }
      </Image>
    );
  }

  renderCategory(category, idx) {
    return (
      <TouchableOpacity style={{
        position: 'absolute',
        top: category.pos.y,
        left: category.pos.x,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image source={category.img} style={{width: category.size, height: category.size}}/>
        <View style={{padding: 5}}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>{category.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ExploreCategory;
