'use strict';

import ApolloClient, { createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface('http://localhost:8080/graphql');

const client = new ApolloClient({
  networkInterface,
});

module.exports = client;
