import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Home from '../components/Home';

export const query = gql`
  query {
    trendingClogs {
      title
      cover
      category
      author {
        name
      }
    }
    recommendedClog {
      title
      cover
      category
      review
      author {
        name
      }
    }
    favoriteTags {
      name
      trendingClogs {
        title
        cover
        category
        author {
          name
        }
      }
    }
    heroBanners {
      title
      cover
      category
      review
      author {
        name
      }
    }
  }
`;

export const mapQueryToProps = ({ ownProps, data }) => {
  const { loading, trendingClogs, recommendedClog, favoriteTags, heroBanners } = data;
  return ({
    trendingClogs: loading ? [] : trendingClogs,
    recommendedClog: recommendedClog,
    heroBanners: loading ? [] : heroBanners,
    favoriteTags: loading ? [] : favoriteTags,
    loading
  });
};

export default graphql(query, {
  props: mapQueryToProps
})(Home);
