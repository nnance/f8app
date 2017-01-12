import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Home from '../components/Home';

const query = gql`
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
  }
`;

const mapClogFragment = clog => {
  return ({
    ...clog,
    author: clog.author.name
  });
};

export default graphql(query, {
  props: ({ ownProps, data: { loading, trending, topClog, favoriteTags }}) => ({
    trending: loading ? [] : trending.map(mapClogFragment),
    topClog: loading ? undefined : mapClogFragment(topClog),
    favoriteTags: loading ? [] : favoriteTags.map(tag => ({
      ...tag,
      trending: tag.trending.map(mapClogFragment)
    })),
    loading
  })
})(Home);
