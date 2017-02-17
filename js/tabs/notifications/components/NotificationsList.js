import React from 'react';
import {
  View,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import data from '../data';


const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

class NotificationsRow extends React.Component {
  render() {
    const clogNumber = this.props.clogs.length;
    const typeActivity = this.props.activity.type;
    const now = Date.now();
    const timeAdded = new Date(this.props.activity.time);
    const diffMins = Math.round((((now - timeAdded) % 86400000) % 3600000) / 60000);

    let activityDetail;
    if (clogNumber === 1) {
      activityDetail = `${this.props.activity.action} a ${typeActivity}`;
    } else if (clogNumber > 1) {
      activityDetail = `${this.props.activity.action} ${clogNumber} ${typeActivity}`;
    }

    return (
      <TouchableOpacity onPress={() => this.props.goToBook("58a6e85138cbdaba481a7b59")}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fbfbfb' }}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{ uri: this.props.picture.large }}
          />
          <View style={{ flex: 1 }}>
            <Text numberOfLines={2} style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 15 }}>
              {`${this.props.name.first} ${this.props.name.last} `}
              <Text style={{ fontWeight: 'normal', fontSize: 12, color: '#929292' }}>{activityDetail}</Text>
            </Text>
            <Text style={{ marginLeft: 10, fontSize: 12, color: '#D3D3D3' }}>
              {`${diffMins} mins ago`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

class NotificationsList extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(data),
    };
  }

  render() {
    return (
      <ListView
        showsHorizontalScrollIndicator={false}
        dataSource={this.state.dataSource}
        renderRow={dataRow => <NotificationsRow goToBook={this.props.goToBook} {...dataRow} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}

export default NotificationsList;
