import { loadSeed, writeSeed, genArray, casual } from '../helpers';

const sequential = require('promise-sequential');

export function generate() {
  const clogs = loadSeed('clog');
  return sequential(genArray(clogs, clogs.length - 1).map(clog => () => ({
    _id: casual.objectId,
    clogId: clog._id,
    category: clog.category,
  })))
  .then(result => writeSeed('trending', result));
}
