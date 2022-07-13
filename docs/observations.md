# Observations

## Auth scope
Apollo Server's [context](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#context)
function can be defined when instantiating the Apollo Server. The function will fire each time a
request is made to the GraphQL server, and it is the ideal place to determine the user and the auth
scope before any of the resolvers are fired. The output returned by the context function will
be supplied to each resolver at the third positional parameter as specified by the
[resolver signature](https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments).

Any request incoming to the Apollo Gateway can also be processed to construct the appropriate context
to be supplied to the individual subgraph services. For this, Apollo Gateway's
[buildService](https://www.apollographql.com/docs/federation/api/apollo-gateway#the-buildservice-function)
function is the appropriate asset to target, allowing for amendment of the request's body with the
`context` information.

When constructing the auth scope, it might be necessary to optimize the questions asked of the auth
service.
For instance, the auth service might handle authorization for many entities, but within
the incoming request query only a subset of entities might be relevant. To reduce processing and 
network payload size bottlenecks, it might be desired to determine which entities / types are
relevant within the incoming request. This can be accomplished by using assets exposed by the
`graphql` library.

## Resolver lineage
According to the
[resolver signature](https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments),
each resolver's first positional parameter is the output of its parent resolver. This information
may be useful in conditional processing within the child resolver, based on what the
parent yielded. If it is desired that a resolver gains information yielded throughout its ancestry resolver outputs, then each resolver in the lineage must propagate the parent output explicitly. 

## Authorization errors
By convention GraphQL resolvers yield response payloads with a consistent root, which contains `data`
and `errors` keys, allowing for response payloads to include as much data as possible and inform of
any errors that occurred.

### The user is authorized to access all data they requested.
The response object will include only the `data` key, which will be an object containing the
requested query keys, each of which will have values containing relevant data.

### The user is unauthorized to access the data they requested.
The response object will include the `data` key, which will be an object in which each query key
value will be `null`. No records will be present.
In addition, the `errors` key will be included as an array of error objects, providing more detail
for each authorization error that is captured in resolvers. 

### The user is authorized to access some of the data they requested.
The response object will include the `data` key, which will be an object containing partial records.
Resolvers that are able to authorize the request, will yield records manifested as values under the
relevant query keys within the `data` object. In contrast, query keys associated to resolvers that
are unable to authorize the request will have `null` values.
The `errors` key will be included as an array of error objects, providing more detail
for each error that was captured in resolvers that are unable to authorize the request.

_WARNING_: The use of non-null types, e.g. `Study!`, will not play nicely in partial data responses.
If a type is marked as non-null, and an authorization error occurs while resolving the relevant data,
then `data` will always be `null` even if other resolvers can successfully yield results.
