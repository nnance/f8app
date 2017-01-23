import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import graphql from '../../../libs/mockGraphQL';
import HomeContainer, {query, mapQueryToProps} from '../containers/Home';
import HomeComponent from '../components/Home';
import ExploreCategory from '../components/ExploreCategory';

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

  it('navigate to ClogCategory onPress category', async () => {
    const result = await graphql(query);
    const props = mapQueryToProps({data: result.data});
    const navigator = {
      push: jest.fn()
    };
    const wrapper = shallow(<HomeComponent {...{...props, navigator: navigator}}/>);
    wrapper.find(ExploreCategory).simulate('press', 'D');
    expect(navigator.push).toBeCalledWith({page: 'clog-category', category: 'D'});
  });

  it('navigate to ClogListView onPress viewAllTrending', async () => {
    const result = await graphql(query);
    const props = mapQueryToProps({data: result.data});
    const navigator = {
      push: jest.fn()
    };
    const dump = shallow(<HomeComponent {...{...props, navigator: navigator}}/>);
    const wrapper = shallow(dump.instance().renderTrendingButton());
    wrapper.simulate('press');
    const calledArgs = navigator.push.mock.calls[0][0];
    expect(calledArgs.page).toBe('clog-list-view');
    expect(calledArgs.orderBy).toBe('TRENDING');
  });
});
