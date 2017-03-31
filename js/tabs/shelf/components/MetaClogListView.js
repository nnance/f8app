import React from 'react';

import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import gql from 'graphql-tag';

import HorizontalListView from '../../../common/HorizontalListView';
import { colors } from '../../../common/styles';
import CircleImageWithCategory from '../../../common/CircleImageWithCategory';
import { mapSource } from '../../../common/utils';

/* eslint react/no-multi-comp: off */

class ClogMeta extends React.Component {
  constructor(...args) {
    super(...args);
    this.onClogPress = this.onClogPress.bind(this);
  }

  onClogPress(id) {
    if (this.props.onPress && !!id) {
      this.props.onPress(id);
    }
  }

  render() {
    const clog = this.props.clog || {};
    return (
      <TouchableOpacity
        onPress={() => this.onClogPress(clog.id)}
        style={{ flex: 1, paddingHorizontal: 5, paddingVertical: 10, width: 100 }}
      >
        <View style={{ height: 90 }}>
          <CircleImageWithCategory
            source={mapSource(clog.thumbnailImage)}
            category={clog.category}
            size={85}
            shadowRadius={5}
            shadowColor={colors.fadedWhite}
          />
        </View>
        <View style={{ height: 10, alignItems: 'center' }}>
          <Text
            style={{ fontSize: 12, color: colors.textWhite }}
            numberOfLines={1}
          >
            {clog.title}
          </Text>
          <Text
            style={{ fontSize: 10, color: colors.textFadedWhite }}
            numberOfLines={1}
          >
            {clog.author.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class MetaClogListView extends React.Component {
  constructor(...args) {
    super(...args);
    this.clogPress = this.clogPress.bind(this);
  }

  clogPress(id) {
    if (this.props.goToBook) {
      this.props.goToBook(id);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 20, flexDirection: 'row' }}>
          <Text style={{ marginLeft: 10, color: 'white', fontWeight: 'bold', flex: 1 }} numberOfLines={1}>{this.props.header}</Text>
          <View style={{ alignItems: 'flex-end', justifyContent: 'center', paddingRight: 10 }}>
            {
              this.props.renderButton ? this.props.renderButton() : null
            }
          </View>
        </View>
        <View style={{ height: 130 }}>
          <HorizontalListView
            showsHorizontalScrollIndicator={false}
            data={this.props.clogs}
            renderRow={clog => <ClogMeta clog={clog} onPress={this.clogPress} />}
          />
        </View>
      </View>
    );
  }
}

MetaClogListView.fragments = {
  clog: gql`
    fragment MetaClogListView on Clog {
      id
      title
      thumbnailImage
      category
      author {
        name
      }
    }
  `,
};
