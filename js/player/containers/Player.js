import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Player from '../components/Player';
import { query as BookmarkScreenQuery } from '../../tabs/profile/containers/BookmarkScreen';
import { query as BookmarkDetailQuery } from '../../tabs/profile/containers/BookmarkDetail';

export const query = gql`
  query PlayerQuery($id: MongoID!){
    episode(filter: { _id: $id }) {
      ...Player
    }
  }
  ${Player.fragments.episode}
`;

export const mapQueryToProps = ({ data }) => {
  const { episode, error, loading } = data;
  if (error) {
    console.error('graphql error: ', error);
  }
  return {
    loading,
    episode: episode || {},
  };
};
export const mapPropsToOptions = ({ id }) => ({
  variables: {
    id,
  },
});

const withAddMutations = graphql(
  gql`
    mutation addBookmark($clogId: MongoID!, $episodeId: MongoID!){
      addBookmark(clogId: $clogId, episodeId: $episodeId) {
        id
      }
    }
  `,
  {
    props: ({ ownProps, mutate }) => ({
      addBookmark: (clogId, episodeId) => {
        return mutate({
          variables: {
            clogId,
            episodeId,
          },
          updateQueries: {
            PlayerQuery: (prev, { mutationResult }) => {
              const bookmark = mutationResult.data.addBookmark;
              return {
                ...prev,
                episode: {
                  ...prev.episode,
                  episodeBookmark: bookmark,
                },
              };
            },
          },
          refetchQueries: [
            { query: BookmarkScreenQuery },
            {
              query: BookmarkDetailQuery,
              variables: {
                id: clogId,
              } 
            },
          ],
        });
      },
    }),
  },
);

const withRemoveMutations = graphql(
  gql`
    mutation removeBookmarks($id: MongoID!){
      removeBookmarks(_ids: [$id]) {
        removedBookmarks {
          id
        }
      }
    }
  `,
  {
    props: ({ ownProps, mutate }) => ({
      removeBookmark: (episode) => {
        return mutate({
          variables: {
            id: episode.episodeBookmark.id,
          },
          // optimisticResponse: {
          //   __typename: 'Mutation',
          //   removeBookmarks: {
          //     __typename: 'RemoveBookmarksResult',
          //     removedBookmarks: {
          //       __typename: 'Bookmark',
          //       id: null,
          //     },
          //   },
          // },
          updateQueries: {
            PlayerQuery: (prev) => {
              return {
                ...prev,
                episode: {
                  ...prev.episode,
                  episodeBookmark: null,
                },
              };
            },
          },
          refetchQueries: [
            { query: BookmarkScreenQuery },
            {
              query: BookmarkDetailQuery,
              variables: {
                id: episode.clogId,
              } 
            },
          ],
        });
      },
    }),
  },
);

export default withRemoveMutations(withAddMutations(graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions,
})(Player)));
