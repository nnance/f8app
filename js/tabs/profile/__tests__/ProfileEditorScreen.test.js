import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import {
  Switch,
} from 'react-native';

import TextInput from '../../../common/TextInput';

jest.mock('react-native-image-picker');

/* eslint import/first: off */
import ImagePicker from 'react-native-image-picker';

import NavBar from '../components/NavBar';
import ProfileEditorScreenComponent, { OKButton } from '../components/ProfileEditorScreen';

describe('ProfileEditorScreen', () => {
  const expectImage = { image: 'expect.png' };

  function api(name) {
    if (name === 'fail') {
      return Promise.reject(new Error('something wrong'));
    }
    return Promise.resolve();
  }

  it('OKButton', () => {
    const tree = renderer.create(<OKButton />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('call api changePublicProfile', async () => {
    let gResolve;
    const changePublicProfile = jest.fn(() => new Promise((resolve) => {
      gResolve = resolve;
    }));
    const wrapper = shallow(
      <ProfileEditorScreenComponent changePublicProfile={changePublicProfile} />,
    );
    wrapper.find(TextInput).simulate('changeText', 'AAA');
    expect(wrapper.state().savingProfile).toBe(false);
    const task = wrapper.find(NavBar).props().onRightPress();
    expect(wrapper.state().savingProfile).toBe(true);
    gResolve();
    await task;
    expect(wrapper.state().savingProfile).toBe(false);
    expect(changePublicProfile).toBeCalled();
    expect(changePublicProfile.mock.calls[0][0]).toBe('AAA');
  });

  it('call onBackPress if changed profile', async () => {
    const changePublicProfile = jest.fn(api);
    const onBackPress = jest.fn();
    const wrapper = shallow(
      <ProfileEditorScreenComponent
        changePublicProfile={changePublicProfile}
        onBackPress={onBackPress}
      />,
    );
    await wrapper.find(NavBar).props().onRightPress();
    expect(onBackPress).toBeCalled();
  });

  it('call api linkFacebook', async () => {
    let gResolve;
    const linkFacebook = jest.fn(() => new Promise((resolve) => {
      gResolve = resolve;
    }));
    const wrapper = shallow(
      <ProfileEditorScreenComponent linkFacebook={linkFacebook} facebookLinked={false} />,
    );
    expect(wrapper.state().linkingFacebook).toBe(false);
    const linkingPromise = wrapper.find(Switch).props().onValueChange();
    expect(linkFacebook).toBeCalled();
    expect(wrapper.state().linkingFacebook).toBe(true);
    gResolve();
    await linkingPromise;
    expect(wrapper.state().linkingFacebook).toBe(false);
  });

  it('call api unlinkFacebook', async () => {
    const unlinkFacebook = jest.fn(() => Promise.resolve());
    const wrapper = shallow(
      <ProfileEditorScreenComponent unlinkFacebook={unlinkFacebook} facebookLinked />,
    );
    await wrapper.find(Switch).props().onValueChange();
    expect(unlinkFacebook).toBeCalled();
  });

  it('open DatePickerDialog', async () => {
    const wrapper = shallow(<ProfileEditorScreenComponent />);
    const expectDate = new Date(1993, 5, 12);
    const spy = jest.fn(() => Promise.resolve(expectDate));
    wrapper.instance().datePicker = {
      open: spy,
    };
    await wrapper.find('[name="birthDayInput"]').props().onPress();
    expect(spy).toBeCalled();
    expect(wrapper.state().birthDayDate.getTime()).toBe(expectDate.getTime());
  });

  it.skip('open SexPicker with male', async () => {
    const wrapper = shallow(<ProfileEditorScreenComponent />);
    const Picker = require('react-native-picker').default;
    Picker.init.mockImplementationOnce(opts => opts.onPickerConfirm(['ชาย']));
    await wrapper.find('[name="sexInput"]').props().onPress();
    expect(Picker.init).toBeCalled();
    expect(wrapper.state().sex).toBe('M');
    Picker.init.mockClear();
  });

  it.skip('open SexPicker with female', async () => {
    const wrapper = shallow(<ProfileEditorScreenComponent />);
    const Picker = require('react-native-picker').default;
    Picker.init.mockImplementationOnce(opts => opts.onPickerConfirm(['หญิง']));
    await wrapper.find('[name="sexInput"]').props().onPress();
    expect(Picker.init).toBeCalled();
    expect(wrapper.state().sex).toBe('F');
    Picker.init.mockClear();
  });

  it.skip('open SexPicker with unknow', async () => {
    const wrapper = shallow(<ProfileEditorScreenComponent />);
    const Picker = require('react-native-picker').default;
    Picker.init.mockImplementationOnce(opts => opts.onPickerConfirm(['ไม่ระบุ']));
    await wrapper.find('[name="sexInput"]').props().onPress();
    expect(Picker.init).toBeCalled();
    expect(wrapper.state().sex).toBe(null);
    Picker.init.mockClear();
  });

  it('open openProfilePicker', async () => {
    ImagePicker.showImagePicker.mockImplementationOnce((opts, cb) => cb(expectImage));
    const wrapper = shallow(<ProfileEditorScreenComponent />);
    await wrapper.find('[name="profileImageInput"]').props().onPress();
    expect(ImagePicker.showImagePicker).toBeCalled();
    expect(wrapper.state().changedProfilePicture).toBe(expectImage);
    ImagePicker.showImagePicker.mockClear();
  });

  it('open openProfileCoverPicker', async () => {
    ImagePicker.showImagePicker.mockImplementationOnce((opts, cb) => cb(expectImage));
    const wrapper = shallow(<ProfileEditorScreenComponent />);
    await wrapper.find('[name="coverImageInput"]').props().onPress();
    expect(ImagePicker.showImagePicker).toBeCalled();
    expect(wrapper.state().changedProfileCover).toBe(expectImage);
    ImagePicker.showImagePicker.mockClear();
  });
});
