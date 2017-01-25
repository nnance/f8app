import React from 'react';
import {
  Navigator,
  Text
} from 'react-native';

class Provider extends React.Component {
  getChildContext() {
    return {
      addFixBugListener: this.props.addFixBugListener,
      removeFixBugListener: this.props.removeFixBugListener
    };
  }

  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  addFixBugListener: React.PropTypes.func,
  removeFixBugListener: React.PropTypes.func
};

class FixBugScrollViewNavigator extends React.Component {
  constructor(...args) {
    super(...args);
    this.addFixBugListener = this.addFixBugListener.bind(this);
    this.removeFixBugListener = this.removeFixBugListener.bind(this);
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        onWillFocus={this.onWillFocus.bind(this)}
        {...this.props}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  renderScene(route, navigator) {
    return <Provider
      addFixBugListener={this.addFixBugListener.bind(this, route.page)}
      removeFixBugListener={this.removeFixBugListener.bind(this, route.page)}
      >
        {this.props.renderScene(route, navigator)}
    </Provider>;
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
    this.refs.navigator.push(route);
  }

  pop(route) {
    this.refs.navigator.pop(route);
  }
}

export default FixBugScrollViewNavigator;
