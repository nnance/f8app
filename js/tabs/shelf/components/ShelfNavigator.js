import React from 'react';
import {
  Text,
} from 'react-native';

import Home from '../containers/Home';
import ClogCategory from '../containers/ClogCategory';
import ClogListView from '../containers/ClogListView';
import EditorListView from '../containers/EditorListView';
import FixBugScrollViewNavigator from '../../../common/FixBugScrollViewNavigator';

const NotFound = () => <Text>not found</Text>;

class ShelfNavigator extends React.Component {
  constructor(...args) {
    super(...args);
    this.goBack = this.goBack.bind(this);
    this.goToClogCategory = this.goToClogCategory.bind(this);
    this.goToClogListView = this.goToClogListView.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  goBack() {
    this.navigator.pop();
  }

  goToClogCategory(category) {
    this.navigator.push({ page: 'clog-category', category });
  }

  goToClogListView(options) {
    this.navigator.push({ page: 'clog-list-view', ...options });
  }

  renderScene(route) {
    if (!route) {
      return <NotFound />;
    }
    if (route.page === 'home') {
      return (<Home
        onOpenShelfMenu={this.props.onOpenShelfMenu}
        goToBook={this.props.goToBook}
        goToClogCategory={this.goToClogCategory}
        goToClogListView={this.goToClogListView}
      />);
    }
    if (route.page === 'clog-category') {
      return (<ClogCategory
        onBackPress={this.goBack}
        goToBook={this.props.goToBook}
        goToClogListView={this.goToClogListView}
        category={route.category}
      />);
    }
    if (route.page === 'clog-list-view') {
      return (<ClogListView
        onBackPress={this.goBack}
        title={route.title}
        category={route.category}
        orderBy={route.orderBy}
        goToBook={this.props.goToBook}
        tag={route.tag}
      />);
    }
    if (route.page === 'editor-list-view') {
      return (<EditorListView category={route.category}/>);
    }
    return <NotFound />;
  }

  render() {
    return (
      <FixBugScrollViewNavigator
        ref={(node) => {
          this.navigator = node;
        }}
        initialRoute={{ page: 'editor-list-view' }}
        renderScene={this.renderScene}
      />
    );
  }
}

export default ShelfNavigator;
