import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import EditorListView from '../components/EditorListView';

export const query = gql`
  query EditorListView($category: String!) {
    categoryDetail(category: $category) {
      editors {
        ...EditorListView
      }
    }
  }
  ${EditorListView.fragments.editor}
`;

export const mapQueryToProps = ({ data }) => {
  const { loading } = data;
  if (data.error) {
    console.error(data.error);
  }
  return {
    editors: loading ? [] : data.categoryDetail.editors,
  };
};

export const mapPropsToOptions = ({ category }) => ({
  variables: {
    category,
  },
});

export default graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions,
})(EditorListView);
