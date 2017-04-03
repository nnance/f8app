/* eslint import/first: off */
jest.mock('react-native-fs', () => null);

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { View } from 'react-native';

import { Component as ClogiiNavigator } from '../ClogiiNavigator';

function getWrapper(props = {}) {
  return shallow(<ClogiiNavigator {...props} navigate={jest.fn()} navigateBack={jest.fn()} />);
}

describe('ClogiiNavigator', () => {
  it('render', () => {
    const wrapper = getWrapper();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('navigate to Book/Player', () => {
    const dump = getWrapper();
    const spy = jest.fn();
    dump.instance().navigator = {
      push: spy,
    };
    dump.instance().goToPlayer(5);
    expect(spy).toBeCalledWith({ id: 5, page: 'player' });
    dump.instance().goToBook(123);
    expect(spy).toBeCalledWith({ id: 123, page: 'book' });
  });

  it('navigate back', () => {
    const dump = getWrapper();
    const spy = jest.fn();
    dump.instance().navigator = {
      pop: spy,
    };
    dump.instance().goBack(5);
    expect(spy).toBeCalled();
  });

  it('onOpenURL will map event to redirectTo', () => {
    const dump = getWrapper();
    const spy = jest.fn();
    dump.instance().redirectTo = spy;
    dump.instance().onOpenURL({ url: 'x' });
    expect(spy).toBeCalledWith('x');
  });

  it('redirectTo will navigate to player on `clogii://player?id=123`', () => {
    const dump = getWrapper();
    const spy = jest.fn();
    dump.instance().navigator = {
      push: spy,
    };
    dump.instance().redirectTo('clogii://player?id=123');
    expect(spy).toBeCalledWith({ page: 'player', id: '123' });
  });

  it('parseURL split to method and query', () => {
    const dump = getWrapper();
    const result = dump.instance().parseURL('clogii://player?id=199');
    expect(result.method).toBe('player');
    expect(result.query).toEqual({ id: '199' });

    const result2 = dump.instance().parseURL('clogii://book?id=77&x=3');
    expect(result2.method).toBe('book');
    expect(result2.query).toEqual({ id: '77', x: '3' });
  });

  describe('renderScene', () => {
    it('main-tab', () => {
      const dump = getWrapper();
      const tree = shallow(<View>{dump.instance().renderScene({ page: 'main-tab' })}</View>);
      expect(toJSON(tree)).toMatchSnapshot();
    });

    it('player', () => {
      const dump = getWrapper();
      const tree = shallow(<View>{dump.instance().renderScene({ page: 'player', id: 1 })}</View>);
      expect(toJSON(tree)).toMatchSnapshot();
    });

    it('book', () => {
      const dump = getWrapper();
      const tree = shallow(<View>{dump.instance().renderScene({ page: 'book', id: 3 })}</View>);
      expect(toJSON(tree)).toMatchSnapshot();
    });
  });
});
