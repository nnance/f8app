import _ from 'lodash';

import { casual, loadSeed, preview, writeSeed } from '../helpers';

const sequential = require('promise-sequential');

export async function generate() {
  const clogs = loadSeed('clog');
  const dumpClog = clogs[0];
  const dumpEpisode = {
    _id: '58b95c905923032426ceb6ce',
    clogId: dumpClog._id,
    no: 99,
    title: casual.title,
    thumbnailImage: await preview(),
    commentIds: [],
    viewCount: casual.integer(0, 3000),
    createdAt: casual.date,
    data: null,
  };
  const episodes = await sequential(
    clogs.map(clog => () =>
      sequential(
        _.range(casual.integer(0, 40)).map(idx => async () => ({
          _id: casual.objectId,
          clogId: clog._id,
          no: idx + 1,
          title: casual.title,
          thumbnailImage: await preview(),
          commentIds: [],
          viewCount: casual.integer(0, 3000),
          createdAt: casual.date,
          data: null,
        })),
      ).then((eps) => {
        clog.episodeIds = [];
        eps.sort((a, b) => Number(a.no) - Number(b.no)).forEach((ep) => {
          clog.episodeIds.push(ep._id);
        });
        return eps;
      }),
    ),
  )
  .then(result => [].concat(...result));
  writeSeed('episode', [dumpEpisode, ...episodes]);
  writeSeed('clog', clogs);
}
