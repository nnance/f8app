import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import {
  Text,
  TextInput
} from 'react-native';
import F8Button from 'F8Button';

import SecureContainer from '../components/SecureContainer';

describe('SecureContainer', () => {
  function onCheck(password) {
    if (password === 'ok') {
      return Promise.resolve();
    }
    return Promise.reject(new Error('something wrong'));
  }

  it('render authen screen', () => {
    const tree = renderer.create(<SecureContainer><Text>secret</Text></SecureContainer>);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('not render secret', () => {
    const tree = shallow(<SecureContainer><Text>secret</Text></SecureContainer>);
    expect(tree.contains(<Text>secret</Text>)).toBe(false);
  });

  it('render secret screen', async () => {
    const tree = shallow(<SecureContainer onCheck={onCheck}><Text>secret</Text></SecureContainer>);
    tree.find(TextInput).simulate('changeText', 'ok');
    await tree.find(F8Button).props().onPress();
    expect(tree.contains(<Text>secret</Text>)).toBe(true);
  });

  it('render error', async () => {
    const tree = shallow(<SecureContainer onCheck={onCheck}><Text>secret</Text></SecureContainer>);
    tree.find(TextInput).simulate('changeText', 'fail');
    await tree.find(F8Button).props().onPress();
    expect(tree.contains('something wrong')).toBe(true);
  });
});
