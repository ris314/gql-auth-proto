# Scope

## Understand dependencies
- [x] Meet with the authorization service team
- [x] Explore bulk authorization possibilities

## GraphQL server
- [x] Handle authentication at the server level - user is/is not authenticated to make a request
- [x] Define Apollo server context, which will output the auth context once per request

## Resolver flow
- [x] Confirm auth model works consistently for local resolvers, distributed resolvers, and Apollo federation
- [x] Confirm parent lineage with multiple levels (parent - grandparent - great grandparent)
- [x] Validate that the supplied auth context has expected structure
- [x] Validate that the auth context is constructed once per request before any resolvers are invoked
- [x] Handle authorization errors at the resolver level
- [x] Validate use case where user is authorized to access some of the data they requested
- [x] Validate use case where user is unauthorized to access the data they requested
- [x] Validate use case where user is authorized to access all data they requested
- [x] Validate that the auth context is supplied to resolvers

## Resolvers as FaaS
- [x] At high level, understand options for enforcing network security
