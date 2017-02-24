import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';

import BookmarkDetail from '../components/BookmarkDetail';
import { query as BookmarkScreenQuery } from '../containers/BookmarkScreen';
import * as mockData from '../mockData';

const query = gql`
  query BookmarkDetail($id: MongoID!){
    clog(filter: { _id: $id }) {
      ...BookmarkDetail
    }
  }
  ${BookmarkDetail.fragments.clog}
`;

const withMutations = graphql(
  gql`
    mutation removeBookmarks($ids: [MongoID!]!){
      removeBookmarks(_ids: $ids) {
        removedBookmarks {
          id
        }
      }
    }  
  `,
  {
    props: ({ ownProps, mutate }) => ({
      removeBookmarks: (ids) => {
        return mutate({
          variables: {
            ids,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            removeBookmarks: {
              __typename: 'RemoveBookmarksResult',
              removedBookmarks: ids.map(id => ({
                __typename: 'Bookmark',
                id,
              })),
            },
          },
          updateQueries: {
            BookmarkDetail: (prev, { mutationResult }) => {
              const removedBookmarks = mutationResult.data.removeBookmarks.removedBookmarks;
              return {
                ...prev,
                clog: {
                  ...prev.clog,
                  myBookmarks: prev.clog.myBookmarks.filter(bookmark => !_.find(removedBookmarks, _bookmark => _bookmark.id === bookmark.id)),
                },
              };
            },
          },
          refetchQueries: [
            { query: BookmarkScreenQuery }
          ],
        });
      },
    }),
  },
);

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

const withData = graphql(
  query,
  {
    props: mapQueryToProps,
    options: mapPropsToOptions,
  },
);

export default withMutations(withData(BookmarkDetail));
