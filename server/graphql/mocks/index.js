import './casual-config';
import casual from 'casual';
import {MockList} from 'graphql-tools';

const mocks = {
  User: {
    name() {
      return casual.full_name;
    }
  },
  Tag: {
    name() {
      return casual.word;
    },
    trending() {
      return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ,1];
    }
  },
  Clog: {
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
    }
  },
  Query: {
    trending() {
      return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    },
    favoriteTags() {
      return [1, 1, 1];
    },
    heroBanners() {
      return [1, 1, 1, 1, 1, 1, 1, 1];
    }
  }
};

export default mocks;
