import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Home from '../components/Home';
import { CLOG_PREVIEW_LIMIT } from '../constants';

function liftEdges(edges) {
  return edges.map(edge => edge.node);
}

export const query = gql`
  query {
    trendingClogs: clogConnection(first: ${CLOG_PREVIEW_LIMIT}) {
      edges {
        node {
          ...MetaClogListView
        }
      }
    }
    recommendedClog {
      ...RecommendedClog
    }
    favoriteTags: tagConnection(first: 3) {
      edges {
        node {
          ...FavoritTag
        }
      }
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
    trendingClogs: loading || !!error ? [] : liftEdges(trendingClogs.edges),
    recommendedClog,
    heroBanners: loading || !!error ? [] : heroBanners,
    favoriteTags: loading || !!error ? [] : liftEdges(favoriteTags.edges),
  });
};

export default graphql(query, {
  props: mapQueryToProps,
})(Home);
