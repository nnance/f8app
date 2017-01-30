import React from 'react';
import {
  View,
  ListView,
  StyleSheet,
  Text
} from 'react-native';
import FeedRow from './FeedRow';
import data from '../data';


const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

class Row extends React.Component {
  render() {
    return (
      <View>
        <Text>{this.props.name.first}</Text>
      </View>
    )
  }
}

class FeedList extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(data)
    };
  }

  render() {
    return (
      <ListView
        showsHorizontalScrollIndicator={false}
        dataSource={this.state.dataSource}
        renderRow={(data) => <FeedRow {...data} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} /> }
      />
    );
  }
}

export default FeedList;