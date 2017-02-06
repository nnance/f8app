import React from 'react';
import {
  View,
  ListView,
  StyleSheet,
  Text
} from 'react-native';
import FeedRow from './FeedRow';

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});


class FeedList extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.data)
    };
  }

  render() {
    return (
      <ListView
        showsHorizontalScrollIndicator={false}
        dataSource={this.state.dataSource}
        renderRow={(data) => <FeedRow navigator={this.props.navigator} goToBook={this.props.goToBook} {...data} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} /> }
      />
    );
  }
}

export default FeedList;