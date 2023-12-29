export const schemaQuery = `query IntrospectionQuery {
  __schema {
    queryType {
      name
    }
    types {
      kind
      name
      description
      fields {
        name
        description
      }
    }
  }
}`;
