import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import FixBugScrollView from '../../../common/FixBugScrollView';
import NavBar from './NavBar';
import FeedList from './FeedList';
import data from '../data';

class FeedHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data,
      isRefreshing: false,
    };
  }

  // Pull to refresh handler
  onRefresh = () => {
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      console.log('Feeds loading....');
      this.setState({ isRefreshing: false });
    }, 3000);
  }

  render() {
    const { loading, feed } = this.props;
    if (loading) {
      return (
        <View><Text>Loading</Text></View>
      );
    }

    const feedList = [];
    feed.map((value) => {
      value.clog.map((clog) => {
        feedList.push({
          author: value.author,
          clog: clog.clog,
          createdAt: new Date(clog.createdAt),
        });
      });
    });

    feedList.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });


    return (
      <View style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
        <NavBar
          renderRightMenu={() => (
            <TouchableOpacity style={{ zIndex: 3 }}><Image style={{ height: 20, resizeMode: 'contain' }} source={require('../../../assets/common/pink-search.png')} /></TouchableOpacity>
            )}
          renderTitle={() => (
            <Image style={{ width: 80, height: 30, resizeMode: 'contain' }} source={require('../../../assets/feed/title.png')} />
            )}
          titleStyle={{
            flex: 1,
            alignItems: 'flex-start',
          }}
        />
        <FixBugScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh}
              tintColor="#ff0000"
              title="..."
              titleColor="#000"
            />
          }
        >
          <View style={{ backgroundColor: '#7d7d7d' }}>
            <FeedList
              data={data}
              feed={feedList}
              goToBook={this.props.goToBook}
              navigator={this.props.navigator}
            />
          </View>
        </FixBugScrollView>
      </View>
    );
  }
}

export default FeedHome;
