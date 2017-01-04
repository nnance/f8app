import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';

import DashButton, {DashButtonWithContainer} from '../DashButton';
import SuccessScreen from '../SuccessScreen';
import {Component as IndexScreenComponent} from '../IndexScreen';

describe('DashButton', () => {
  it('render', () => {
    const tree = renderer.create(<DashButton caption="test"/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render with container', () => {
    const tree = renderer.create(<DashButtonWithContainer caption="test container"/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('SuccessScreen', () => {
  it('render', () => {
    const tree = renderer.create(<SuccessScreen successText="test"/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('IndexScreen', () => {
  it('render', () => {
    const tree = shallow(<IndexScreenComponent pushPage={jest.fn()}/>);
    expect(toJSON(tree)).toMatchSnapshot();
  });
});
