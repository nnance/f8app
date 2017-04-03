import React from 'react';

import {
  InteractionManager,
} from 'react-native';

import PureListView from './PureListView';

class FixBugPureListView extends React.Component {
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
    InteractionManager.runAfterInteractions(() => {
      this.fixScrollBug();
    });
  }

  componentWillUnmount() {
    if (this.context && this.context.removeFixBugListener) {
      this.context.removeFixBugListener(this.fixScrollBug);
    }
  }

  fixScrollBug() {
    const x = this.state.mainScrollX;
    const y = this.state.mainScrollY;
    this.mainPureListView.scrollTo({
      x,
      y: y + 1,
    });
    this.mainPureListView.scrollTo({
      x,
      y,
    });
  }

  render() {
    return (<PureListView
      {...this.props}
      ref={
        (node) => {
          this.mainPureListView = node;
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

FixBugPureListView.contextTypes = {
  addFixBugListener: React.PropTypes.func,
  removeFixBugListener: React.PropTypes.func,
};

export default FixBugPureListView;
