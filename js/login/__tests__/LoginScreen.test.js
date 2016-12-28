import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';

import {
  View
} from 'react-native';

import {Component as LoginScreenComponent} from '../LoginScreen';

describe('LoginScreen', () => {
  it('render', () => {
    const tree = shallow(<LoginScreenComponent/>);
    expect(toJSON(tree)).toMatchSnapshot();
  });

  it('renderScene', () => {
    const dump = shallow(<LoginScreenComponent/>).instance();
    const routes = [{page: 'index'}, {page: 'email-login'}, {page: 'signup'}, {page: 'forgotPassword'}, {page: 'success', payload: 'test'}, {}];
    routes.forEach(route => {
      const tree = shallow(<View>{dump.renderScene(route)}</View>);
      expect(toJSON(tree)).toMatchSnapshot();
    })
  });

  it('goBack will pop navigator', () => {
    const wrapper = shallow(<LoginScreenComponent/>);
    const spy = jest.fn();
    const inst = wrapper.instance();
    inst.refs = {
      navigator: {
        getCurrentRoutes: jest.fn(() => [1, 1, 1]),
        pop: spy
      }
    };
    inst.goBack();
    expect(spy).toBeCalled();
  });

  it('goBack will call onExit if on LastPage', () => {
    const spy = jest.fn();
    const wrapper = shallow(<LoginScreenComponent onExit={spy}/>);
    const inst = wrapper.instance();
    inst.refs = {
      navigator: {
        getCurrentRoutes: jest.fn(() => [1]),
        pop: jest.fn()
      }
    };
    inst.goBack();
    expect(spy).toBeCalled();
  });
});
