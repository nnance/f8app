const categoryImgs = {
  default: require('./img/category/icon/G.png'),
  D: require('./img/category/icon/D.png'),
  G: require('./img/category/icon/G.png'),
  M: require('./img/category/icon/M.png'),
  N: require('./img/category/icon/N.png'),
};

const categoryLogo = {
  default: require('./img/category/logo/diary.png'),
  D: require('./img/category/logo/diary.png'),
  G: require('./img/category/logo/gag.png'),
  M: require('./img/category/logo/myth.png'),
  N: require('./img/category/logo/novel.png'),
};

const categoryFullName = {
  default: 'Unknow Clog',
  D: 'Diary Clog',
  G: 'Gag Clog',
  M: 'Myth Clog',
  N: 'Novel Clog',
};

export function getCategoryIcon(category) {
  if (categoryImgs[category] === undefined) {
    return categoryImgs.default;
  }
  return categoryImgs[category];
}

export function getCategoryLogo(category) {
  if (categoryLogo[category] === undefined) {
    return categoryLogo.default;
  }
  return categoryLogo[category];
}

export function getCategoryFullName(category) {
  if (categoryFullName[category] === undefined) {
    return categoryFullName.default;
  }
  return categoryFullName[category];
}
