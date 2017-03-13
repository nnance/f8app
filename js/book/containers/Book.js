import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import { createReducerOnReply } from 'graphql-comment/src/react-native';

import Book from '../components/Book';

export const query = gql`
  query BookQuery($id: MongoID!){
    clog(filter: { _id: $id }) {
      ...Book
    }
  }
  ${Book.fragments.clog}
`;

export const mapQueryToProps = ({ data }) => {
  const { clog, error, loading } = data;
  if (error) {
    console.error('graphql error: ', error);
  }
  return {
    clog: {
      ...(clog || {}),
      episodes: loading || error ? [] : clog.episodes,
    },
    loading,
  };
};

export const mapPropsToOptions = ({ id }) => ({
  variables: {
    id,
  },
  reducer: createReducerOnReply(id, (previousResult, reply) => {
    return {
      ...previousResult,
      clog: {
        ...previousResult.clog,
        commentCount: previousResult.clog.commentCount + 1,
      },
    };
  }),
});

export default graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions,
})(Book);

// export default require('View')
