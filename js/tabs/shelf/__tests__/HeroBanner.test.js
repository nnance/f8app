import React from 'react';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import graphql from '../../../libs/mockGraphQL';
import HeroBanner from '../components/HeroBanner';

describe('HeroBanner', () => {
  it('onBannerPress should call goToBook', () => {
    const goToBook = jest.fn();
    const wrapper = shallow(<HeroBanner goToBook={goToBook} clogs={[]} />);
    wrapper.instance().onBannerPress(5);
    expect(goToBook).toBeCalledWith(5);
  });
});
