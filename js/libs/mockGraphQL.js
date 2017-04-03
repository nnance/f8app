// import { graphql } from 'graphql';
// import casual from 'casual';
import _ from 'lodash';

const client = require('../store/apollo');

// const MockSchema = require('../../server/cloud/graphql/mockSchema');

if (process.env.NODE_ENV !== 'test') {
  throw new Error('for test only');
}

// export default function (query, options = {}) {
//   casual.seed(1);
//   return graphql(MockSchema, query.loc.source.body, null, {
//     request: {
//       get: jest.fn(() => 'localhost'),
//     },
//   }, options.variables);
// }

export default function (query, options) {
  return client.query({
    query,
    ...options,
  });
}
