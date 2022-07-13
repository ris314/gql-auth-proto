import { ApolloServer } from 'apollo-server-express';
import { ApolloGateway } from '@apollo/gateway';
import express from 'express';

import { buildService, context, supergraphSdl } from './config.js';
import { GQL_GATEWAY_PORT, GQL_GATEWAY_PATH, REQUEST_TIMEOUT } from '../config.js';

const app = express();

const gateway = new ApolloGateway({
  supergraphSdl,
  buildService
});

const apolloServer = new ApolloServer({
  gateway,
  context
});

apolloServer.start()
  .then(() => {
    apolloServer.applyMiddleware({
      app,
      path: GQL_GATEWAY_PATH
    });

    app.listen(
      { port: GQL_GATEWAY_PORT },
      () => console.log(`🚀🚀🚀 gql gateway running at localhost:${GQL_GATEWAY_PORT}${GQL_GATEWAY_PATH}`)
    ).setTimeout(
      REQUEST_TIMEOUT
    );
  });
