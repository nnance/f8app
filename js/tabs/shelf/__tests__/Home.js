import 'isomorphic-fetch';
import React from 'react';
import graphql from '../../../libs/mockGraphQL';
import HomeContainer, {query, mapQueryToProps} from '../containers/Home';
import HomeComponent from '../components/Home';

import renderer from 'react-test-renderer';

describe('Shelf.Home', () => {
  it('can query schema', async () => {
    const failSpy = jest.fn();
    const result = await graphql(query).catch(failSpy);
    expect(failSpy).not.toBeCalled();
    expect(result.data).not.toBeUndefined();
    expect(result.errors).toBeUndefined();
  });

  it('render correct', async () => {
    const result = await graphql(query);
    const props = mapQueryToProps({data: result.data});
    const tree = renderer.create(<HomeComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
