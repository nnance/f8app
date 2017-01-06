'use strict';

import gql from 'graphql-tag';
import apollo from '../store/apollo';

import type { ThunkAction } from './types';

import loadApolloQuery from './apollo';


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

  const actions = ['LOADED_PAGES', 'LOADED_MAPS', 'LOADED_FAQS'];
  return loadApolloQuery(actions, query);
}

module.exports = {
  loadViewer
};
