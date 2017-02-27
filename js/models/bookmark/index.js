import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { query as BookmarkScreenQuery } from '../../tabs/profile/containers/BookmarkScreen';

export const filterClogId = (bookmarks, clogId) => bookmarks.filter(bookmark => bookmark.clogId === clogId);
export const filterEpisodeId = (bookmarks, episodeId) => bookmarks.filter(bookmark => bookmark.episodeId === episodeId);

const updateCacheQuery = gql`
  query updateCache {
    me {
      id
      episodeBookmarks {
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

export const withRemoveEpisodeBookmarks = graphql(
  gql`
    mutation removeEpisodeBookmarks($ids: [MongoID!]!){
      removeEpisodeBookmarks(_ids: $ids) {
        removedEpisodeBookmarks {
          id
        }
      }
    }
  `,
  {
    props: ({ ownProps, mutate }) => ({
      removeEpisodeBookmarks: (ids) => {
        return mutate({
          variables: {
            ids,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            removeEpisodeBookmarks: {
              __typename: 'RemoveEpisodeBookmarksResult',
              removedEpisodeBookmarks: ids.map(id => ({
                __typename: 'EpisodeBookmark',
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
    mutation addEpisodeBookmark($clogId: MongoID!, $episodeId: MongoID!){
      addEpisodeBookmark(clogId: $clogId, episodeId: $episodeId) {
        id
      }
    }
  `,
  {
    props: ({ ownProps, mutate }) => ({
      addEpisodeBookmark: (clogId, episodeId) => {
        return mutate({
          variables: {
            clogId,
            episodeId,
          },
          refetchQueries: refetchs,
        });
      },
    }),
  },
);
