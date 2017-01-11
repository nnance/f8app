const schema = `
  enum Category {
    D
    G
    M
    N
  }

  type User {
    name: String!
  }

  type Clog {
    title: String!
    cover: String
    category: Category!
    author: User!
  }

  type Query {
    trending: [Clog]!
  }
`;

export default schema;
