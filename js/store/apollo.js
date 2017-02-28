

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import env from '../env';

const networkInterface = createNetworkInterface({ uri: `${env.serverURL}/graphql` });

const client = new ApolloClient({
  networkInterface,
  addTypename: true,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  },
});

module.exports = client;
