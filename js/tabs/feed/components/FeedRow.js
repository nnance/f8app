import React from 'react';
import {
  View,
  ListView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fbfbfb',
  },
  containerProfile: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  photoClog: {
    width: 325,
    height: 150,
    borderRadius: 10,
  },
  photoClogList: {
    width: 85,
    height: 85,
    borderRadius: 40,
  },
});

/* eslint react/no-multi-comp: warn */

class EditorAcivity extends React.Component {
  render() {
    const now = Date.now();
    const timeAdded = new Date(this.props.activity.time);
    const diffMins = Math.round((((now - timeAdded) % 86400000) % 3600000) / 60000);
    return (
      <View style={styles.container}>
        <View style={styles.containerProfile}>
          <Image style={styles.photo} source={{ uri: this.props.picture.large }} />
          <Text style={{ marginLeft: 12, fontWeight: 'bold', fontSize: 16 }}>
            {`${this.props.name.first} ${this.props.name.last} `}
            {
              this.props.clogs.length === 1 ?
                <Text style={{ fontSize: 12, fontWeight: 'normal' }}>{`${this.props.activity.action} `}<Text
                  style={{ fontSize: 16, fontWeight: 'bold' }}
                >{this.props.clogs[0].title}</Text></Text>
                : <Text
                  style={{ fontSize: 12, fontWeight: 'normal' }}
                >{`${this.props.activity.action} ${this.props.clogs.length} ${this.props.activity.type}`}</Text>
            }
          </Text>
          <Text style={{ fontSize: 12, color: '#dfdfdf' }}> {diffMins} min ago</Text>
        </View>
      </View>
    );
  }
}

class FeedRow extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(props.clogs),
    };
  }

  render() {
    console.log(this.props.goToBook);

    return (
      <View style={styles.container}>
        <EditorAcivity {...this.props} />
        <View style={styles.containerProfile}>
          {
            this.props.clogs.length > 1 ?
              <ListView
                horizontal
                showsHorizontalScrollIndicator={false}
                dataSource={this.state.dataSource}
                renderRow={
                  data => <ClogList goToBook={this.props.goToBook} {...data} />
                }
                renderSeparator={
                  (sectionId, rowId) =>
                    <View key={rowId} style={styles.separator} />
                }
              /> :
              <Clog clog={this.props.clogs[0]} goToBook={this.props.goToBook} />
          }
        </View>
      </View>
    );
  }
}

class Clog extends React.Component {
  render() {
    const { clog, goToBook } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => goToBook("58a6e85138cbdaba481a7b59")}>
          <Image style={styles.photoClog} source={{ uri: clog.picture.thumbnail }} />
          <Text style={{ fontWeight: 'bold' }}>
            {`${clog.title}`}
          </Text>
          <Text numberOfLines={2} style={{ lineHeight: 12 }}>
            {`${clog.review}`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class ClogList extends React.Component {
  render() {
    const { picture, title, author, goToBook } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => goToBook(1)}>
          <Image style={styles.photoClogList} source={{ uri: picture.thumbnail }} />
          <Text style={{ fontWeight: 'bold', marginTop: 5 }}>
            {`${title}`}
          </Text>
          <Text style={{ fontSize: 12 }}>
            {`${author.name}`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default FeedRow;
