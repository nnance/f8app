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
  <View style={{ paddingVertical: 8, paddingHorizontal: 15, alignItems: 'center' }}>
    { !props.data.remaining ?
      <CircleImage
        source={{ uri: props.data.profilePicture }}
        size={80}
        shadowRadius={4}
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
    <View style={{ alignItems: 'center', width: 80, paddingTop: 5 }}>
      <Text style={{ color: 'white' }} numberOfLines={1}>{props.data.name}</Text>
    </View>
  </View>
);

class WriterList extends React.Component {
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
    realData = data;
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.textWhite }} numberOfLines={1}>Editor</Text>
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ alignItems: 'flex-end', justifyContent: 'center', paddingRight: 10 }}>
            <BorderButton onPress={this.props.onViewAllPress} type="fadedWhite" caption="ทั้งหมด" />
          </View>
        </View>
        <HorizontalListView
          data={realData}
          renderRow={this.renderRow}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default WriterList;
