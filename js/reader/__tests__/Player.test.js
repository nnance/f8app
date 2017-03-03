/* eslint import/first: off */
jest.mock('react-native-fs', () => null);

import React from 'react';
import renderer from 'react-test-renderer';

import graphql from '../../libs/mockGraphQL';
import { query, mapQueryToProps, mapPropsToOptions } from '../containers/Player';
import Player from '../components/Player';

describe('Player', () => {
  it('render loading', () => {
    const tree = renderer.create(<Player loading />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render', async () => {
    const id = '58b95c905923032426ceb6ce';
    const result = await graphql(query, mapPropsToOptions({ id }));
    const props = mapQueryToProps({ data: result.data });
    const tree = renderer.create(<Player id={id} {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
