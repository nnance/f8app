'use strict';

import gql from 'graphql-tag';
import apollo from '../store/apollo';

import type { ThunkAction } from './types';

import loadApolloQuery from './apollo';


function loadSessions() : ThunkAction {
  const query = apollo.query({
    query: gql`
      query sessions {
        schedule {
          id
          title
          slug
          day
          startTime
          endTime
          location {
            id
            name
            x1url
            x2url
            x3url
          }
          description
          speakers {
            id
            name
            title
            picture
          }
          isAdded
        }
      }
    `,
    forceFetch: false
  });

  return loadApolloQuery('LOADED_SESSIONS', query);
}

module.exports = {
  loadSessions
};
