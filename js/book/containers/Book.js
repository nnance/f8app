import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import { createReducerOnReply, createReducerOnDelete } from 'graphql-comment/src/react-native';

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

export const mapPropsToOptions = ({ id }) => {
  const replyReducer = createReducerOnReply(id, (previousResult, reply) => {
    return {
      ...previousResult,
      clog: {
        ...previousResult.clog,
        commentCount: previousResult.clog.commentCount + 1,
      },
    };
  });
  const deleteReducer = createReducerOnDelete(id, (previousResult) => {
    return {
      ...previousResult,
      clog: {
        ...previousResult.clog,
        commentCount: previousResult.clog.commentCount - 1,
      },
    };
  });
  return {
    variables: {
      id,
    },
    reducer: (previousResult, action) => {
      return replyReducer(deleteReducer(previousResult, action), action);
    },
  };
};

export default graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions,
})(Book);

// export default require('View')
