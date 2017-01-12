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
    review: String!
  }

  type Query {
    trending: [Clog]!
    topClog: Clog!
  }
`;

export default schema;
