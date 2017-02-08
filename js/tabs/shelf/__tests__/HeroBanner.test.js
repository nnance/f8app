import React from 'react';
import { shallow } from 'enzyme';

import HeroBanner from '../components/HeroBanner';

describe('HeroBanner', () => {
  it('onBannerPress should call goToBook', () => {
    const goToBook = jest.fn();
    const wrapper = shallow(<HeroBanner goToBook={goToBook} clogs={[]} />);
    wrapper.instance().onBannerPress(5);
    expect(goToBook).toBeCalledWith(5);
  });
});
