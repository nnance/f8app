import React from 'react';
import {shallow} from 'enzyme';

import EmailLoginScreen from '../EmailLoginScreen';

describe('EmailLoginScreen', () => {
  function api(email, password) {
    if (email === 'fail@a.a' && password === 'fail@a.a') {
      return Promise.reject(new Error('something error'));
    }
    return Promise.resolve();
  }

  it('show error if fail', async () => {
    const wrapper = shallow(<EmailLoginScreen logIn={api} pushPage={jest.fn()}/>);
    wrapper.find('[keyboardType="email-address"]').simulate('changeText', 'fail@a.a');
    wrapper.find('[placeholder="รหัสผ่าน"]').simulate('changeText', 'fail@a.a');
    await wrapper.find('[caption="เข้าสู่ระบบ"]').props().onPress();
    expect(wrapper.state().error).toContain('something error');
  });

  it('state loading', async () => {
    let _resolve;
    const logIn = jest.fn(() => new Promise(resolve => _resolve = resolve));
    const wrapper = shallow(<EmailLoginScreen logIn={logIn} pushPage={jest.fn()}/>);
    expect(wrapper.state().loading).toBe(false);
    const task = wrapper.find('[caption="เข้าสู่ระบบ"]').props().onPress();
    expect(wrapper.state().loading).toBe(true);
    _resolve();
    await task;
    expect(wrapper.state().loading).toBe(false);
  });
});
