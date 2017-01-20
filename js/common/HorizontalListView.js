import React from 'react';
import PureListView from './PureListView';

class HorizontalListView extends React.Component {
  render() {
    return (
      <PureListView
        {...this.props}
        horizontal={true}
        minContentHeight={0}
      />
    );
  }
}

export default HorizontalListView;
