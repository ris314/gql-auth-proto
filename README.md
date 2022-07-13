# GQL Auth - Prototype

This repository is an exploration of the GraphQL network request process flow as it relates to
determining the auth context and supplying it to downstream resolvers.

Please see [scope](./docs/scope.md) and [observations](./docs/observations.md) for a detailed narrative.

## Dependencies
* [Node](https://nodejs.org/en/)
* [Rover CLI](https://www.apollographql.com/docs/rover/getting-started/)
<sup>* Optional. Used if you want to make changes to the GQL schema and update the gateway's super-graph.</sup>

## Installing
Clone the repo locally. Then, within your terminal change the directory to `gql-auth-proto` and run:
```
npm install
``` 

## Services
- [Fibonacci Sequence](#fibonacci-sequence)
- [GQL server](#gql-server)
- [GQL gateway](#gql-gateway)

To run all services, within the project directory in the terminal:
```
npm start
```

### Fibonacci Sequence
Simple [server](./src/distributed-services/fibonacci-sequence.js) with a single endpoint listening
for POST requests.

### GQL server
GraphQL server with a straightforward [schema](./src/gql/schema.gql) and
[implementation](./src/gql/server.js).

_Dependency: [Fibonacci Sequence](#fibonacci-sequence)_

### GQL gateway
Exposes [GQL server](#gql-server) as a subgraph. Please note that
[gateway implementation](./src/gateway/server.js) and
[configuration](./src/gateway/schema-config.yaml) are purposefully made simple without introducing
additional subgraphs to minimize scope and retain the focus on the request process flow investigation.

_Dependency: [GQL server](#gql-server)_

## Usage
With the services running, you can use Apollo studio to send queries to either
[GQL server](#gql-server) or [GQL gateway](#gql-gateway).

You must supply the `Authorization` header in order to authenticate and authorize requests.

In order to simulate an authorized user making requests, you can use the following:

|                          | purpose                                                       |
| ------------------------ | ------------------------------------------------------------- |
| `Authorization`: none    | simulates authenticated user without rights to view any data  |
| `Authorization`: limited | simulates user with rights to view a subset of available data |
| `Authorization`: super   | simulates user with full data read permissions                |

Please see the [auth directory](./src/auth/) to understand more.

### Note on console logs
Each service logs color coded request processing events to the console. This mechanism is used to
demonstrate the execution flow and parameters supplied to invoked functions within the execution
sequence.
