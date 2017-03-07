const categoryImgs = {
  default: require('../../assets/common/clog-category/icon/G.png'),
  D: require('../../assets/common/clog-category/icon/D.png'),
  G: require('../../assets/common/clog-category/icon/G.png'),
  M: require('../../assets/common/clog-category/icon/M.png'),
  N: require('../../assets/common/clog-category/icon/N.png'),
};

const categoryLogo = {
  default: require('../../assets/common/clog-category/logo/diary.png'),
  D: require('../../assets/common/clog-category/logo/diary.png'),
  G: require('../../assets/common/clog-category/logo/gag.png'),
  M: require('../../assets/common/clog-category/logo/myth.png'),
  N: require('../../assets/common/clog-category/logo/novel.png'),
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
