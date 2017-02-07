import React from 'react';
import { shallow } from 'enzyme';

import ForgotPasswordScreen from '../ForgotPasswordScreen';

describe('ForgotPasswordScreen', () => {
  function api(email) {
    if (email === 'fail@a.a') {
      return Promise.reject(new Error('something error'));
    }
    return Promise.resolve();
  }

  it('show error if fail', async () => {
    const wrapper = shallow(<ForgotPasswordScreen forgotPassword={api} />);
    wrapper.find('[keyboardType="email-address"]').simulate('changeText', 'fail@a.a');
    await wrapper.find('[caption="รับรหัสผ่านใหม่"]').props().onPress();
    expect(wrapper.state().error).toContain('something error');
  });

  it('state loading', async () => {
    let _resolve;
    const forgotPassword = jest.fn(() => new Promise(resolve => _resolve = resolve));
    const wrapper = shallow(<ForgotPasswordScreen forgotPassword={forgotPassword} />);
    expect(wrapper.state().loading).toBe(false);
    const task = wrapper.find('[caption="รับรหัสผ่านใหม่"]').props().onPress();
    expect(wrapper.state().loading).toBe(true);
    _resolve();
    await task;
    expect(wrapper.state().loading).toBe(false);
  });

  it('call onReqed if success', async () => {
    const spy = jest.fn();
    const wrapper = shallow(<ForgotPasswordScreen onReqed={spy} forgotPassword={() => Promise.resolve()} />);
    await wrapper.find('[caption="รับรหัสผ่านใหม่"]').props().onPress();
    expect(spy).toBeCalled();
  });

  it('dont call onReqed if success', async () => {
    const spy = jest.fn();
    const wrapper = shallow(<ForgotPasswordScreen onReqed={spy} forgotPassword={() => Promise.reject(new Error())} />);
    await wrapper.find('[caption="รับรหัสผ่านใหม่"]').props().onPress();
    expect(spy).not.toBeCalled();
  });
});
