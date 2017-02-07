import React from 'react';
import { shallow } from 'enzyme';

import RecommendedClog from '../components/RecommendedClog';

describe('RecommendedClog', () => {
  it('onReadPress should navigate to book', () => {
    const goToBook = jest.fn();
    const wrapper = shallow(<RecommendedClog goToBook={goToBook} clog={{ id: 5 }} />);
    wrapper.instance().onReadPress(5);
    expect(goToBook).toBeCalledWith(5);
  });
});
