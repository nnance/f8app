import gql from 'graphql-tag';

const categoryImgs = {
  'default': require('./img/category/G.png'),
  'D': require('./img/category/D.png'),
  'G': require('./img/category/G.png'),
  'M': require('./img/category/M.png'),
  'N': require('./img/category/N.png')
};

export function getCategoryIcon(category) {
  if (categoryImgs[category] === undefined) {
    return categoryImgs['default'];
  }
  return categoryImgs[category];
}

export const fragments = {
  clogMetaData: gql`
    fragment clogMetaData on Clog {
      title
      cover
      category
      author {
        name
      }
    }
  `
};
