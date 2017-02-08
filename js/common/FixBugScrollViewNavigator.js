import React from 'react';
import {
  Navigator,
} from 'react-native';

import { bindFn } from './utils';

class Provider extends React.Component {
  getChildContext() {
    return {
      addFixBugListener: this.props.addFixBugListener,
      removeFixBugListener: this.props.removeFixBugListener,
    };
  }

  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  addFixBugListener: React.PropTypes.func,
  removeFixBugListener: React.PropTypes.func,
};

class FixBugScrollViewNavigator extends React.Component {
  constructor(...args) {
    super(...args);
    this.addFixBugListener = this.addFixBugListener.bind(this);
    this.removeFixBugListener = this.removeFixBugListener.bind(this);
    this.onWillFocus = this.onWillFocus.bind(this);
    this.emitFixBugListener = this.emitFixBugListener.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  onWillFocus(route) {
    this.emitFixBugListener(route.page);
  }

  emitFixBugListener(page) {
    if (!this.fixBugCallback || !this.fixBugCallback[page]) {
      return;
    }
    this.fixBugCallback[page].forEach(cb => cb());
  }

  addFixBugListener(page, cb) {
    if (!this.fixBugCallback) {
      this.fixBugCallback = {};
    }
    if (!this.fixBugCallback[page]) {
      this.fixBugCallback[page] = [];
    }
    this.fixBugCallback[page].push(cb);
  }

  removeFixBugListener(page, cb) {
    this.fixBugCallback[page] = this.fixBugCallback[page].filter(_cb => cb !== _cb);
  }

  push(route) {
    this.navigator.push(route);
  }

  pop(route) {
    this.navigator.pop(route);
  }

  renderScene(route, navigator) {
    return (<Provider
      addFixBugListener={bindFn(this.addFixBugListener, route.page)}
      removeFixBugListener={bindFn(this.removeFixBugListener, route.page)}
    >
      {this.props.renderScene(route, navigator)}
    </Provider>);
  }

  render() {
    return (
      <Navigator
        ref={(node) => {
          this.navigator = node;
        }}
        onWillFocus={this.onWillFocus}
        {...this.props}
        renderScene={this.renderScene}
      />
    );
  }
}

export default FixBugScrollViewNavigator;
