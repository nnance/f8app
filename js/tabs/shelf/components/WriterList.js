import React from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';

import CircleImage from '../../../common/CircleImage';
import PureListView from '../../../common/PureListView';
import {colors} from '../../../common/styles';

const Row = props => {
  return (
    <View style={{padding: props.type === 'small' ? 1.5 : 5, alignItems: 'center'}}>
      { !props.data.remaining ?
        <CircleImage
        source={require('../img/B.png')}
        size={props.type === 'small' ? 30 : 100}
        /> :
        <View style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white'
        }}>
          <Text style={{color: colors.textFadedGrey, fontSize: 11}}>+{props.data.remaining}</Text>
        </View>
      }
      {
        props.type === 'big' ?
        <View style={{alignItems: 'center', width: 80}}>
          <Text style={{color: 'white'}} numberOfLines={1}>Tesasdasdasdasdasdast</Text>
        </View>
        : null
      }
    </View>
  );
}

Row.defaultProps = {
  type: 'small'
};

class WriterList extends React.Component {
  render() {
    const limit = 3;
    let count = 0;
    let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    let realData;
    if (this.props.type === 'big') {
      realData = data;
    }
    else {
      realData = data.slice(0, limit);
      if (data.length > limit) {
        realData.push({remaining: data.length - limit})
      }
    }
    return (
      <View>
        {
          this.props.type === 'big' ?
          <View style={{alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: colors.textWhite}} numberOfLines={1}>Editor</Text>
          </View> : null
        }
        <PureListView
          data={realData}
          renderRow={this.renderRow.bind(this)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          minContentHeight={0}
        />
      </View>
    );
  }

  renderRow(data) {
    return <Row type={this.props.type} data={data}/>;
  }
}

WriterList.defaultProps = {
  type: 'small'
};

export default WriterList;
