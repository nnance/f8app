import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import CircleImage from '../../../common/CircleImage';
import HorizontalListView from '../../../common/HorizontalListView';
import BorderButton from '../../../common/BorderButton';
import { colors } from '../../../common/styles';

const Row = props => (
  <View style={{ paddingVertical: 1.5, paddingHorizontal: 1.5, alignItems: 'center' }}>
    { !props.data.remaining ?
      <CircleImage
        source={{ uri: props.data.profilePicture }}
        size={30}
        shadowRadius={2}
        shadowColor="white"
      /> :
      <View
        style={{
          width: 30 + 2,
          height: 30 + 2,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Text style={{ color: colors.textFadedGrey, fontSize: 11 }}>+{props.data.remaining}</Text>
      </View>
    }
  </View>
);

class FollowerShortenList extends React.Component {
  constructor(...args) {
    super(...args);
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(data) {
    return <Row data={data} />;
  }

  render() {
    const limit = 3;
    const data = this.props.editors;
    let realData;
    realData = data.slice(0, limit);
    if (data.length > limit) {
      realData.push({ remaining: data.length - limit });
    }
    return (
      <View>
        <HorizontalListView
          data={realData}
          renderRow={this.renderRow}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default FollowerShortenList;
