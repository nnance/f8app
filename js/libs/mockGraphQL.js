import {graphql} from 'graphql';
let MockSchema = require('../../server/cloud/graphql/mockSchema');

export default function(query, options = {}) {
  return graphql(MockSchema, query.loc.source.body, null, {
    request: {
      get: jest.fn(() => 'localhost')
    }
  }, options.variables);
}
