import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { updateMeBookmarksReduer } from '../../../models/bookmark';

import BookmarkScreen from '../components/BookmarkScreen';

export const query = gql`
  query {
    me {
      id
      bookmarks {
        ...BookmarkScreen
      }
    }
  }
  ${BookmarkScreen.fragments.bookmark}
`;

const mapQueryToProps = ({ data }) => {
  if (data.error) {
    console.error(data.error);
  }
  return {
    bookmarks: !data.me || !data.me.bookmarks ? [] : data.me.bookmarks,
  };
};

export default graphql(
  query,
  {
    props: mapQueryToProps,
    options: () => ({
      reduer: updateMeBookmarksReduer,
    }),
  }
)(BookmarkScreen);
