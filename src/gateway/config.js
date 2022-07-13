import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { GQL_GATEWAY_ORIGIN_ID } from '../config.js';
import { printGatewayEvent } from '../utils/print.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const supergraphSdl = readFileSync(
  resolve(__dirname, './schema.gql')
).toString();

export { context } from '../gql/config.js';

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ context, request }) {
    printGatewayEvent('gateway willSendRequest');

    request.http.headers.set('GQL-Gateway-Origin-Id', GQL_GATEWAY_ORIGIN_ID);

    request.context = context;
  }
}

export const buildService = ({ url }) => new AuthenticatedDataSource({ url });
