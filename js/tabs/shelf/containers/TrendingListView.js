import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { liftEdges } from '../../../common/utils';

import ClogListView from '../components/ClogListView';

const query = gql`
  query ClogListView($filter: FilterFindManyTrendingClogInput, $sort: SortFindManyTrendingClogInput = _ID_ASC){
    clogs: trendingClogs(filter: $filter, sort: $sort, limit: 50) {
      ...ClogListView
    }
  }
  ${ClogListView.fragments.clog}
`;

export const mapPropsToOptions = ({ category, tag, sort }) => ({
  variables: {
    filter: {
      category,
      tag,
    },
    sort,
  },
});

const mapQueryToProps = ({ data }) => {
  const { loading, clogs, error } = data;
  if (error) {
    console.error('graphql error: ', error);
  }
  return {
    clogs: loading || !!error ? [] : clogs,
  };
};

export default graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions,
})(ClogListView);
