import './casual-config';
import casual from 'casual';
import {MockList} from 'graphql-tools';

const mocks = {
  User: () => ({
    name() {
      return casual.full_name;
    },
    async profilePicture(rootValue, args, {request}) {
      let uri = await casual.profilePicture;
      return `http://${request.get('host')}${uri}`;
    }
  }),
  Tag: () => ({
    name() {
      return casual.word;
    },
    trendingClogs() {
      return new MockList(30);
    }
  }),
  Clog: () => ({
    title() {
      return casual.title;
    },
    async cover(rootValue, args, {request}) {
      let uri = await casual.clog_cover;
      return `http://${request.get('host')}${uri}`;
    },
    category() {
      return casual.clog_category;
    },
    review() {
      return casual.sentences(n = 20)
    },
    followerCount() {
      return casual.integer(from=0, to=10000);
    },
    followersYouKnow() {
      return new MockList(casual.integer(from=0, to=25));
    }
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
    trendingClogs() {
      return new MockList(20);
    },
    favoriteTags() {
      return new MockList(3);
    },
    heroBanners() {
      return new MockList(5);
    }
  })
};

export default mocks;
