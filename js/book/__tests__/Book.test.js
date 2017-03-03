import React from 'react';
import renderer from 'react-test-renderer';

import graphql from '../../libs/mockGraphQL';

import Book from '../components/Book';
import { query, mapQueryToProps, mapPropsToOptions } from '../containers/Book';

function getBookProps(props) {
  return graphql(query, mapPropsToOptions(props))
    .then(result => mapQueryToProps({ data: result.data }));
}

describe('Book', () => {
  it('render', async () => {
    const props = { id: '58a6e85138cbdaba481a7b59' };
    const dataProps = await getBookProps(props);
    const tree = renderer.create(<Book {...props} {...dataProps} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
