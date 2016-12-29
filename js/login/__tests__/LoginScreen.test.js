import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';

import {
  View
} from 'react-native';

jest.mock('../../actions');

import {Component as LoginScreenComponent} from '../LoginScreen';
import * as actions from '../../actions';

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

  it('goToLogin pop untill login-page', () => {
    const wrapper = shallow(<LoginScreenComponent/>);
    const inst = wrapper.instance();
    let pages = [{page: 'email-login'}, {page: 'fake-1'}, {page: 'fake-2'}];
    let spy = jest.fn(pages.pop);
    pages.pop = spy;
    inst.refs = {
      navigator: {
        getCurrentRoutes: jest.fn(() => pages),
        popN: (n) => {
          while(n--) pages.pop();
        }
      }
    };
    inst.goToLogin();
    expect(pages.length).toBe(1);
    expect(pages[0]).toEqual({page: 'email-login'});
    expect(spy).toHaveBeenCalledTimes(2);
  });

  describe('logInWithFacebook', () => {
    let onLoggedIn;
    let alertSpy, preAlert, preWarn;

    beforeAll(() => {
      preAlert = global.alert;
      preWarn = global.console.warn;
      alertSpy = jest.fn();
      onLoggedIn = jest.fn();

      global.console.warn = jest.fn();
      global.alert = alertSpy;
    });

    afterAll(() => {
      global.console.warn = preWarn;
      global.alert = preAlert;
    });

    afterEach(() => {
      alertSpy.mockClear();
      onLoggedIn.mockClear();
      actions.logInWithFacebook.mockClear();
    });

    it('call onLoggedIn if success', async () => {
      actions.logInWithFacebook.mockImplementationOnce(() => Promise.resolve());
      const wrapper = shallow(<LoginScreenComponent onLoggedIn={onLoggedIn} dispatch={jest.fn(a => a)}/>);
      const inst = wrapper.instance();
      await inst.logInWithFacebook();
      expect(actions.logInWithFacebook).toBeCalled();
      expect(onLoggedIn).toBeCalled();
    });

    it('call alert if fail', async () => {
      actions.logInWithFacebook.mockImplementationOnce(() => Promise.reject(new Error('something wrong')));
      const wrapper = shallow(<LoginScreenComponent onLoggedIn={onLoggedIn} dispatch={jest.fn(a => a)}/>);
      const inst = wrapper.instance();
      await inst.logInWithFacebook();
      expect(onLoggedIn).not.toBeCalled();
      expect(alertSpy).toBeCalled();
    });
  });
});
