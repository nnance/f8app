import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import F8Button from 'F8Button';

import {Component as ChangeEmailScreenComponent} from '../containers/ChangeEmailScreen';

describe('ChangeEmailScreen', () => {
  function api(email) {
    if (email === 'fail@a.a') {
      return Promise.reject(new Error('something wrong'));
    }
    return Promise.resolve();
  }

  it('render authen', () => {
    const tree = renderer.create(<ChangeEmailScreenComponent/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('error if email not match', async () => {
    const wrapper = shallow(<ChangeEmailScreenComponent/>);
    wrapper.find('[placeholder="email"]').simulate('changeText', 'a@a.a');
    wrapper.find('[placeholder="confirm email"]').simulate('changeText', 'b@a.a');
    wrapper.find(F8Button).simulate('press');
    expect(wrapper.state().error).toContain('not match');
  });

  it('call api', async () => {
    let changeEmail = jest.fn(api);
    const wrapper = shallow(<ChangeEmailScreenComponent changeEmail={changeEmail}/>);
    wrapper.find('[placeholder="email"]').simulate('changeText', 'a@a.a');
    wrapper.find('[placeholder="confirm email"]').simulate('changeText', 'a@a.a');
    wrapper.find(F8Button).simulate('press');
    expect(changeEmail).toBeCalled();
  });

  it('call onBackPress if changed email', async () => {
    let changeEmail = jest.fn(api);
    let onBackPress = jest.fn();
    const wrapper = shallow(<ChangeEmailScreenComponent changeEmail={changeEmail} onBackPress={onBackPress}/>);
    wrapper.find('[placeholder="email"]').simulate('changeText', 'a@a.a');
    wrapper.find('[placeholder="confirm email"]').simulate('changeText', 'a@a.a');
    await wrapper.find(F8Button).props().onPress();
    expect(onBackPress).toBeCalled();
  });

  it('set state error if api reject', async () => {
    let changeEmail = jest.fn(api);
    let onBackPress = jest.fn();
    const wrapper = shallow(<ChangeEmailScreenComponent changeEmail={changeEmail} onBackPress={onBackPress}/>);
    wrapper.find('[placeholder="email"]').simulate('changeText', 'fail@a.a');
    wrapper.find('[placeholder="confirm email"]').simulate('changeText', 'fail@a.a');
    await wrapper.find(F8Button).props().onPress();
    expect(onBackPress).not.toBeCalled();
    expect(wrapper.state().error).toContain('something wrong');
  });
});
