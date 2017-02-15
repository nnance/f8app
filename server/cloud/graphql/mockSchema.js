import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools';
import { getSchema, getModels, getFields } from '@risingstack/graffiti-mongoose';
import _ from 'lodash';
import { GraphQLString } from 'graphql';

import typeDefs from './typeDefs';
import mocks from './mocks';
import scalars from './scalars';
import * as models from './models';

const MockSchema = makeExecutableSchema({
  typeDefs,
  resolvers: scalars,
});

addMockFunctionsToSchema({ schema: MockSchema, preserveResolvers: true, mocks });

// module.exports = MockSchema;
const allModel = _.keys(models).map(key => models[key]);
const schema = getSchema(allModel);
addMockFunctionsToSchema({ schema, mocks });
module.exports = schema;
