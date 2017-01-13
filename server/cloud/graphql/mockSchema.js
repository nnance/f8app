import {addMockFunctionsToSchema, makeExecutableSchema} from 'graphql-tools';
import typeDefs from './typeDefs';
import mocks from './mocks';

let MockSchema = makeExecutableSchema({
  typeDefs,
  resolvers: mocks
});

addMockFunctionsToSchema({schema: MockSchema, preserveResolvers: true});

module.exports = MockSchema;
