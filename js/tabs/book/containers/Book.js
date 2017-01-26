import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import Book from '../components/Book';

export const query = gql`
  query Clog($id: ID!){
    clog(id: $id) {
      title
      cover
      review
      author {
        name
      }
      episodes {
        id
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
