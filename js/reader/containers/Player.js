import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { createReducerOnReply, createReducerOnDelete } from 'graphql-comment/src/react-native';

import { filterClogId, filterEpisodeId, withAddEpisodeBookmark, withRemoveBookmarks, updateMeBookmarksReduer, fragments } from '../../models/bookmark';
import Player from '../components/Player';

export const query = gql`
  query PlayerQuery($id: MongoID!){
    episode(filter: { _id: $id }) {
      ...PlayerEpisode
    }
    me {
      id
      bookmarks {
        ...PlayerBookmark
      }
    }
  }
  ${Player.fragments.episode}
  ${Player.fragments.bookmark}
  ${fragments.AddedBookmarkEpisode}
`;

export const mapQueryToProps = ({ data }) => {
  const { episode, error, loading, me } = data;
  if (error) {
    console.error('graphql error: ', error);
  }
  let episodeBookmarks;
  if (episode && me) {
    episodeBookmarks = filterEpisodeId(filterClogId(me.bookmarks, episode.clogId), episode.id);
  }

  return {
    loading,
    episode: episode || {},
    episodeBookmark: episodeBookmarks ? episodeBookmarks[0] : null,
    refetch: data.refetch,
  };
};
export const mapPropsToOptions = ({ id }) => ({
  variables: {
    id,
  },
  reducer: (previousResult, action) => {
    const deleteReducer = createReducerOnDelete(id, (previousResult) => {
      return {
        ...previousResult,
        episode: {
          ...previousResult.episode,
          commentCount: previousResult.episode.commentCount - 1,
        },
      };
    });
    const replyReducer = createReducerOnReply(id, (previousResult, reply) => {
      return {
        ...previousResult,
        episode: {
          ...previousResult.episode,
          commentCount: previousResult.episode.commentCount + 1,
        },
      };
    });
    return deleteReducer(replyReducer(updateMeBookmarksReduer(previousResult, action), action), action);
  },
});

const withData = graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions,
});

export default withData(withRemoveBookmarks(withAddEpisodeBookmark(Player)));
