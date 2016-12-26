import React from 'react';
import renderer from 'react-test-renderer';

const mockBookmark = [
  {
    title: "Richy Rich! รวยมากนะ! รู้ยังคะทุกคน",
    cover: require('./img/A.png'),
    categoryCover: require('./img/category/N.png'),
    bookmarkCount: 7
  },
  {
    title: "Money Honey คุณชายหน้าตายกับยัยขี้งก",
    cover: require('./img/B.png'),
    categoryCover: require('./img/category/M.png'),
    bookmarkCount: 3
  }
];

const mockMyClogs = [
  {
    title: "Richy Rich! รวยมากนะ! รู้ยังคะทุกคน",
    authors: "David Beckham",
    cover: require('./img/A.png'),
    categoryCover: require('./img/category/M.png'),
    views: 12300,
    likes: 1500,
    date: new Date(2015, 5, 24)
  },
  {
    title: "Money Honey คุณชายหน้าตายกับยัยขี้งก",
    authors: "สุดสาครนอย ไทรโยค",
    cover: require('./img/B.png'),
    categoryCover: require('./img/category/N.png'),
    views: 100,
    likes: 55,
    date: new Date(2016, 10, 8)
  }
];

describe('BookmarkScreen', () => {
  const BookmarkScreen = require('../BookmarkScreen').default;
  it('render BookmarkScreen', () => {
    const tree = renderer.create(<BookmarkScreen bookmark={mockBookmark}/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('CircleImageWithCategory', () => {
  const CircleImageWithCategory = require('../CircleImageWithCategory').default;
  it('render CircleImageWithCategory', () => {
    const tree = renderer.create(<CircleImageWithCategory
      source={{uri: 'x.jpg'}}
      categorySource={{uri: 'x.jpg'}}
      size={100}
    />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('JellyShopScreen', () => {
  const JellyShopScreen = require('../JellyShopScreen').default;
  it('render JellyShopScreen', () => {
    const tree = renderer.create(<JellyShopScreen/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('ModalSpinner', () => {
  const ModalSpinner = require('../ModalSpinner').default;
  it('render visible', () => {
    const tree = renderer.create(<ModalSpinner visible={true}/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render invisible', () => {
    const tree = renderer.create(<ModalSpinner visible={false}/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('MyClogScreen', () => {
  const MyClogScreen = require('../MyClogScreen').default;
  it('render MyClogScreen', () => {
    const tree = renderer.create(<MyClogScreen myClogs={mockMyClogs}/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('ProfileCover', () => {
  const ProfileCover = require('../ProfileCover').default;
  it('render default', () => {
    const tree = renderer.create(<ProfileCover />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render customSource', () => {
    const tree = renderer.create(<ProfileCover customSource={{uri: 'custom'}}/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it.skip('render user cover');
});

describe('ProfileHeader', () => {
  const ProfileHeader = require('../ProfileHeader').default;
  it('render with user');
});

describe.skip('UserContainer', () => {
  const UserContainer = require('../UserContainer').default;
  describe('FollowingScreen');
  describe('MyFanScreen');
  describe('FollowerScreen');
});
