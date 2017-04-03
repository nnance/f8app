import React from 'react';
import FixBugScrollViewNavigator from '../../../common/FixBugScrollViewNavigator';
import Home from '../containers/Home';


class FeedNavigator extends React.Component {
  constructor(...args) {
    super(...args);

    this.renderScene = this.renderScene.bind(this);
  }

  renderScene(route, navigator) {
    if (route.page === 'feedHome') {
      return (<Home
        navigator={navigator}
        goToBook={this.props.goToBook}
      />);
    }
    return null;
  }

  render() {
    return (
      <FixBugScrollViewNavigator
        initialRoute={{ page: 'feedHome' }}
        renderScene={this.renderScene}
      />
    );
  }
}

export default FeedNavigator;
