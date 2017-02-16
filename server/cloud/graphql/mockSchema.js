import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools';
import { getSchema, getModels, getFields } from '@risingstack/graffiti-mongoose';
import _ from 'lodash';
import composeWithMongoose from 'graphql-compose-mongoose';
import { GQC } from 'graphql-compose';

import typeDefs from './typeDefs';
import mocks from './mocks';
import scalars from './scalars';
import * as models from './models';

const schema = require('./schema');

// const MockSchema = makeExecutableSchema({
//   typeDefs,
//   resolvers: scalars,
// });

// addMockFunctionsToSchema({ schema: MockSchema, preserveResolvers: true, mocks });

module.exports = schema;
