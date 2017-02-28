import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import { filterClogId, filterEpisodeId, withAddEpisodeBookmark, withRemoveEpisodeBookmarks } from '../../models/bookmark';
import Player from '../components/Player';
import { query as BookmarkScreenQuery } from '../../tabs/profile/containers/BookmarkScreen';
import { query as BookmarkDetailQuery } from '../../tabs/profile/containers/BookmarkDetail';

export const query = gql`
  query PlayerQuery($id: MongoID!){
    episode(filter: { _id: $id }) {
      ...PlayerEpisode
    }
    me {
      id
      episodeBookmarks {
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
    episodeBookmarks = filterEpisodeId(filterClogId(me.episodeBookmarks, episode.clogId), episode.id);
  }

  return {
    loading,
    episode: episode || {},
    episodeBookmark: episodeBookmarks ? episodeBookmarks[0] : null,
  };
};
export const mapPropsToOptions = ({ id }) => ({
  variables: {
    id,
  },
});

export default withRemoveEpisodeBookmarks(withAddEpisodeBookmark(graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions,
})(Player)));
