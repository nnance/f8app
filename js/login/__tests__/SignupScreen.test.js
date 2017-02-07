import React from 'react';
import { shallow } from 'enzyme';

import SignupScreen from '../SignupScreen';

describe('SignupScreen', () => {
  function api(email, password) {
    if (email === 'fail@a.a') {
      return Promise.reject(new Error('something error'));
    }
    return Promise.resolve();
  }

  it('show error if api fail', async () => {
    const wrapper = shallow(<SignupScreen signUp={api} />);
    wrapper.find('[keyboardType="email-address"]').simulate('changeText', 'fail@a.a');
    await wrapper.find('[caption="สร้างบัญชี"]').props().onPress();
    expect(wrapper.state().error).toContain('something error');
  });

  it('error if password not match', async () => {
    const wrapper = shallow(<SignupScreen />);
    wrapper.find('[keyboardType="email-address"]').simulate('changeText', 'emai@a.a');
    wrapper.find('[placeholder="รหัสผ่าน"]').simulate('changeText', '1');
    wrapper.find('[placeholder="ยืนยันรหัสผ่าน"]').simulate('changeText', '2');
    await wrapper.find('[caption="สร้างบัญชี"]').props().onPress();
    expect(wrapper.state().error).toContain('password not match');
  });

  it('state loading', async () => {
    let _resolve;
    const signUp = jest.fn(() => new Promise(resolve => _resolve = resolve));
    const wrapper = shallow(<SignupScreen signUp={signUp} />);
    expect(wrapper.state().loading).toBe(false);
    const task = wrapper.find('[caption="สร้างบัญชี"]').props().onPress();
    expect(wrapper.state().loading).toBe(true);
    _resolve();
    await task;
    expect(wrapper.state().loading).toBe(false);
  });

  it('call onSignedUp if success', async () => {
    const spy = jest.fn();
    const wrapper = shallow(<SignupScreen signUp={api} onSignedUp={spy} />);
    wrapper.find('[keyboardType="email-address"]').simulate('changeText', 'a@a.a');
    await wrapper.find('[caption="สร้างบัญชี"]').props().onPress();
    expect(spy).toBeCalled();
  });

  it('dont call onSignedUp if fail', async () => {
    const spy = jest.fn();
    const wrapper = shallow(<SignupScreen signUp={api} onSignedUp={spy} />);
    wrapper.find('[keyboardType="email-address"]').simulate('changeText', 'fail@a.a');
    await wrapper.find('[caption="สร้างบัญชี"]').props().onPress();
    expect(spy).not.toBeCalled();
  });

  it('call logIn after SignedUp', async () => {
    const spy = jest.fn();
    const wrapper = shallow(<SignupScreen signUp={api} logIn={spy} />);
    wrapper.find('[keyboardType="email-address"]').simulate('changeText', 'a@a.a');
    await wrapper.find('[caption="สร้างบัญชี"]').props().onPress();
    expect(spy).toBeCalledWith('a@a.a', '');
  });
});
