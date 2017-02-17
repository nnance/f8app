import React from 'react';

import {
  ScrollView,
  InteractionManager,
} from 'react-native';

class FixBugScrollView extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      mainScrollX: 0,
      mainScrollY: 0,
    };
    this.fixScrollBug = this.fixScrollBug.bind(this);
  }

  componentDidMount() {
    if (this.context && this.context.addFixBugListener) {
      this.context.addFixBugListener(this.fixScrollBug);
    }
    this.fixScrollBug();
  }

  componentWillUnmount() {
    if (this.context && this.context.removeFixBugListener) {
      this.context.removeFixBugListener(this.fixScrollBug);
    }
  }

  fixScrollBug() {
    const x = this.state.mainScrollX;
    const y = this.state.mainScrollY;
    InteractionManager.runAfterInteractions(() => {
      this.mainScrollView.scrollTo({
        x,
        y: y + 1,
      });
      this.mainScrollView.scrollTo({
        x,
        y,
      });
    });
  }

  render() {
    return (<ScrollView
      {...this.props}
      ref={
        (node) => {
          this.mainScrollView = node;
        }
      }
      onScroll={(e) => {
        this.setState({
          mainScrollX: e.nativeEvent.contentOffset.x,
          mainScrollY: e.nativeEvent.contentOffset.y,
        });
      }}
    />);
  }
}

FixBugScrollView.contextTypes = {
  addFixBugListener: React.PropTypes.func,
  removeFixBugListener: React.PropTypes.func,
};

export default FixBugScrollView;
