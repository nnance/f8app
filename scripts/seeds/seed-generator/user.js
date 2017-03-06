import _ from 'lodash';

import { writeSeed, casual, profile } from '../helpers';

const sequential = require('promise-sequential');

export async function generate() {
  return sequential(_.range(2000).map(() => async () => ({
    _id: casual.objectId,
    name: casual.name,
    profilePicture: await profile(),
    bookmarks: [],
  })))
  .then(users => writeSeed('user', users));
}
