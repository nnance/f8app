import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { View, TouchableOpacity } from 'react-native';

import ProfileHeader from '../components/ProfileHeader';
import Home from '../components/Home';
import * as mockData from '../mockData';

describe('Home', () => {
  let wrapper;
  const followingSpy = jest.fn();
  const followerSpy = jest.fn();
  const candySpy = jest.fn();
  const editProfileSpy = jest.fn();
  const menuPressSpy = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<Home
      {...mockData}
      onFollowerPress={followingSpy}
      onFollowingPress={followerSpy}
      onCandyPress={candySpy}
      onEditProfile={editProfileSpy}
      onMenuPress={menuPressSpy}
    />);
  });

  afterEach(() => {
    followingSpy.mockClear();
    followerSpy.mockClear();
    candySpy.mockClear();
    editProfileSpy.mockClear();
    menuPressSpy.mockClear();
  });

  it('render', () => {
    const tree = renderer.create(<Home {...mockData} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('press following', () => {
    wrapper.find('[title="ผู้ติดตาม"]').simulate('press');
    expect(followingSpy).toBeCalled();
  });

  it('press following', () => {
    wrapper.find('[title="กำลังติดตาม"]').simulate('press');
    expect(followerSpy).toBeCalled();
  });

  it('press following', () => {
    wrapper.find('[title="Candys"]').simulate('press');
    expect(candySpy).toBeCalled();
  });

  it('press editProfile', () => {
    wrapper.find(ProfileHeader).find(TouchableOpacity).simulate('press');
    expect(editProfileSpy).toBeCalled();
  });

  it('renderMenu', () => {
    const component = wrapper.instance().renderMenu({ name: 'following' });
    const tree = renderer.create(component);
    expect(tree.toJSON()).toMatchSnapshot();
    const menuWrapper = shallow(<View>{component}</View>);
    menuWrapper.find('[title="following"]').simulate('press');
    expect(menuPressSpy).toBeCalledWith('following');
  });
});
