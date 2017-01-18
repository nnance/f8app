import {graphql} from 'graphql';
import casual from 'casual';
let MockSchema = require('../../server/cloud/graphql/mockSchema');

export default function(query, options = {}) {
  casual.seed(1);
  return graphql(MockSchema, query.loc.source.body, null, {
    request: {
      get: jest.fn(() => 'localhost')
    }
  }, options.variables);
}
