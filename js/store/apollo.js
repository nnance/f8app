'use strict';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import env from '../env';

const networkInterface = createNetworkInterface({uri: `${env.serverURL}/graphql`});

const client = new ApolloClient({
  networkInterface,
});

module.exports = client;
