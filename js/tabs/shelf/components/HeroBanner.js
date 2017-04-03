import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import gql from 'graphql-tag';

import CircleImage from '../../../common/CircleImage';
import HorizontalListView from '../../../common/HorizontalListView';
import { colors } from '../../../common/styles';
import { mapSource } from '../../../common/utils';

const Row = ({ onPress, clog }) =>
  (<TouchableOpacity style={{ flex: 1, padding: 20 }} onPress={() => onPress(clog.id)}>
    <CircleImage size={250} source={mapSource(clog.thumbnailImage)}>
      <CircleImage size={250} source={require('../../../assets/shelf/faded-blue.png')}>
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
  constructor(...args) {
    super(...args);

    this.renderRow = this.renderRow.bind(this);
    this.onBannerPress = this.onBannerPress.bind(this);
  }

  onBannerPress(id) {
    if (this.props.goToBook) {
      this.props.goToBook(id);
    }
  }

  renderRow(clog) {
    return <Row clog={clog} onPress={this.onBannerPress} />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HorizontalListView
          data={this.props.clogs}
          renderRow={this.renderRow}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

HeroBanner.fragments = {
  clog: gql`
    fragment HeroBanner on Clog {
      id
      title
      thumbnailImage
      author {
        name
      }
    }
  `,
};

export default HeroBanner;
