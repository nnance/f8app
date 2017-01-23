export const user = {
  id: 1,
  name: 'test',
  sex: 'M',
  facebookLinked: false
};
export const following = [{name: 'Art Nattapat'}, {name: 'Art Art Art'}, {name: 'Art Art Art'}, {name: 'Art Art Art'}, {name: 'Art Art Art'}, {name: 'Art Art Art'}];
export const follower = [{name: 'Art Nattapat', following: true}, {name: 'Art Art Art', following: false}, {name: 'Art Art Art', following: false}, {name: 'Art Art Art', following: true}, {name: 'Art Art Art', following: true}, {name: 'Art Art Art', following: false}];
export const myFan = [{name: 'Art Nattapat', candys: 1250}, {name: 'Art Art Art', candys: 1250}, {name: 'Art Art Art', candys: 1000}, {name: 'Art Art Art', candys: 789}, {name: 'Art Art Art', candys: 7013}, {name: 'Art Art Art', candys: 0}];
export const candys = 1890;
export const activity = [{
  activity: 'like',
  title: `แมค เดมอน ตะลุยอวกาศ`,
  outline: `The Martain กำกับโดย ริดลีย์ สก๊อต เนื้อหาเล่าถึง นักบินอวกาศที่ถูกทิ้งไว้บนดาวอังคาร`,
  uri: 'http://3.bp.blogspot.com/-zW6wqY_1Me0/VYvJMOV4mcI/AAAAAAAAD-4/mB_AxhFoJH4/s1600/178491main_sig07-009-516.jpg',
  date: new Date(2016, 10, 4)
},{
  activity: 'like',
  title: `แมค เดมอน ตะลุยอวกาศ`,
  outline: `The Martain กำกับโดย ริดลีย์ สก๊อต เนื้อหาเล่าถึง นักบินอวกาศที่ถูกทิ้งไว้บนดาวอังคาร`,
  uri: 'http://3.bp.blogspot.com/-zW6wqY_1Me0/VYvJMOV4mcI/AAAAAAAAD-4/mB_AxhFoJH4/s1600/178491main_sig07-009-516.jpg',
  date: new Date(2016, 10, 8)
}, {
  activity: 'read',
  title: `แมค เดมอน ตะลุยอวกาศ`,
  outline: `The Martain กำกับโดย ริดลีย์ สก๊อต เนื้อหาเล่าถึง นักบินอวกาศที่ถูกทิ้งไว้บนดาวอังคาร`,
  uri: 'http://www.fujisan.ne.jp/fit/th/images/ohishikouen430.jpg',
  date: new Date(2015, 10, 8)
}];

export const myClogs = [
  {
    title: 'Richy Rich! รวยมากนะ! รู้ยังคะทุกคน',
    author: {
      name: 'David Beckham'
    },
    preview: require('./img/A.png'),
    category: 'M',
    viewCount: 12300,
    likeCount: 1500,
    createdAt: new Date(2015, 5, 24)
  },
  {
    title: 'Money Honey คุณชายหน้าตายกับยัยขี้งก',
    author: {
      name: 'สุดสาครนอย ไทรโยค'
    },
    preview: require('./img/B.png'),
    category: 'N',
    viewCount: 100,
    likeCount: 55,
    createdAt: new Date(2016, 10, 8)
  }
];

export const bookmark = [
  {
    title: 'Richy Rich! รวยมากนะ! รู้ยังคะทุกคน',
    preview: require('./img/A.png'),
    category: 'N',
    bookmarkCount: 7
  },
  {
    title: 'Money Honey คุณชายหน้าตายกับยัยขี้งก',
    preview: require('./img/B.png'),
    category: 'M',
    bookmarkCount: 3
  }
];
