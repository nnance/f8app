import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ClogCategory from '../components/ClogCategory';

export const query = gql`
  query {
    categoryDetail(category: D) {
      trendingClogs {
        title
        cover
        category
        author {
          name
        }
      }
      recentlyClogs {
        title
        cover
        category
        author {
          name
        }
      }
      editors {
        name
        profilePicture
      }
      followingCount
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
  const { loading, categoryDetail } = data;
  return ({
    trendingClogs: loading ? [] : categoryDetail.trendingClogs.map(mapClogFragment),
    recentlyClogs: loading ? [] : categoryDetail.recentlyClogs.map(mapClogFragment),
    editors: loading ? [] : categoryDetail.editors,
    followingCount: loading ? 0 : categoryDetail.followingCount,
    loading
  });
};

export default graphql(query, {
  props: mapQueryToProps
})(ClogCategory);
