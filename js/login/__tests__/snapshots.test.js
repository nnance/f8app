import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';

import DashButton from '../DashButton';
import SuccessScreen from '../SuccessScreen';
import {Component as IndexScreenComponent} from '../IndexScreen';

describe('DashButton', () => {
  it('render', () => {
    const tree = renderer.create(<DashButton caption="test"/>);
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
    const tree = shallow(<IndexScreenComponent/>);
    expect(toJSON(tree)).toMatchSnapshot();
  });
});
