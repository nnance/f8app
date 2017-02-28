import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { query as BookmarkScreenQuery } from '../../tabs/profile/containers/BookmarkScreen';

export const filterClogId = (bookmarks, clogId) => bookmarks.filter(bookmark => bookmark.clogId === clogId);
export const filterEpisodeId = (bookmarks, episodeId) => bookmarks.filter(bookmark => bookmark.episodeId === episodeId);

const updateCacheQuery = gql`
  query updateCache {
    me {
      id
      bookmarks {
        id
        clogId
        episodeId
        episode {
          id
        }
        clog {
          id
        }
      }
    }
  }
`;

const refetchs = [{ query: updateCacheQuery }, { query: BookmarkScreenQuery }]

export const withRemoveBookmarks = graphql(
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
          refetchQueries: refetchs,
        });
      },
    }),
  },
);

export const withAddEpisodeBookmark = graphql(
  gql`
    mutation addEpisodeBookmark($episodeId: MongoID!){
      addEpisodeBookmark(episodeId: $episodeId) {
        id
      }
    }
  `,
  {
    props: ({ ownProps, mutate }) => ({
      addEpisodeBookmark: (episodeId) => {
        return mutate({
          variables: {
            episodeId,
          },
          refetchQueries: refetchs,
        });
      },
    }),
  },
);
