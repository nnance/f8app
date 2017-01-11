const categoryImgs = {
  'default': require('./img/category/G.png'),
  'D': require('./img/category/D.png'),
  'G': require('./img/category/G.png'),
  'M': require('./img/category/M.png'),
  'N': require('./img/category/N.png')
};

export function getCategoryIcon(category) {
  console.log(category);
  if (categoryImgs[category] === undefined) {
    return categoryImgs['default'];
  }
  return categoryImgs[category];
}
