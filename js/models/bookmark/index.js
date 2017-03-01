import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';

export const filterClogId =
  (bookmarks, clogId) => bookmarks.filter(bookmark => bookmark.clogId === clogId);
export const filterEpisodeId =
  (bookmarks, episodeId) => bookmarks.filter(bookmark => bookmark.episodeId === episodeId);

export const updateMeBookmarksReduer = function (previousResult, action) {
  if (action.type === 'APOLLO_MUTATION_RESULT' && action.operationName === 'removeBookmarks') {
    if (!previousResult.me || !action.result
      || !action.result.data || !action.result.data.removeBookmarks) {
      return previousResult;
    }
    const removeBookmarks = action.result.data.removeBookmarks;
    return {
      ...previousResult,
      me: {
        ...previousResult.me,
        bookmarks: previousResult.me.bookmarks
          .filter(bookmark =>
            !_.find(removeBookmarks.removedBookmarks,
              removedBookmark => removedBookmark.id === bookmark.id,
            ),
          ),
      },
    };
  }
  if (action.type === 'APOLLO_MUTATION_RESULT' && action.operationName === 'addEpisodeBookmark') {
    if (!previousResult.me || !action.result
      || !action.result.data || !action.result.data.addEpisodeBookmark) {
      return previousResult;
    }
    const addEpisodeBookmark = action.result.data.addEpisodeBookmark;
    return {
      ...previousResult,
      me: {
        ...previousResult.me,
        bookmarks: [...previousResult.me.bookmarks, addEpisodeBookmark.addedBookmark],
      },
    };
  }
  return previousResult;
};

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
    props: ({ mutate }) => ({
      removeBookmarks: ids => mutate({
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
      }),
    }),
  },
);

export const withAddEpisodeBookmark = graphql(
  gql`
    mutation addEpisodeBookmark($episodeId: MongoID!){
      addEpisodeBookmark(episodeId: $episodeId) {
        addedBookmark {
          id
          url
          clogId
          episodeId
          clog {
            id
          }
          episode {
            id
          }
        }
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      addEpisodeBookmark: episode => mutate({
        variables: {
          episodeId: episode.id,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          addEpisodeBookmark: {
            __typename: 'AddBookmarksResult',
            addedBookmark: {
              __typename: 'Bookmark',
              url: `player?id=${episode.id}`,
              id: `player?id=${episode.id}`,
              clogId: episode.clogId,
              episodeId: episode.id,
              episode: {
                __typename: 'Episode',
                id: episode.id,
              },
              clog: {
                __typename: 'Clog',
                id: episode.clogId,
              },
            },
          },
        },
      }),
    }),
  },
);
