import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';

import { withRemoveEpisodeBookmarks, filterClogId } from '../../../models/bookmark';

import BookmarkDetail from '../components/BookmarkDetail';
import { query as BookmarkScreenQuery } from '../containers/BookmarkScreen';

export const query = gql`
  query BookmarkDetail($id: MongoID!){
    clog(filter: { _id: $id }) {
      ...BookmarkDetailClog
    }
    me {
      id
      episodeBookmarks {
        ...BookmarkDetailEpisodeBookmark
      }
    }
  }
  ${BookmarkDetail.fragments.clog}
  ${BookmarkDetail.fragments.episodeBookmark}
`;

const mapQueryToProps = ({ data }) => {
  return {
    clog: data.clog,
    episodeBookmarks: data.loading || data.error ? [] : filterClogId(data.me.episodeBookmarks, data.clog.id),
  };
};

// export const mapPropsToOptions = ({ id }) => ({
//   variables: {
//     id,
//   },
//   reducer: (previousResult, action, variables) => {
//     if (action.type === 'APOLLO_MUTATION_RESULT' && action.operationName === 'removeEpisodeBookmarks'){
//       if (action.result.data.removeEpisodeBookmarks && previousResult) {
//         const removeEpisodeBookmarks = action.result.data.removeEpisodeBookmarks;
//         const removedEpisodeBookmarks = removeEpisodeBookmarks.removedEpisodeBookmarks;
//         return {
//           ...previousResult,
//           me: {
//             ...previousResult.me,
//             episodeBookmarks: previousResult.me.episodeBookmarks.filter(bookmark => !_.find(removedEpisodeBookmarks, _bookmark => _bookmark.id === bookmark.id)),
//           }
//         };
//       }
//     }
//     return previousResult;
//   },
// });

const withData = graphql(
  query,
  {
    props: mapQueryToProps,
    // options: mapPropsToOptions,
  },
);

export default withRemoveEpisodeBookmarks(withData(BookmarkDetail));
