import _ from 'lodash';

import { writeSeed, casual, profile } from '../helpers';

const sequential = require('promise-sequential');

export async function generate() {
  return sequential(_.range(50).map(() => async () => {
    const author = {
      _id: casual.objectId,
      name: casual.name,
      profilePicture: await profile(),
      followingCount: casual.positive_int(1000),
    };
    // await sequential(genArray(users, 1000).map(user => () => models.EditorFollower.create({
    //   _id: casual.objectId,
    //   userId: user,
    //   editorId: editor,
    // })));
    return author;
  }))
  .then(authors => writeSeed('author', authors));
}
