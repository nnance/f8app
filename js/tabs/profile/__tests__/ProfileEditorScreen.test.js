import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import F8Button from 'F8Button';

import {
  Switch
} from 'react-native';

import NavBar from '../components/NavBar';
import {Component as ProfileEditorScreenComponent} from '../containers/ProfileEditorScreen';

describe('ProfileEditorScreen', () => {
  function api(name, birthDayDate, sex, changedProfilePicture, changedProfileCover) {
    if (name === 'fail') {
      return Promise.reject(new Error('something wrong'));
    }
    return Promise.resolve();
  }

  it('render', () => {
    const tree = renderer.create(<ProfileEditorScreenComponent/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('call api changePublicProfile', async () => {
    let _resolve;
    let changePublicProfile = jest.fn(() => new Promise(resolve => _resolve = resolve));
    const wrapper = shallow(<ProfileEditorScreenComponent changePublicProfile={changePublicProfile}/>);
    expect(wrapper.state().savingProfile).toBe(false);
    const task = wrapper.find(NavBar).props().onRightPress();
    expect(wrapper.state().savingProfile).toBe(true);
    _resolve();
    await task;
    expect(wrapper.state().savingProfile).toBe(false);
    expect(changePublicProfile).toBeCalled();
  });

  it('call onBackPress if changed profile', async () => {
    let changePublicProfile = jest.fn(api);
    let onBackPress = jest.fn();
    const wrapper = shallow(<ProfileEditorScreenComponent changePublicProfile={changePublicProfile} onBackPress={onBackPress}/>);
    await wrapper.find(NavBar).props().onRightPress();
    expect(onBackPress).toBeCalled();
  });

  it('call api linkFacebook', async () => {
    let _resolve;
    let linkFacebook = jest.fn(() => new Promise(resolve => {
      _resolve = resolve;
    }));
    const wrapper = shallow(<ProfileEditorScreenComponent linkFacebook={linkFacebook} facebookLinked={false}/>);
    expect(wrapper.state().linkingFacebook).toBe(false);
    const linkingPromise = wrapper.find(Switch).props().onValueChange();
    expect(linkFacebook).toBeCalled();
    expect(wrapper.state().linkingFacebook).toBe(true);
    _resolve();
    await linkingPromise;
    expect(wrapper.state().linkingFacebook).toBe(false);
  });

  it('call api unlinkFacebook', async () => {
    let unlinkFacebook = jest.fn(() => Promise.resolve());
    let onBackPress = jest.fn();
    const wrapper = shallow(<ProfileEditorScreenComponent unlinkFacebook={unlinkFacebook} facebookLinked={true}/>);
    await wrapper.find(Switch).props().onValueChange();
    expect(unlinkFacebook).toBeCalled();
  });

  it('open DatePickerDialog');
  it('open SexPicker');
  it('open BirthDayPicker');
});
