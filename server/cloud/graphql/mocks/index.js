import './casual-config';
import casual from 'casual';
import {MockList} from 'graphql-tools';

const mocks = {
  Date: () => new Date(casual.moment),
  User: () => ({
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
    title: casual.title,
    async cover(rootValue, args, {request}) {
      let uri = await casual.clog_cover;
      return `http://${request.get('host')}${uri}`;
    },
    category: casual.clog_category,
    review: casual.sentences(n = 20),
    followerCount: casual.integer(from=0, to=10000),
    followersYouKnow: () => new MockList(casual.integer(from=0, to=25)),
    likeCount: casual.integer(from = 0, to = 10000)
  }),
  CategoryDetail: () => ({
    category() {
      return casual.clog_category;
    },
    trendingClogs() {
      return new MockList(20);
    },
    editors() {
      return new MockList(20);
    }
  }),
  Query: () => ({
    trendingClogs: () => new MockList(20),
    favoriteTags: () => new MockList(3),
    heroBanners: () => new MockList(5)
  })
};

export default mocks;
