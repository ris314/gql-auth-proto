import { readFileSync } from 'fs';
import { buildSchema, parse, TypeInfo, visit, visitWithTypeInfo } from 'graphql';
import _ from 'lodash';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { getAuthorizationScope } from '../auth/authorization.js';
import { getUser } from '../auth/authentication.js';

import { GQL_GATEWAY_ORIGIN_ID } from '../config.js';
import { printGatewayEvent } from '../utils/print.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export { default as resolvers } from './resolvers.js';

export const typeDefs = readFileSync(
  resolve(__dirname, 'schema.gql')
).toString();

const typeInfo = new TypeInfo(buildSchema(typeDefs));

let requestNumber = 0;

const logRequest = () =>
  void console.log(`\n\n\n--------------------- request ${++requestNumber} ---------------------`);

/**
   * The purpose of this function is to demonstrate that we can identify relevant types within
   * the GQL query before any of the resolvers are invoked, so that we can optimize requests to the
   * authorization service. In order to reduce bottlenecks, both in the network payload size and in
   * the authorization service processing, we may want to ask only auth context questions relevant
   * to the entities included in the query.
   */
const printTypesInQuery = queryString => {
  const types = [];

  visit(
    parse(queryString),
    visitWithTypeInfo(
      typeInfo,
      {
        Field: {
          enter() {
            types.push(typeInfo.getType());
          }
        }
      }
    )
  );

  console.log(`types in the gql query: \n${_.uniq(types).join('\n')}`);
};

export const context = async ({ req }) => {
  logRequest();

  if (req.header('GQL-Gateway-Origin-Id') === GQL_GATEWAY_ORIGIN_ID && req.body.context) {
    printGatewayEvent('context supplied by gateway');

    return req.body.context;
  }

  printTypesInQuery(req.body.query);

  const user = await getUser({
    jwt: req.headers.authorization
  });

  const authScope = await getAuthorizationScope({ email: user.email });

  return { user, authScope };
};
