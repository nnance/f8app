import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Menu from '../components/Menu';

const user = {
  name: 'ima',
};

describe('Menu', () => {
  it('render', () => {
    const tree = renderer.create(<Menu user={user} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
