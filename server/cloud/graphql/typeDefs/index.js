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
    id: ID!
    name: String!
    profilePicture: String
  }

  type Editor {
    id: ID!
    name: String!
    profilePicture: String
    followingCount: Int!
    following: [User!]!
    clogCount: Int!
    isFollowing: Boolean!
    clogs: [Clog!]!
  }

  type Episode {
    id: ID!
    no: Int!
    title: String
    preview: String
    viewCount: Int!
    likeCount: Int!
    createdAt: Date!
    comments: [Comment!]!
    commentCount: Int!
  }

  type Comment {
    user: User!
    comment: String!
  }

  type Clog {
    id: ID!
    title: String!
    episodes: [Episode!]!
    preview: String
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
    comments: [Comment!]!
    commentCount: Int!
    tags: [Tag!]!
    createdAt: Date!
  }

  input ClogFilterInput {
    category: CATEGORY
    tag: ID
    limit: Int
  }

  input EditorFilterInput {
    category: CATEGORY
    limit: Int
  }

  type CategoryDetail {
    category: CATEGORY!
    recommendedClogs: [Clog!]!
    editors: [Editor!]!
  }

  type Query {
    recommendedClog: Clog!
    favoriteTags: [Tag!]!
    heroBanners: [Clog!]!
    categoryDetail(category: CATEGORY!): CategoryDetail!
    clogs(filter: ClogFilterInput, orderBy: CLOG_SORTING): [Clog!]!
    clog(id: ID!): Clog!
    episode(id: ID!): Episode!
    editor(id: ID!): Editor!
    editors(filter: EditorFilterInput): [Editor!]!
  }
`;

export default schema;
