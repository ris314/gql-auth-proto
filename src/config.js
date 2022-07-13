export const FIBONACCI_SERVER_PORT = process.env.FIBONACCI_SERVER_PORT ?? 7070;
export const FIBONACCI_PATH = `/${process.env.FIBONACCI_PATH ?? 'fibonacci-sequence'}`;
export const FIBONACCI_URL = process.env.FIBONACCI_URL ?? `http://localhost:${FIBONACCI_SERVER_PORT}${FIBONACCI_PATH}`;

export const GQL_SERVER_PORT = process.env.GQL_SERVER_PORT ?? 8080;
export const GQL_PATH = `/${process.env.GQL_PATH ?? 'graphql'}`;

export const GQL_GATEWAY_PORT = process.env.GQL_SERVER_PORT ?? 9090;
export const GQL_GATEWAY_PATH = `/${process.env.GQL_PATH ?? 'gateway'}`;
export const GQL_GATEWAY_ORIGIN_ID = process.env.GQL_GATEWAY_ORIGIN_ID ?? 'd5cee0df-f992-4bd9-92a3-095dc70957b5';

export const REQUEST_TIMEOUT = 1000 * 60 * 15; // 15 minutes
