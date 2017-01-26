import './casual-config';
import casual from 'casual';
import {MockList} from 'graphql-tools';

const preview = async (rootValue, args, {request}) => {
  let uri = await casual.clog_preview;
  if (!uri) {
    return null;
  }
  return `http://${request.get('host')}${uri}`;
}

const mocks = {
  Date: () => new Date(casual.moment),
  User: () => ({
    name: casual.full_name,
    async profilePicture(rootValue, args, {request}) {
      let uri = await casual.profilePicture;
      return `http://${request.get('host')}${uri}`;
    }
  }),
  Editor: () => ({
    name: casual.full_name,
    async profilePicture(rootValue, args, {request}) {
      let uri = await casual.profilePicture;
      return `http://${request.get('host')}${uri}`;
    }
  }),
  Tag: () => ({
    name: casual.word,
    trendingClogs: () => new MockList(30)
  }),
  Clog: () => ({
    id: casual.positive_int(10000000),
    title: async () => {
      // await new Promise(resolve => {
      //   setTimeout(resolve, 1000)
      // })
      return casual.title
    },
    async cover(rootValue, args, {request}) {
      let uri = await casual.clog_cover;
      if (!uri) {
        return null;
      }
      return `http://${request.get('host')}${uri}`;
    },
    preview,
    category: casual.clog_category,
    review: casual.sentences(n = 20),
    followerCount: casual.integer(from=0, to=10000),
    followersYouKnow: () => new MockList(casual.integer(from=0, to=25)),
    likeCount: casual.positive_int(10000),
    viewCount: casual.positive_int(10000),
    episodes: () => new MockList(20)
  }),
  Episode: () => ({
    no: casual.positive_int(10),
    title: casual.title,
    preview,
    viewCount: casual.positive_int(10000),
    likeCount: casual.positive_int(100000),
    commentCount: casual.positive_int(1000000),
    createdAt: () => new Date(casual.moment)
  }),
  CategoryDetail: () => ({
    category: casual.clog_category,
    editors: () => new MockList(20)
  }),
  Query: () => ({
    favoriteTags: () => new MockList(3),
    heroBanners: () => new MockList(5),
    clogs: () => new MockList(50)
  })
};

export default mocks;
