import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import gql from 'graphql-tag';

import { colors } from '../../../common/styles';
import CircleImageWithCategory from '../../../common/CircleImageWithCategory';
import BorderButton from '../../../common/BorderButton';
import { mapSource } from '../../../common/utils';

class RecommendedClog extends React.Component {
  constructor(...args) {
    super(...args);
    this.onReadPress = this.onReadPress.bind(this);
  }

  onReadPress() {
    const clog = this.props.clog;
    if (this.props.goToBook && clog) {
      this.props.goToBook(clog.id);
    }
  }

  render() {
    const clog = this.props.clog || {};
    return (
      <View style={{ flex: 1 }}>
        <Image source={require('../../../assets/shelf/top-clog-bg.png')} style={{ flex: 1, flexDirection: 'row', resizeMode: 'stretch', width: undefined, height: undefined }}>
          <View style={{ width: 130, justifyContent: 'center', alignItems: 'center', paddingLeft: 10 }}>
            <CircleImageWithCategory
              source={mapSource(clog.thumbnailImage)}
              category={clog.category}
              size={130}
              shadowRadius={5}
              shadowColor={colors.fadedWhite}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
            <View style={{ height: 100, paddingHorizontal: 20 }}>
              <View style={{ flex: 2 }}>
                <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold', lineHeight: 14 }} numberOfLines={1}>
                  {clog.title}
                </Text>
                <Text style={{ fontSize: 11, color: colors.textFadedWhite }}>
                  {clog.author ? clog.author.name : null}
                </Text>
              </View>
              <View style={{ flex: 4, paddingTop: 10 }}>
                <Text
                  style={{ fontSize: 11, color: colors.textFadedWhite, lineHeight: 12 }}
                  numberOfLines={4}
                >
                  {clog.synopsis}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', paddingTop: 10 }}>
                <BorderButton onPress={this.onReadPress} caption="อ่าน" containerStyle={{ height: 18, width: 60 }} textStyle={{ color: 'rgba(60, 30, 90, 1)' }} />
              </View>
            </View>
          </View>
        </Image>
      </View>
    );
  }
}

RecommendedClog.fragments = {
  clog: gql`
    fragment RecommendedClog on Clog {
      id
      title
      thumbnailImage
      category
      author {
        name
      }
      synopsis
    }
  `,
};

export default RecommendedClog;
