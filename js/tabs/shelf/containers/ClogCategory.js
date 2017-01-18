import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ClogCategory from '../components/ClogCategory';

import {fragments} from '../../../models/clog';

export const query = gql`
  query CategoryDetail($category: Category!){
    categoryDetail(category: $category) {
      trendingClogs {
        ...clogMetaData
      }
      recentlyClogs {
        ...clogMetaData
      }
      recommendedClogs {
        ...clogMetaData
      }
      editors {
        name
        profilePicture
      }
      followingCount
    }
  }
  ${fragments.clogMetaData}
`;

export const mapPropsToOptions = ({category}) => ({
  variables: {
    category
  }
});

export const mapQueryToProps = ({ ownProps, data }) => {
  const { loading, categoryDetail } = data;
  return ({
    trendingClogs: loading ? [] : categoryDetail.trendingClogs,
    recentlyClogs: loading ? [] : categoryDetail.recentlyClogs,
    editors: loading ? [] : categoryDetail.editors,
    recommendedClogs: loading ? [] : categoryDetail.recommendedClogs,
    followingCount: loading ? 0 : categoryDetail.followingCount,
    loading
  });
};

export default graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions
})(ClogCategory);
