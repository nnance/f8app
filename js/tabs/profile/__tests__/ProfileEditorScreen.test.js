import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import {
  Switch
} from 'react-native';

import TextInput from '../../../common/TextInput';

jest.mock('react-native-picker');
jest.mock('react-native-image-picker');

import ImagePicker from 'react-native-image-picker';

import NavBar from '../components/NavBar';
import {Component as ProfileEditorScreenComponent, OKButton} from '../containers/ProfileEditorScreen';

describe('ProfileEditorScreen', () => {
  const expectImage = {image: 'expect.png'};

  function api(name, birthDayDate, sex, changedProfilePicture, changedProfileCover) {
    if (name === 'fail') {
      return Promise.reject(new Error('something wrong'));
    }
    return Promise.resolve();
  }

  it('pushPage', () => {
    const spy = jest.fn();
    const wrapper = shallow(<ProfileEditorScreenComponent navigator={{
      push: spy
    }}/>);
    wrapper.instance().pushPage('test');
    expect(spy).toBeCalledWith({page: 'test'});
  });

  it('OKButton', () => {
    const tree = renderer.create(<OKButton/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('call api changePublicProfile', async () => {
    let _resolve;
    let changePublicProfile = jest.fn(() => new Promise(resolve => _resolve = resolve));
    const wrapper = shallow(<ProfileEditorScreenComponent changePublicProfile={changePublicProfile}/>);
    wrapper.find(TextInput).simulate('changeText', 'AAA');
    expect(wrapper.state().savingProfile).toBe(false);
    const task = wrapper.find(NavBar).props().onRightPress();
    expect(wrapper.state().savingProfile).toBe(true);
    _resolve();
    await task;
    expect(wrapper.state().savingProfile).toBe(false);
    expect(changePublicProfile).toBeCalled();
    expect(changePublicProfile.mock.calls[0][0]).toBe('AAA');
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
    const wrapper = shallow(<ProfileEditorScreenComponent unlinkFacebook={unlinkFacebook} facebookLinked={true}/>);
    await wrapper.find(Switch).props().onValueChange();
    expect(unlinkFacebook).toBeCalled();
  });

  it('open DatePickerDialog', async () => {
    const wrapper = shallow(<ProfileEditorScreenComponent/>);
    const expectDate = new Date(1993, 5, 12);
    let spy = jest.fn(() => Promise.resolve(expectDate));
    wrapper.instance().refs = {
      datePicker: {
        open: spy
      }
    };
    await wrapper.find('[name="birthDayInput"]').props().onPress();
    expect(spy).toBeCalled();
    expect(wrapper.state().birthDayDate.getTime()).toBe(expectDate.getTime());
  });

  it('open SexPicker with male', async () => {
    const wrapper = shallow(<ProfileEditorScreenComponent/>);
    const Picker = require('react-native-picker').default;
    Picker.init.mockImplementationOnce((opts) => opts.onPickerConfirm(['ชาย']));
    await wrapper.find('[name="sexInput"]').props().onPress();
    expect(Picker.init).toBeCalled();
    expect(wrapper.state().sex).toBe('M');
    Picker.init.mockClear();
  });

  it('open SexPicker with female', async () => {
    const wrapper = shallow(<ProfileEditorScreenComponent/>);
    const Picker = require('react-native-picker').default;
    Picker.init.mockImplementationOnce((opts) => opts.onPickerConfirm(['หญิง']));
    await wrapper.find('[name="sexInput"]').props().onPress();
    expect(Picker.init).toBeCalled();
    expect(wrapper.state().sex).toBe('F');
    Picker.init.mockClear();
  });

  it('open SexPicker with unknow', async () => {
    const wrapper = shallow(<ProfileEditorScreenComponent/>);
    const Picker = require('react-native-picker').default;
    Picker.init.mockImplementationOnce((opts) => opts.onPickerConfirm(['ไม่ระบุ']));
    await wrapper.find('[name="sexInput"]').props().onPress();
    expect(Picker.init).toBeCalled();
    expect(wrapper.state().sex).toBe(null);
    Picker.init.mockClear();
  });

  it('open openProfilePicker', async () => {
    ImagePicker.showImagePicker.mockImplementationOnce((cb) => cb(expectImage));
    const wrapper = shallow(<ProfileEditorScreenComponent/>);
    await wrapper.find('[name="profileImageInput"]').props().onPress();
    expect(ImagePicker.showImagePicker).toBeCalled();
    expect(wrapper.state().changedProfilePicture).toBe(expectImage);
    ImagePicker.showImagePicker.mockClear();
  });

  it('open openProfileCoverPicker', async () => {
    ImagePicker.showImagePicker.mockImplementationOnce((cb) => cb(expectImage));
    const wrapper = shallow(<ProfileEditorScreenComponent/>);
    await wrapper.find('[name="coverImageInput"]').props().onPress();
    expect(ImagePicker.showImagePicker).toBeCalled();
    expect(wrapper.state().changedProfileCover).toBe(expectImage);
    ImagePicker.showImagePicker.mockClear();
  });
});
