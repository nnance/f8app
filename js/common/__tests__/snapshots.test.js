import React from 'react';
import renderer from 'react-test-renderer';

describe('CircleImageWithCategory', () => {
  const CircleImageWithCategory = require('../CircleImageWithCategory').default;
  it('render CircleImageWithCategory', () => {
    const tree = renderer.create(<CircleImageWithCategory
      source={{uri: 'x.jpg'}}
      categorySource={{uri: 'x.jpg'}}
      size={100}
    />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
