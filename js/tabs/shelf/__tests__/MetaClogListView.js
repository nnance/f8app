import React from 'react';

import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import graphql from '../../../libs/mockGraphQL';
import MetaClogListView from '../components/MetaClogListView';

describe('MetaClogListView', () => {
  it('clogPress should navigate to book', () => {
    const navigator = {
      push: jest.fn()
    };
    const wrapper = shallow(<MetaClogListView navigator={navigator} clogs={[]}/>);
    wrapper.instance().clogPress(5);
    expect(navigator.push).toBeCalledWith({page: 'book', id: 5});
  });
});
