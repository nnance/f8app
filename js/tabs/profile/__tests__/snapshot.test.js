import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import * as mockData from '../mockData';

describe('BookmarkScreen', () => {
  const BookmarkScreen = require('../components/BookmarkScreen').default;
  it('render BookmarkScreen', () => {
    const tree = renderer.create(<BookmarkScreen bookmark={mockData.bookmark} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('JellyShopScreen', () => {
  const JellyShopScreen = require('../components/JellyShopScreen').default;
  it('render JellyShopScreen', () => {
    const tree = renderer.create(<JellyShopScreen />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('MyClogScreen', () => {
  const MyClogScreen = require('../components/MyClogScreen').default;
  it('render MyClogScreen', () => {
    const tree = renderer.create(<MyClogScreen clogs={mockData.myClogs} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('ProfileCover', () => {
  const ProfileCover = require('../components/ProfileCover').default;
  const Text = require('react-native').Text;
  it('render default', () => {
    const tree = renderer.create(<ProfileCover />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render customSource', () => {
    const tree = renderer.create(<ProfileCover customSource={{ uri: 'custom' }} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render user cover with children', () => {
    const tree = renderer.create(
      <ProfileCover
        user={mockData.user}
      >
        <Text>User Cover</Text>
      </ProfileCover>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('ProfileHeader', () => {
  const ProfileHeader = require('../components/ProfileHeader').default;
  it('render', () => {
    const tree = renderer.create(<ProfileHeader user={mockData.user} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('UserContainer', () => {
  const UserContainer = require('../components/UserContainer');

  describe('FollowingScreen', () => {
    const FollowingScreen = UserContainer.FollowingScreen;
    it('render', () => {
      const tree = renderer.create(<FollowingScreen userList={mockData.following} />);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe('MyFanScreen', () => {
    const MyFanScreen = UserContainer.MyFanScreen;
    it('render', () => {
      const tree = renderer.create(<MyFanScreen userList={mockData.myFan} />);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe('FollowerScreen', () => {
    const FollowerScreen = UserContainer.FollowerScreen;
    it('render', () => {
      const tree = renderer.create(<FollowerScreen userList={mockData.follower} />);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});

describe('ProfileNavigator', () => {
  const ProfileNavigator = require('../components/ProfileNavigator').default;
  it('render', () => {
    const tree = shallow(<ProfileNavigator />);
    expect(toJSON(tree)).toMatchSnapshot();
  });
});
