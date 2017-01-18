import 'isomorphic-fetch';
import React from 'react';
import renderer from 'react-test-renderer';
import graphql from '../../../libs/mockGraphQL';
import ClogCategoryContainer, {query, mapQueryToProps, mapPropsToOptions} from '../containers/ClogCategory';
import ClogCategoryComponent from '../components/ClogCategory';

describe('Shelf.ClogCategory', () => {
  it('can query schema', async () => {
    const failSpy = jest.fn();
    const result = await graphql(query, mapPropsToOptions({category: 'D'})).catch(failSpy);
    expect(failSpy).not.toBeCalled();
    expect(result.data).not.toBeUndefined();
    expect(result.errors).toBeUndefined();
  });

  it('render correct', async () => {
    const result = await graphql(query, mapPropsToOptions({category: 'D'}));
    const props = mapQueryToProps({data: result.data});
    const tree = renderer.create(<ClogCategoryComponent category="D" {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
