const schema = `
  enum Category {
    D
    M
    G
    N
  }

  type Tag {
    name: String!
    trendingClogs: [Clog!]!
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
    followers: [User!]!
    followerCount: Int!
    followersYouKnow: [User!]!
    likes: [User!]!
    likeCount: Int!
    viewCount: Int!
    tags: [Tag!]!
  }

  type CategoryDetail {
    category: Category!
    recommendedClogs: [Clog!]!
    trendingClogs: [Clog!]!
    recentlyClogs: [Clog!]!
    editors: [User!]!
  }

  type Query {
    trendingClogs(category: Category): [Clog!]!
    recommendedClog: Clog!
    favoriteTags: [Tag!]!
    heroBanners: [Clog!]!
    categoryDetail(category: Category!): CategoryDetail!
  }
`;

export default schema;
