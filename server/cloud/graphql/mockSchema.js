import {addMockFunctionsToSchema, makeExecutableSchema} from 'graphql-tools';
import typeDefs from './typeDefs';
import mocks from './mocks';

let MockSchema = makeExecutableSchema({
  typeDefs
});

addMockFunctionsToSchema({schema: MockSchema, preserveResolvers: true, mocks});

module.exports = MockSchema;
