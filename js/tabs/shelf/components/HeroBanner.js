import React from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import gql from 'graphql-tag';

import CircleImage from '../../../common/CircleImage';
import HorizontalListView from '../../../common/HorizontalListView';
import { colors } from '../../../common/styles';

const Row = ({ onPress, clog }) => (<TouchableOpacity style={{ flex: 1, padding: 20 }} onPress={onPress.bind(null, clog.id)}>
  <CircleImage size={250} source={{ uri: clog.preview }}>
    <CircleImage size={250} source={require('../img/faded-blue.png')}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 180 }}>
        <View style={{ width: 150, alignItems: 'center' }}>
          <Text numberOfLines={1} style={{ color: 'white', fontWeight: 'bold' }}>{clog.title}</Text>
        </View>
        <View style={{ width: 100, alignItems: 'center' }}>
          <Text numberOfLines={1} style={{ color: colors.textFadedWhite, fontWeight: 'bold' }}>{clog.author.name}</Text>
        </View>
      </View>
    </CircleImage>
  </CircleImage>
</TouchableOpacity>);

class HeroBanner extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HorizontalListView
          data={this.props.clogs}
          renderRow={this.renderRow.bind(this)}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  renderRow(clog) {
    return <Row clog={clog} onPress={this.onBannerPress.bind(this)} />;
  }

  onBannerPress(id) {
    this.props.goToBook && this.props.goToBook(id);
  }
}

HeroBanner.fragments = {
  clog: gql`
    fragment HeroBanner on Clog {
      id
      title
      preview
      author {
        name
      }
    }
  `,
};

export default HeroBanner;
