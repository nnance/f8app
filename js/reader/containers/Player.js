import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { createReducerOnReply } from 'graphql-comment/src/react-native';

import { filterClogId, filterEpisodeId, withAddEpisodeBookmark, withRemoveBookmarks, updateMeBookmarksReduer } from '../../models/bookmark';
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
    const reducerReply = createReducerOnReply(id, (previousResult, reply) => {
      return {
        ...previousResult,
        episode: {
          ...previousResult.episode,
          commentCount: previousResult.episode.commentCount + 1,
        },
      };
    });
    return reducerReply(updateMeBookmarksReduer(previousResult, action), action);
  },
});

const withData = graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions,
});

export default withData(withRemoveBookmarks(withAddEpisodeBookmark(Player)));
