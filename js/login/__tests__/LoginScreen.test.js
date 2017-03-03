jest.mock('BackAndroid');

/* eslint import/first: off */
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import {
  View,
  BackAndroid,
} from 'react-native';

jest.mock('../../actions');

import { Component as LoginScreenComponent } from '../LoginScreen';
import * as actions from '../../actions';

describe('LoginScreen', () => {
  it('render', () => {
    const tree = shallow(<LoginScreenComponent />);
    expect(toJSON(tree)).toMatchSnapshot();
  });

  it('renderTitle', () => {
    const dump = shallow(<LoginScreenComponent />);
    const tree = renderer.create(dump.instance().renderTitle({ page: 'signup' }));
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renderLeftButton', () => {
    const dump = shallow(<LoginScreenComponent />);
    let tree = renderer.create(dump.instance().renderLeftButton({ page: 'signup' }));
    expect(tree.toJSON()).toMatchSnapshot();
    tree = renderer.create(<View>{dump.instance().renderLeftButton({ page: 'index' })}</View>);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renderRightButton', () => {
    const dump = shallow(<LoginScreenComponent />);
    let tree = renderer.create(<View>{dump.instance().renderRightButton({ page: 'signup' })}</View>);
    expect(tree.toJSON()).toMatchSnapshot();
    tree = renderer.create(<View>{dump.instance().renderRightButton({ page: 'index' })}</View>);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renderScene', () => {
    const dump = shallow(<LoginScreenComponent />).instance();
    const routes = [
      { page: 'index' },
      { page: 'email-login' },
      { page: 'signup' },
      { page: 'forgotPassword' },
      { page: 'success',
        payload: 'test' },
      {},
    ];
    routes.forEach((route) => {
      const tree = shallow(<View>{dump.renderScene(route)}</View>);
      expect(toJSON(tree)).toMatchSnapshot();
    });
  });

  it('listen to BackAndroid for handleBackButton', () => {
    const wrapper = shallow(<LoginScreenComponent navigate={jest.fn()} />);
    wrapper.instance().componentDidMount();
    expect(BackAndroid.addEventListener).toBeCalledWith('hardwareBackPress', wrapper.instance().goBack);
    wrapper.instance().componentWillUnmount();
    expect(BackAndroid.removeEventListener).toBeCalledWith('hardwareBackPress', wrapper.instance().goBack);
  });

  it('addBackButtonListener alwayFalse', () => {
    const addSpy = jest.fn();
    const removeSpy = jest.fn();
    const wrapper = shallow(
      <LoginScreenComponent
        addBackButtonListener={addSpy}
        removeBackButtonListener={removeSpy}
        navigate={jest.fn()}
      />,
    );
    wrapper.instance().componentDidMount();
    expect(addSpy).toBeCalledWith(wrapper.instance().alwaysFalse);
    wrapper.instance().componentWillUnmount();
    expect(removeSpy).toBeCalledWith(wrapper.instance().alwaysFalse);
  });

  it('auto call onExit if nextProps is loggedIn', () => {
    const spy = jest.fn();
    const wrapper = shallow(<LoginScreenComponent onExit={spy} />);
    wrapper.instance().componentWillReceiveProps({ isLoggedIn: true });
    expect(spy).toBeCalled();
  });

  it('goBack will pop navigator', () => {
    const wrapper = shallow(<LoginScreenComponent navigateBack={jest.fn()} />);
    const spy = jest.fn();
    const inst = wrapper.instance();
    inst.navigator = {
      getCurrentRoutes: jest.fn(() => [1, 1, 1]),
      pop: spy,
    };
    inst.goBack();
    expect(spy).toBeCalled();
  });

  it('goBack will call onExit if on LastPage', () => {
    const spy = jest.fn();
    const wrapper = shallow(<LoginScreenComponent onExit={spy} navigateBack={jest.fn()} />);
    const inst = wrapper.instance();
    inst.navigator = {
      getCurrentRoutes: jest.fn(() => [1]),
      pop: jest.fn(),
    };
    inst.goBack();
    expect(spy).toBeCalled();
  });

  it('goToLogin pop untill login-page', () => {
    const wrapper = shallow(<LoginScreenComponent navigate={jest.fn()} navigateBack={jest.fn()} />);
    const inst = wrapper.instance();
    const pages = [{ page: 'email-login' }, { page: 'fake-1' }, { page: 'fake-2' }];
    const spy = jest.fn(pages.pop);
    pages.pop = spy;
    inst.navigator = {
      getCurrentRoutes: jest.fn(() => pages),
      popN: (n) => {
        let N = n;
        while (N) {
          N -= 1;
          pages.pop();
        }
      },
    };
    inst.goToLogin();
    expect(pages.length).toBe(1);
    expect(pages[0]).toEqual({ page: 'email-login' });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  describe('logInWithFacebook', () => {
    let onLoggedIn;
    let alertSpy;
    let preAlert;
    let preWarn;

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
      actions.logInWithFacebook.mockImplementationOnce(
        () => Promise.resolve(),
      );
      const wrapper = shallow(
        <LoginScreenComponent
          onLoggedIn={onLoggedIn}
          dispatch={jest.fn(a => a)}
        />,
      );
      const inst = wrapper.instance();
      await inst.logInWithFacebook();
      expect(actions.logInWithFacebook).toBeCalled();
      expect(onLoggedIn).toBeCalled();
    });

    it('call alert if fail', async () => {
      actions.logInWithFacebook.mockImplementationOnce(
        () => Promise.reject(new Error('something wrong')),
      );
      const wrapper = shallow(
        <LoginScreenComponent
          onLoggedIn={onLoggedIn}
          dispatch={jest.fn(a => a)}
        />,
      );
      const inst = wrapper.instance();
      await inst.logInWithFacebook();
      expect(onLoggedIn).not.toBeCalled();
      expect(alertSpy).toBeCalled();
    });
  });
});
