'use strict';

const logError = require('logError');

export default function loadApolloQuery(type, query) {
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
