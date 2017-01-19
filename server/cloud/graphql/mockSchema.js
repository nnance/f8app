import {addMockFunctionsToSchema, makeExecutableSchema} from 'graphql-tools';
import typeDefs from './typeDefs';
import mocks from './mocks';
import scalars from './scalars';

let MockSchema = makeExecutableSchema({
  typeDefs,
  resolvers: scalars
});

addMockFunctionsToSchema({schema: MockSchema, preserveResolvers: true, mocks});

module.exports = MockSchema;
