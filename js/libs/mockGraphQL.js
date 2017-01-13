import {graphql} from 'graphql';
let MockSchema = require('../../server/cloud/graphql/mockSchema');

export default function(query) {
  return graphql(MockSchema, query.loc.source.body, null, {
    request: {
      get: jest.fn(() => 'localhost')
    }
  });
}
