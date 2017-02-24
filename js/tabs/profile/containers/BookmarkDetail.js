import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import BookmarkDetail from '../components/BookmarkDetail';
import * as mockData from '../mockData';

const query = gql`
  query BookmarkDetail($id: MongoID!){
    clog(filter: { _id: $id }) {
      ...BookmarkDetail
    }
  }
  ${BookmarkDetail.fragments.clog}
`;

const mapQueryToProps = ({ data }) => {
  return {
    clog: data.clog,
  };
};

export const mapPropsToOptions = ({ id }) => ({
  variables: {
    id,
  },
});

export default graphql(
  query,
  {
    props: mapQueryToProps,
    options: mapPropsToOptions,
  },
)(BookmarkDetail);
