import casual from 'casual';
import {MockList} from 'graphql-tools';

casual.seed(1);

const mocks = {
  User: {
    name() {
      return casual.full_name;
    }
  },
  Clog: {
    title() {
      return casual.title;
    }
  },
  Query: {
    trending() {
      return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    }
  }
};

export default mocks;
