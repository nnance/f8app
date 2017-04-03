import casual from 'casual';
import _ from 'lodash';

import { writeSeed, loadSeedId, cover, preview, genArray } from '../helpers';

const sequential = require('promise-sequential');

export async function generate() {
  const authorIds = loadSeedId('author');
  const tagIds = loadSeedId('tag');
  const authorId = authorIds[casual.integer(0, authorIds.length - 1)];
  const dumpClog = {
    _id: '58a6e85138cbdaba481a7b59',
    title: casual.title,
    episodeIds: [],
    thumbnailImage: await preview(),
    coverImage: await cover(),
    authorId,
    commentIds: [],
    tagIds: genArray(tagIds, 5),
    category: await casual.clog_category,
    synopsis: casual.sentences(20),
    viewCount: casual.positive_int(10000),
    createdAt: casual.date,
  };
  const clogs = await sequential(_.range(100).map(() => async () => {
    const authorId = authorIds[casual.integer(0, authorIds.length - 1)];
    return {
      _id: casual.objectId,
      title: casual.title,
      episodeIds: [],
      thumbnailImage: await preview(),
      coverImage: await cover(),
      authorId,
      commentIds: [],
      tagIds: genArray(tagIds, 5),
      category: await casual.clog_category,
      synopsis: casual.sentences(20),
      viewCount: casual.positive_int(10000),
      createdAt: casual.date,
    };
    // .then(clog => {
    //   return genClogFollower(users, clog).then(() => clog);
    // });
  }));
  return writeSeed('clog', [].concat([dumpClog], clogs));
}
