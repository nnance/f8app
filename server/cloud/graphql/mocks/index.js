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
    },
    cover() {
      return `http://i99.photobucket.com/albums/l288/korewa13th/kore%20blog/noom.jpg`;
    },
    category() {
      return 'D'
    }
  },
  Query: {
    trending() {
      return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    }
  }
};

export default mocks;
