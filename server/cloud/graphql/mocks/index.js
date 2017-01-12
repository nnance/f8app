import './casual-config';
import casual from 'casual';
import {MockList} from 'graphql-tools';

const mocks = {
  User: {
    name() {
      return casual.full_name;
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
    }
  },
  Query: {
    trending() {
      return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    }
  }
};

export default mocks;
