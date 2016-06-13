'use strict';

const logError = require('logError');
import gql from 'apollo-client/gql';
import apollo from '../store/apollo';

import type { ThunkAction } from './types';

function loadApolloQuery(type, query): ThunkAction {
  return (dispatch) => {
    return query.then((graphQLResult) => {
      const { errors, data } = graphQLResult;

      if (data) {
        if (Array.isArray(type)) {
          type.forEach(eachType => dispatch({type: eachType, data}));
        } else {
          dispatch({type, data});
        }
      }

      if (errors) {
        console.log('got some GraphQL execution errors', errors);
      }
    }).catch(logError);
  };
}

function loadViewer() : ThunkAction {
  const query = apollo.query({
    query: gql`
      query viewer {
        viewer {
          faqs {
            id
            question
            answer
          }
          pages {
            id
            title
            url
            logo
          }
          notifications {
            id
            text
            url
            time
          }
          maps{
            id
            name
            x1url
            x2url
            x3url
          }
        }
      }
    `,
    forceFetch: false
  });

  const actions = ['LOADED_PAGES', 'LOADED_MAPS', 'LOADED_FAQS', 'LOADED_NOTIFICATIONS'];
  return loadApolloQuery(actions, query);
}
/*
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
*/
module.exports = {
  loadViewer,
  // loadSessions,
};
