import React from 'react';
import {
  View,
  Text
} from 'react-native';
import FixBugScrollViewNavigator from '../../../common/FixBugScrollViewNavigator';
import FeedHome from './FeedHome';
import NavBar from './NavBar';



class FeedNavigator extends React.Component {


  render() {
    return (
      <FixBugScrollViewNavigator
        ref="navigator"
        initialRoute={{page: 'feedHome'}}
        renderScene={this.renderScene.bind(this)}
      />
    )
  }

  renderScene(route, navigator) {
    if (route.page === 'feedHome') {
      return <FeedHome navigator={navigator}/>
    }
  }
}

export default FeedNavigator;
