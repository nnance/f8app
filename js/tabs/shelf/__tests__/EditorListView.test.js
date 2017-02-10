import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer';

import graphql from '../../../libs/mockGraphQL';
import { query, mapQueryToProps, mapPropsToOptions } from '../containers/EditorListView';
import EditorListView from '../components/EditorListView';

describe('Shelf.EditorListView', () => {
  it('render', async () => {
    const result = await graphql(query, mapPropsToOptions({ category: 'D' }));
    const props = mapQueryToProps({ data: result.data });
    const tree = renderer.create(<EditorListView category="D" {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
