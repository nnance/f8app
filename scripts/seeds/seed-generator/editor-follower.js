import { writeSeed, loadSeedId, genArray, casual } from '../helpers';

export async function generate() {
  const userIds = loadSeedId('user');
  const authorIds = loadSeedId('author');
  let result = [];
  for (let i = 0; i < authorIds.length; i += 1) {
    const authorId = authorIds[i];
    result = [...result, ...genArray(userIds, 1000).map(userId => ({
      _id: casual.objectId,
      userId,
      editorId: authorId,
    }))];
  }
  writeSeed('editor-follower', result);
}
