import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

const categories = [
  {
    category: 'D',
    title: 'Diary Clog',
    img: require('../../img/category/D.png'),
    size: 90,
    pos: {
      x: 45,
      y: 120
    }
  },
  {
    category: 'M',
    title: 'Myth Clog',
    img: require('../../img/category/M.png'),
    size: 80,
    pos: {
      x: 220,
      y: 105
    }
  },
  {
    category: 'G',
    title: 'Gag Clog',
    img: require('../../img/category/G.png'),
    size: 100,
    pos: {
      x: 80,
      y: 280
    }
  },
  {
    category: 'N',
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
          categories.map(this.renderCategory.bind(this))
        }
      </Image>
    );
  }

  renderCategory(categoryDetail, idx) {
    return (
      <TouchableOpacity onPress={this.props.onPress.bind(null, categoryDetail.category)} key={idx} style={{
        position: 'absolute',
        top: categoryDetail.pos.y,
        left: categoryDetail.pos.x,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image source={categoryDetail.img} style={{width: categoryDetail.size, height: categoryDetail.size}}/>
        <View style={{padding: 5}}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>{categoryDetail.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

ExploreCategory.defaultProps = {
  onPress: () => {}
};

export default ExploreCategory;
