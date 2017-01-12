import React from 'react';

import Home from './containers/Home';
import * as mockData from './mockData';

// export default Home;

class Mocked extends React.Component {
  render() {
    return <Home
      topClog={mockData.topClog}
      trending={mockData.fakeMetaClog}
      highlightCategory={mockData.highlightCategory}
    />;
  }
}

export default Mocked;
