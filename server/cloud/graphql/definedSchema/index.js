const schema = `
  type Clog {
    title: String!
  }

  type Query {
    trending: [Clog]!
  }

  schema {
    query: Query
  }
`;

export default schema;
