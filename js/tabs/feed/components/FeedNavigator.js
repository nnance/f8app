import React from 'react';
import {
  View,
  Text
} from 'react-native';
import FixBugScrollViewNavigator from '../../../common/FixBugScrollViewNavigator';
import Home from './Home';

const NotFound = () => <Text>not found</Text>;
class FeedNavigator extends React.Component {
  render() {
    return (
      <Home/>
    )
  }
}

export default FeedNavigator;
