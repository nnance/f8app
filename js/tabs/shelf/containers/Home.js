import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Home from '../components/Home';

export const query = gql`
  query {
    trending {
      title
      cover
      category
      author {
        name
      }
    }
    topClog {
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
      trending {
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

const mapClogFragment = clog => {
  return ({
    ...clog,
    author: clog.author.name
  });
};

export const mapQueryToProps = ({ ownProps, data }) => {
  const { loading, trending, topClog, favoriteTags, heroBanners } = data;
  return ({
    trending: loading ? [] : trending.map(mapClogFragment),
    topClog: loading ? undefined : mapClogFragment(topClog),
    heroBanners: loading ? [] : heroBanners.map(mapClogFragment),
    favoriteTags: loading ? [] : favoriteTags.map(tag => ({
      ...tag,
      trending: tag.trending.map(mapClogFragment)
    })),
    loading
  });
};

export default graphql(query, {
  props: mapQueryToProps
})(Home);
