import { loadSeed, writeSeed, genArray } from '../helpers';

const sequential = require('promise-sequential');

export function generate() {
  const clogs = loadSeed('clog');
  return sequential(genArray(clogs, clogs.length - 1).map(clog => () => ({
    clogId: clog._id,
    category: clog.category,
  })))
  .then(result => writeSeed('trending', result));
}
