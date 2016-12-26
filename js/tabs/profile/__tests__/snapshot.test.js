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
