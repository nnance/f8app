const schema = `
  enum Category {
    D
    M
    G
    N
  }

  type Tag {
    name: String!
    trending: [Clog!]!
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
    tags: [Tag!]!
  }

  type Query {
    trending: [Clog!]!
    topClog: Clog!
    favoriteTags: [Tag!]!
    heroBanners: [Clog!]!
  }
`;

export default schema;
