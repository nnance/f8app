import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import CircleImage from '../../../common/CircleImage';
import HorizontalListView from '../../../common/HorizontalListView';
import { colors } from '../../../common/styles';
import { mapSource } from '../../../common/utils';

const Row = props => (
  <View style={{ paddingVertical: 1.5, paddingHorizontal: 1.5, alignItems: 'center' }}>
    { !props.data.remaining ?
      <CircleImage
        source={mapSource(props.data.profilePicture)}
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
    const data = this.props.followers;
    const count = data.length > 1002 ? 1002 : data.length;
    const realData = data.slice(0, limit);
    if (count > limit) {
      realData.push({ remaining: count - limit });
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
