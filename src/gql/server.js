import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { GQL_PATH, GQL_SERVER_PORT, REQUEST_TIMEOUT } from '../config.js';
import { context, resolvers, typeDefs } from './config.js';

const app = express();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

apolloServer.start()
  .then(() => {
    apolloServer.applyMiddleware({
      app,
      path: GQL_PATH
    });

    app.listen(
      { port: GQL_SERVER_PORT },
      () => console.log(`🚀🚀🚀 gql server running at localhost:${GQL_SERVER_PORT}${GQL_PATH}`)
    ).setTimeout(
      REQUEST_TIMEOUT
    );
  });
