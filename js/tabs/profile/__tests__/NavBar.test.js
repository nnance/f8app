import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import { shallow, mount, render } from 'enzyme';

import NavBar from '../NavBar';

describe('NavBar component', () => {
  it('render backButton by default', () => {
    const f = jest.fn();
    const wrapper = shallow(<A onPress={f}></A>);
    wrapper.simulate('press');
    expect(f).toBeCalled();
  });
});

const A = props => (<TouchableOpacity onPress={props.onPress}></TouchableOpacity>)
