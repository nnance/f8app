import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import graphql from '../../libs/mockGraphQL';

import Book from '../components/Book';
import { query, mapQueryToProps, mapPropsToOptions } from '../containers/Book';

function getBookProps(props) {
  return graphql(query, mapPropsToOptions(props)).then(result => mapQueryToProps({ data: result.data }));
}

describe('Book', () => {
  it('render', async () => {
    const props = { id: 1 };
    const dataProps = await getBookProps(props);
    const tree = renderer.create(<Book {...props} {...dataProps} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
