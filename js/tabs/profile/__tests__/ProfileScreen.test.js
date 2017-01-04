import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import {View, TouchableOpacity} from 'react-native';

import ProfileHeader from '../components/ProfileHeader';
import {Component as ProfileScreenComponent, ProfileMenuScreen} from '../containers/ProfileScreen';
import * as mockData from '../mockData';

describe('ProfileScreen', () => {
  it('render', () => {
    const tree = renderer.create(<ProfileScreenComponent {...mockData}/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renderScene correct component', () => {
    const scenes = ['following', 'follower', 'myfan', 'activity', 'myclog', 'bookmark', 'jellyShop', 'edit-profile', 'change-email', 'change-password', undefined];
    const dump = shallow(<ProfileScreenComponent {...mockData}/>);
    scenes.forEach(scene => {
      const component = dump.instance().renderScene({page: scene});
      const tree = shallow(<View>{component}</View>);
      expect(toJSON(tree)).toMatchSnapshot();
    });
  });

  it('onMenuPress, should push into navigator', () => {
    const dump = shallow(<ProfileScreenComponent {...mockData}/>);
    const menues = ['myfan', 'activity', 'myclog', 'bookmark', 'jellyShop'];
    menues.forEach(menu => {
      const spy = jest.fn();
      dump.instance().refs = {
        navigator: {
          push: spy
        }
      };
      dump.instance().onMenuPress(menu);
      expect(spy).toBeCalledWith({page: menu});
    });
  });

  it('onBack', () => {
    const spy = jest.fn();
    const dump = shallow(<ProfileScreenComponent {...mockData}/>);
    dump.instance().onBack({pop: spy});
    expect(spy).toBeCalled();
  });

  it('pushPage', () => {
    const spy = jest.fn();
    const dump = shallow(<ProfileScreenComponent {...mockData}/>);
    dump.instance().pushPage({push: spy}, 'test');
    expect(spy).toBeCalledWith({page: 'test'});
  });

  describe('ProfileMenuScreen', () => {
    let wrapper;
    const followingSpy = jest.fn();
    const followerSpy = jest.fn();
    const candySpy = jest.fn();
    const editProfileSpy = jest.fn();
    const menuPressSpy = jest.fn();
    beforeEach(() => {
      wrapper = shallow(<ProfileMenuScreen
        {...mockData}
        onFollowerPress={followingSpy}
        onFollowingPress={followerSpy}
        onCandyPress={candySpy}
        onEditProfile={editProfileSpy}
        onMenuPress={menuPressSpy}
        />)
    });

    afterEach(() => {
      followingSpy.mockClear();
      followerSpy.mockClear();
      candySpy.mockClear();
      editProfileSpy.mockClear();
      menuPressSpy.mockClear();
    });

    it('render', () => {
      const tree = renderer.create(<ProfileMenuScreen {...mockData}/>);
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
      const component = wrapper.instance().renderMenu({name: 'following'});
      const tree = renderer.create(component);
      expect(tree.toJSON()).toMatchSnapshot();
      const menuWrapper = shallow(<View>{component}</View>);
      menuWrapper.find('[title="following"]').simulate('press');
      expect(menuPressSpy).toBeCalledWith('following');
    })
  });
});
