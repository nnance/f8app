import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Home from '../components/Home';
import {CLOG_PREVIEW_LIMIT} from '../constants';

import {fragments} from '../../../models/clog';

export const query = gql`
  query {
    trendingClogs: clogs(filter: {limit: ${CLOG_PREVIEW_LIMIT}}, orderBy: TRENDING) {
      ...clogMetaData
    }
    recommendedClog {
      ...clogMetaData
      review
    }
    favoriteTags {
      name
      trendingClogs {
        ...clogMetaData
      }
    }
    heroBanners {
      ...clogMetaData
      review
    }
  }
  ${fragments.clogMetaData}
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
