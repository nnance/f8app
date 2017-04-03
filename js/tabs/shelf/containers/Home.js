import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Home from '../components/Home';
import { CLOG_PREVIEW_LIMIT } from '../constants';

export const query = gql`
  query {
    trendingClogs(limit: ${CLOG_PREVIEW_LIMIT}) {
      ...MetaClogListView
    }
    recommendedClog {
      ...RecommendedClog
    }
    favoriteTags: tags(limit: 3) {
      ...FavoritTag
    }
    heroBanners {
      ...HeroBanner
    }
  }
  ${Home.fragments.RecommendedClog}
  ${Home.fragments.HeroBanner}
  ${Home.fragments.MetaClogListView}
  ${Home.fragments.FavoritTag}
`;

export const mapQueryToProps = ({ data }) => {
  const { loading, trendingClogs, recommendedClog, favoriteTags, heroBanners, error } = data;
  if (error) {
    console.error('graphql error: ', error);
  }
  return ({
    trendingClogs: loading || !!error ? [] : trendingClogs,
    recommendedClog,
    heroBanners: loading || !!error ? [] : heroBanners,
    favoriteTags: loading || !!error ? [] : favoriteTags,
  });
};

export default graphql(query, {
  props: mapQueryToProps,
})(Home);
