import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Book from '../components/Book';

export const query = gql`
  query Clog($id: ID!){
    clog(id: $id) {
      title
      review
      author {
        name
      }
      episodes {
        no
        preview
        viewCount
        likeCount
        createdAt
      }
    }
  }
`;

export const mapQueryToProps = ({ ownProps, data }) => {
  return {
    clog: data.clog,
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
