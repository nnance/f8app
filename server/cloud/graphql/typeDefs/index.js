const schema = `
  enum CATEGORY {
    D
    M
    G
    N
  }

  enum CLOG_SORTING {
    TRENDING
    RECENTLY
  }

  scalar Date

  type Tag {
    id: ID!
    name: String!
    trendingClogs: [Clog!]!
  }

  type User {
    name: String!
    profilePicture: String
  }

  type Editor {
    name: String!
    profilePicture: String
  }

  type Clog {
    id: ID!
    title: String!
    cover: String
    category: CATEGORY!
    author: Editor!
    review: String!
    followers: [User!]!
    followerCount: Int!
    followersYouKnow: [User!]!
    likes: [User!]!
    likeCount: Int!
    viewCount: Int!
    tags: [Tag!]!
    createdAt: Date!
  }

  input QueryClogOption {
    tag: ID
    limit: Int
    sortBy: CLOG_SORTING
  }

  type CategoryDetail {
    category: CATEGORY!
    clogs(option: QueryClogOption): [Clog!]!
    recommendedClogs: [Clog!]!
    editors: [Editor!]!
  }

  type Query {
    recommendedClog: Clog!
    favoriteTags: [Tag!]!
    heroBanners: [Clog!]!
    categoryDetail(category: CATEGORY!): CategoryDetail!
    clogs(option: QueryClogOption): [Clog!]!
    clog(id: ID!): Clog!
  }
`;

export default schema;
