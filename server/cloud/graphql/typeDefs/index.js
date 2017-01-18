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
    profilePicture: String
  }

  type Clog {
    id: Int!
    title: String!
    cover: String
    category: Category!
    author: User!
    review: String!
    tags: [Tag!]!
  }

  type CategoryDetail {
    category: Category!
    trendingClogs: [Clog!]!
    recentlyClogs: [Clog!]!
    editors: [User!]!
    followingCount: Int!
  }

  type Query {
    trending(category: Category): [Clog!]!
    topClog: Clog!
    favoriteTags: [Tag!]!
    heroBanners: [Clog!]!
    categoryDetail(category: Category!): CategoryDetail!
  }
`;

export default schema;
