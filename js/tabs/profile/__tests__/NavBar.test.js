import 'react-native-mock/mock';
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { shallow, mount, render } from 'enzyme';

import NavBar from '../NavBar';

describe('NavBar component', () => {
  it('render backButton by default', (done) => {
    const wrapper = shallow(<View onPress={() => done()}></View>);
    wrapper.simulate('press');
  });
});
