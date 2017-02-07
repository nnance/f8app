import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import F8Button from 'F8Button';

import { Component as ChangePasswordScreenComponent } from '../containers/ChangePasswordScreen';

describe('ChangePasswordScreen', () => {
  function api(password) {
    if (password === 'fail') {
      return Promise.reject(new Error('something wrong'));
    }
    return Promise.resolve();
  }

  it('render authen', () => {
    const tree = renderer.create(<ChangePasswordScreenComponent />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('error if password not match', async () => {
    const wrapper = shallow(<ChangePasswordScreenComponent />);
    wrapper.find('[placeholder="password"]').simulate('changeText', 'ok');
    wrapper.find('[placeholder="confirm password"]').simulate('changeText', 'bb');
    wrapper.find(F8Button).simulate('press');
    expect(wrapper.state().error).toContain('not match');
  });

  it('call api', async () => {
    const changePassword = jest.fn(api);
    const wrapper = shallow(<ChangePasswordScreenComponent changePassword={changePassword} />);
    wrapper.find('[placeholder="password"]').simulate('changeText', 'ok');
    wrapper.find('[placeholder="confirm password"]').simulate('changeText', 'ok');
    wrapper.find(F8Button).simulate('press');
    expect(changePassword).toBeCalled();
  });

  it('call onBackPress if changed password', async () => {
    const changePassword = jest.fn(api);
    const onBackPress = jest.fn();
    const wrapper = shallow(<ChangePasswordScreenComponent changePassword={changePassword} onBackPress={onBackPress} />);
    wrapper.find('[placeholder="password"]').simulate('changeText', 'ok');
    wrapper.find('[placeholder="confirm password"]').simulate('changeText', 'ok');
    await wrapper.find(F8Button).props().onPress();
    expect(onBackPress).toBeCalled();
  });

  it('set state error if api reject', async () => {
    const changePassword = jest.fn(api);
    const onBackPress = jest.fn();
    const wrapper = shallow(<ChangePasswordScreenComponent changePassword={changePassword} onBackPress={onBackPress} />);
    wrapper.find('[placeholder="password"]').simulate('changeText', 'fail');
    wrapper.find('[placeholder="confirm password"]').simulate('changeText', 'fail');
    await wrapper.find(F8Button).props().onPress();
    expect(onBackPress).not.toBeCalled();
    expect(wrapper.state().error).toContain('something wrong');
  });
});
