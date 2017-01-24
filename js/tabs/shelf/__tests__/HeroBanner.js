import React from 'react';

import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import graphql from '../../../libs/mockGraphQL';
import HeroBanner from '../components/HeroBanner';

describe('HeroBanner', () => {
  it('onBannerPress should navigate to book', () => {
    const navigator = {
      push: jest.fn()
    };
    const wrapper = shallow(<HeroBanner navigator={navigator} clogs={[]}/>);
    wrapper.instance().onBannerPress(5);
    expect(navigator.push).toBeCalledWith({page: 'book', id: 5});
  });
});
