import React from 'react';
import {
  Navigator,
  Text
} from 'react-native';

import Home from '../containers/Home';
import ClogCategory from '../containers/ClogCategory';

const NotFound = () => <Text>not found</Text>;

class ShelfNavigator extends React.Component {
  render() {
    return (
      <Navigator
        ref="navigator"
        initialRoute={{page: 'home', category: 'D'}}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  renderScene(route, navigator) {
    if (!route) {
      return <NotFound/>;
    }
    if (route.page === 'home') {
      return <Home navigator={navigator}/>;
    }
    if (route.page === 'clog-category') {
      return <ClogCategory navigator={navigator} category={route.category}/>;
    }
    return <NotFound/>;
  }
}

export default ShelfNavigator;
