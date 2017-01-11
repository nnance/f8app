const schema = `
  type User {
    name: String!
  }

  type Clog {
    title: String!
    author: User!
  }

  type Query {
    trending: [Clog]!
  }
`;

export default schema;
