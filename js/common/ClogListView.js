import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import gql from 'graphql-tag';
import moment from 'moment';

import { colors } from './styles';
import PureListView from './PureListView';
import FixBugScrollView from './FixBugScrollView';
import CircleImageWithCategory from './CircleImageWithCategory';
import { toHumanNumber, mapSource } from './utils';

const styles = StyleSheet.create({
  rowContainer: {
    padding: 13,
    flexDirection: 'row',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readContainer: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const ClogRow = props => (
  <TouchableOpacity
    onPress={props.onPress ? props.onPress.bind(null, props.id) : null}
    style={styles.rowContainer}
  >
    <CircleImageWithCategory
      source={mapSource(props.preview)}
      category={props.category}
      size={100}
    />
    <View style={{ flex: 1, paddingLeft: 20 }}>
      <Text style={{ alignSelf: 'flex-end', fontSize: 12, color: colors.textFadedGrey }}>
        {moment(props.createdAt).format('MMMM D')}
      </Text>
      <Text style={{ fontWeight: 'bold', marginTop: 7 }}>{props.title}</Text>
      <Text style={{ fontSize: 12, marginTop: 5, color: colors.textGrey }}>
        {props.author.name}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.readContainer}>
          <Image
            source={require('./img/icon/read.png')}
            style={{ width: 15, height: 15, resizeMode: 'contain', borderRadius: 4 }}
          />
          <Text style={{ paddingLeft: 5, fontSize: 11, color: colors.textFadedGrey }}>
            ดู {toHumanNumber(props.viewCount)} ครั้ง
          </Text>
        </View>
        <View style={styles.likeContainer}>
          <Image
            source={require('./img/icon/heart.png')}
            style={{ width: 15, height: 15, resizeMode: 'contain', borderRadius: 4, marginLeft: 20 }}
          />
          <Text style={{ paddingLeft: 5, fontSize: 11, color: colors.textFadedGrey }}>
            {toHumanNumber(props.likeCount)} Like
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

class ClogListView extends React.Component {
  constructor(...args) {
    super(...args);

    this.onClogPress = this.onClogPress.bind(this);
  }

  onClogPress(id) {
    if (this.props.onClogPress) {
      this.props.onClogPress(id);
    }
  }

  render() {
    return (
      <FixBugScrollView>
        <PureListView
          data={this.props.clogs}
          renderRow={clog => <ClogRow {...clog} onPress={this.onClogPress} />}
        />
      </FixBugScrollView>
    );
  }
}

ClogListView.fragments = {
  clog: gql`
    fragment ClogListView on Clog {
      id
      title
      preview
      category
      viewCount
      likeCount
      author {
        name
      }
      createdAt
    }
  `,
};

export default ClogListView;
