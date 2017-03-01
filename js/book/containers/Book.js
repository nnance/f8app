import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _ from 'lodash';

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
      episodes: loading || error ? [] : _.sortBy(clog.episodes, ep => -ep.no),
    },
    loading,
  };
};

export const mapPropsToOptions = ({ id }) => ({
  variables: {
    id,
  },
});

export default graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions,
})(Book);

// export default require('View')
