import React from 'react';

import {
  ScrollView,
  InteractionManager
} from 'react-native';

class FixBugScrollView extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      mainScrollX: 0,
      mainScrollY: 0
    };
    this.fixScrollBug = this.fixScrollBug.bind(this);
  }

  componentDidMount() {
    this.context && this.context.addFixBugListener && this.context.addFixBugListener(this.fixScrollBug);
    InteractionManager.runAfterInteractions(() => {
      this.fixScrollBug();
    });
  }

  componentWillUnmount() {
    this.context && this.context.removeFixBugListener && this.context.removeFixBugListener(this.fixScrollBug);
  }

  render() {
    return <ScrollView {...this.props} ref="mainScrollView" onScroll={(e) => {
        this.setState({
          mainScrollX: e.nativeEvent.contentOffset.x,
          mainScrollY: e.nativeEvent.contentOffset.y
        });
      }}/>;
  }

  fixScrollBug() {
    const x = this.state.mainScrollX;
    const y = this.state.mainScrollY;
    this.refs.mainScrollView.scrollTo({
      x: x,
      y: y + 1
    });
    this.refs.mainScrollView.scrollTo({
      x: x,
      y: y
    });
  }
}

FixBugScrollView.contextTypes = {
  addFixBugListener: React.PropTypes.func,
  removeFixBugListener: React.PropTypes.func
};

export default FixBugScrollView;
