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
  date: new Date(Date.now() - 5000)
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
    authors: 'David Beckham',
    cover: require('./img/A.png'),
    categoryCover: require('./img/category/M.png'),
    views: 12300,
    likes: 1500,
    date: new Date(2015, 5, 24)
  },
  {
    title: 'Money Honey คุณชายหน้าตายกับยัยขี้งก',
    authors: 'สุดสาครนอย ไทรโยค',
    cover: require('./img/B.png'),
    categoryCover: require('./img/category/N.png'),
    views: 100,
    likes: 55,
    date: new Date(2016, 10, 8)
  }
];

export const bookmark = [
  {
    title: 'Richy Rich! รวยมากนะ! รู้ยังคะทุกคน',
    cover: require('./img/A.png'),
    categoryCover: require('./img/category/N.png'),
    bookmarkCount: 7
  },
  {
    title: 'Money Honey คุณชายหน้าตายกับยัยขี้งก',
    cover: require('./img/B.png'),
    categoryCover: require('./img/category/M.png'),
    bookmarkCount: 3
  }
];
