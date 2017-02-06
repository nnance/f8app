import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ClogCategory from '../components/ClogCategory';
import {CLOG_PREVIEW_LIMIT} from '../constants';

export const query = gql`
  query CategoryDetail($category: CATEGORY!){
    categoryDetail(category: $category) {
      recommendedClogs {
        ...ClogCategoryClog
      }
      editors {
        ...ClogCategoryEditor
      }
    }
    trendingClogs: clogs(filter: {category: $category, limit: ${CLOG_PREVIEW_LIMIT}}, orderBy: TRENDING) {
      ...MetaClogListView
    }
    recentlyClogs: clogs(filter: {category: $category, limit: ${CLOG_PREVIEW_LIMIT}}, orderBy: RECENTLY) {
      ...MetaClogListView
    }
  }
  ${ClogCategory.fragments.MetaClogListView}
  ${ClogCategory.fragments.ClogCategoryEditor}
  ${ClogCategory.fragments.ClogCategoryClog}
`;

export const mapPropsToOptions = ({category}) => ({
  variables: {
    category
  }
});

export const mapQueryToProps = ({ ownProps, data }) => {
  const { loading, categoryDetail, trendingClogs, recentlyClogs } = data;
  return ({
    trendingClogs: loading ? [] : trendingClogs,
    recentlyClogs: loading ? [] : recentlyClogs,
    editors: loading ? [] : categoryDetail.editors,
    recommendedClogs: loading ? [] : categoryDetail.recommendedClogs,
    loading
  });
};

export default graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions
})(ClogCategory);
