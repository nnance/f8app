import { casual, loadSeed, writeSeed } from '../helpers';

export function generate() {
  const clogs = loadSeed('clog');
  const feedClogs = clogs.map(clog => ({
    _id: casual.objectId,
    authorId: clog.authorId,
    clogId: clog._id,
    createdAt: clog.createdAt,
  }));
  writeSeed('feed', feedClogs);
}
