import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import { getCategoryIcon } from '../../../models/clog';

const categories = [
  {
    category: 'D',
    title: 'Diary Clog',
    img: getCategoryIcon('D'),
    size: 90,
    pos: {
      x: 0,
      y: 120,
    },
  },
  {
    category: 'M',
    title: 'Myth Clog',
    img: getCategoryIcon('M'),
    size: 80,
    pos: {
      x: 175,
      y: 105,
    },
  },
  {
    category: 'G',
    title: 'Gag Clog',
    img: getCategoryIcon('G'),
    size: 100,
    pos: {
      x: 35,
      y: 280,
    },
  },
  {
    category: 'N',
    title: 'Novel Clog',
    img: getCategoryIcon('N'),
    size: 80,
    pos: {
      x: 205,
      y: 235,
    },
  },
];

class ExploreCategory extends React.Component {
  constructor(...args) {
    super(...args);

    this.renderCategory = this.renderCategory.bind(this);
  }

  renderCategory(categoryDetail, idx) {
    let disable = false;
    if(categoryDetail.title !== 'Gag Clog') {
      disable = true;
    }
    return (
      <TouchableOpacity
        onPress={() => disable ? null : this.props.onPress(categoryDetail.category)} key={idx} style={{
          position: 'absolute',
          top: categoryDetail.pos.y,
          left: categoryDetail.pos.x,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Image
          source={categoryDetail.img}
          style={{ width: categoryDetail.size, height: categoryDetail.size,
          opacity: disable ? 0.1 : 1 }}
        />
        <View style={{ padding: 5 }}>
          <Text style={{ fontWeight: 'bold', color: disable ? '#AAA':'white' }}>{categoryDetail.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Image source={require('../../../assets/shelf/home-bg-2.png')} style={{ width: undefined, height: 450, resizeMode: 'stretch', backgroundColor: 'transparent' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flex: 1, width: 205 + 85 }}>
            { categories.map(this.renderCategory) }
          </View>
        </View>
      </Image>
    );
  }
}

ExploreCategory.defaultProps = {
  onPress: () => {},
};

export default ExploreCategory;
