import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { View } from 'react-native';

import ProfileNavigator from '../components/ProfileNavigator';
import * as mockData from '../mockData';

describe('ProfileNavigator', () => {
  it('renderScene correct component', () => {
    const scenes = ['following', 'follower', 'myfan', 'activity', 'myclog', 'bookmark', 'jellyShop', 'edit-profile', 'change-email', 'change-password', undefined];
    const dump = shallow(<ProfileNavigator {...mockData} />);
    scenes.forEach((scene) => {
      const component = dump.instance().renderScene({ page: scene });
      const tree = shallow(<View>{component}</View>);
      expect(toJSON(tree)).toMatchSnapshot();
    });
  });

  it('onMenuPress, should push into navigator', () => {
    const dump = shallow(<ProfileNavigator {...mockData} />);
    const menues = ['myfan', 'activity', 'myclog', 'bookmark', 'jellyShop'];
    menues.forEach((menu) => {
      const spy = jest.fn();
      dump.instance().navigator = {
        push: spy,
      };
      dump.instance().onMenuPress(menu);
      expect(spy).toBeCalledWith({ page: menu });
    });
  });

  it('onBack', () => {
    const spy = jest.fn();
    const dump = shallow(<ProfileNavigator {...mockData} />);
    dump.instance().navigator = {
      pop: spy,
    };
    dump.instance().onBack();
    expect(spy).toBeCalled();
  });

  it('pushPage', () => {
    const spy = jest.fn();
    const dump = shallow(<ProfileNavigator {...mockData} />);
    dump.instance().navigator = {
      push: spy,
    };
    dump.instance().pushPage('test');
    expect(spy).toBeCalledWith({ page: 'test' });
  });
});
