import {graphql} from 'graphql';
import {MockSchema} from '../../server/graphql/schema';

export default function(query) {
  return graphql(MockSchema, query.loc.source.body, null, {
    request: {
      get: jest.fn(() => 'localhost')
    }
  });
}
