import React from 'react';

import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import graphql from '../../../libs/mockGraphQL';
import RecommendedClog from '../components/RecommendedClog';

describe('RecommendedClog', () => {
  it('onReadPress should navigate to book', () => {
    const navigator = {
      push: jest.fn()
    };
    const wrapper = shallow(<RecommendedClog navigator={navigator} id={5}/>);
    wrapper.instance().onReadPress(5);
    expect(navigator.push).toBeCalledWith({page: 'book', id: 5});
  });
});
