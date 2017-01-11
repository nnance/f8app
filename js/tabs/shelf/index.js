import React from 'react';

import HomeScreen from './components/HomeScreen';
import * as mockData from './mockData';

// export default HomeScreen;

class Mocked extends React.Component {
  render() {
    return <HomeScreen
      topClog={mockData.topClog}
      trending={mockData.fakeMetaClog}
      highlightCategory={mockData.highlightCategory}
    />;
  }
}

export default Mocked;
