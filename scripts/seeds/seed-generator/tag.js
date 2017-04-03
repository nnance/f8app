import _ from 'lodash';
import { writeSeed, casual } from '../helpers';

export async function generate() {
  const data = _.range(20).map(() => ({
    _id: casual.objectId,
    name: casual.title,
  }));
  return writeSeed('tag', data);
}
