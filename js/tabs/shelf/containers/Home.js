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
  }
`;

export default graphql(query, {
  props: ({ ownProps, data: { loading, trending, topClog }}) => ({
    trending: loading ? [] : trending.map(clog => ({
      title: clog.title,
      author: clog.author.name,
      cover: clog.cover,
      category: clog.category
    })),
    topClog: loading ? undefined : {
      ...topClog,
      author: topClog.author.name
    },
    loading
  })
})(Home);
