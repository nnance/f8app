import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import FixBugScrollView from '../../../common/FixBugScrollView';
import NavBar from './NavBar';
import FeedList from './FeedList';
import data from '../data';


class FeedHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: data,
      isRefreshing: false
    }
  }

  // Pull to refresh handler
  _onRefresh = () => {
    this.setState({isRefreshing: true})
    setTimeout(() => {
      console.log('Feeds loading....');
      this.setState({isRefreshing: false})
    }, 3000)
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#F0F0F0'}}>
        <NavBar
          renderRightMenu={() => (
              <TouchableOpacity style={{zIndex: 3}}><Image style={{height: 20, resizeMode: 'contain'}} source={require('../img/search.png')}/></TouchableOpacity>
            )}
          renderTitle={() => (
              <Image style={{width: 80, height: 30, resizeMode: 'contain'}} source={require('../img/title.png')}/>
            )}
          titleStyle={{
              flex: 1,
              alignItems: 'flex-start'
            }}
        />
        <FixBugScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#ff0000"
              title="..."
              titleColor="#000"
              />
          }>
          <View style={{backgroundColor: '#7d7d7d'}}>
            <FeedList data={this.state.data} navigator={this.props.navigator}/>
          </View>
        </FixBugScrollView>

      </View>
    )
  }
}

export default FeedHome