import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import BookmarkScreen from '../components/BookmarkScreen';
import * as mockData from '../mockData';

export const query = gql`
  query {
    me {
      id
      summaryBookmarks {
        ...BookmarkScreen
      }
    }
  }
  ${BookmarkScreen.fragments.summaryBookmark}
`;

const mapQueryToProps = ({ data }) => {
  return {
    summaryBookmarks: !data.me || !data.me.summaryBookmarks ? [] : data.me.summaryBookmarks,
  };
};

export default graphql(
  query,
  {
    props: mapQueryToProps,
  }
)(BookmarkScreen);
