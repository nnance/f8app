import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import Book from '../components/Book';

export const query = gql`
  query BookQuery($id: ID!){
    clog(id: $id) {
      ...Book
    }
  }
  ${Book.fragments.clog}
`;

export const mapQueryToProps = ({ ownProps, data }) => {
  return {
    clog: {
      ...data.clog,
      episodes: data.loading ? [] : _.sortBy(data.clog.episodes, ep => -ep.no)
    },
    loading: data.loading
  };
};

export const mapPropsToOptions = ({id}) => ({
  variables: {
    id
  }
});

export default graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions
})(Book);

// export default require('View')
