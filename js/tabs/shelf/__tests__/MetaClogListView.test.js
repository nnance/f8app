import React from 'react';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import graphql from '../../../libs/mockGraphQL';
import MetaClogListView from '../components/MetaClogListView';

describe('MetaClogListView', () => {
  it('clogPress should navigate to book', () => {
    const goToBook = jest.fn();
    const wrapper = shallow(<MetaClogListView goToBook={goToBook} clogs={[]} />);
    wrapper.instance().clogPress(5);
    expect(goToBook).toBeCalledWith(5);
  });
});
