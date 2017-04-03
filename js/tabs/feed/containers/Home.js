import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import FeedHome from '../components/FeedHome';

export const query = gql`
{
  feed: feedEditor(filter: {userId: "58b62c5fda82d62bae708b3b"}) {
    author {
      name
      profilePicture
    }
    clog {
      createdAt
      clog {
        id
        title
        coverImage
        category
        synopsis
      }
    }
  }
}
`;

const mapQueryToProps = ({ data }) => {
  const { loading, feed } = data;
  return ({
    feed: loading ? [] : feed,
    loading,
  });
};

export default graphql(query, {
  props: mapQueryToProps,
})(FeedHome);
