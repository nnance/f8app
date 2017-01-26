import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import graphql from '../../libs/mockGraphQL';
import {query, mapQueryToProps, mapPropsToOptions} from '../containers/Player';
import Player from '../components/Player';

describe('Player', () => {
  it('render loading', () => {
    const tree = renderer.create(<Player loading={true}/>);
    expect(tree.toJSON()).toMatchSnapshot();
  })

  it('render', async () => {
    const result = await graphql(query, mapPropsToOptions({id: '0'}));
    const props = mapQueryToProps({data: result.data});
    const tree = renderer.create(<Player id="0" {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
