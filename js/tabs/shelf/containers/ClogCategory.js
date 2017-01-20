import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ClogCategory from '../components/ClogCategory';

import {fragments} from '../../../models/clog';

export const query = gql`
  query CategoryDetail($category: CATEGORY!){
    categoryDetail(category: $category) {
      trendingClogs: clogs {
        ...clogMetaData
      }
      recentlyClogs: clogs {
        ...clogMetaData
      }
      recommendedClogs {
        ...clogMetaData
        followersYouKnow {
          name
          profilePicture
        }
        followerCount
      }
      editors {
        name
        profilePicture
      }
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
    loading
  });
};

export default graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions
})(ClogCategory);
