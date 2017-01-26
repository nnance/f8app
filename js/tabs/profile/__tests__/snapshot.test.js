import React from 'react';
import renderer from 'react-test-renderer';
import {bookmark as mockBookmark, myClogs as mockMyClogs, user as mockUser} from '../mockData';
import * as mockData from '../mockData';

describe('BookmarkScreen', () => {
  const BookmarkScreen = require('../components/BookmarkScreen').default;
  it('render BookmarkScreen', () => {
    const tree = renderer.create(<BookmarkScreen bookmark={mockBookmark}/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('JellyShopScreen', () => {
  const JellyShopScreen = require('../components/JellyShopScreen').default;
  it('render JellyShopScreen', () => {
    const tree = renderer.create(<JellyShopScreen/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('MyClogScreen', () => {
  const MyClogScreen = require('../components/MyClogScreen').default;
  it('render MyClogScreen', () => {
    const tree = renderer.create(<MyClogScreen clogs={mockMyClogs}/>);
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
    const tree = renderer.create(<ProfileCover customSource={{uri: 'custom'}}/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render user cover with children', () => {
    const tree = renderer.create(<ProfileCover user={mockUser}><Text>User Cover</Text></ProfileCover>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('ProfileHeader', () => {
  const ProfileHeader = require('../components/ProfileHeader').default;
  it('render', () => {
    const tree = renderer.create(<ProfileHeader user={mockUser}/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('UserContainer', () => {
  const UserContainer = require('../components/UserContainer');

  describe('FollowingScreen', () => {
      const FollowingScreen = UserContainer.FollowingScreen;
      it('render', () => {
        const tree = renderer.create(<FollowingScreen userList={mockData.following}/>);
        expect(tree.toJSON()).toMatchSnapshot();
      });
  });

  describe('MyFanScreen', () => {
      const MyFanScreen = UserContainer.MyFanScreen;
      it('render', () => {
        const tree = renderer.create(<MyFanScreen userList={mockData.myFan}/>);
        expect(tree.toJSON()).toMatchSnapshot();
      });
  });

  describe('FollowerScreen', () => {
      const FollowerScreen = UserContainer.FollowerScreen;
      it('render', () => {
        const tree = renderer.create(<FollowerScreen userList={mockData.follower}/>);
        expect(tree.toJSON()).toMatchSnapshot();
      });
  });
});

describe('ProfileScreen', () => {
  const ProfileScreenComponent = require('../containers/ProfileScreen').Component;
  it('render', () => {
    const tree = renderer.create(<ProfileScreenComponent {...mockData}/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
