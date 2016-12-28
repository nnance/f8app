import React from 'react';
import renderer from 'react-test-renderer';

import DashButton from '../DashButton';

describe('DashButton', () => {
  it('render', () => {
    const tree = renderer.create(<DashButton caption="test"/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
