import 'dotenv/config';
import casual from 'casual';
import _ from 'lodash';

import '../server/cloud/graphql/mocks/casual-config';
import { models } from '../server/cloud/graphql/models';

const preview = async () => {
  const uri = await casual.clog_preview;
  if (!uri) {
    return null;
  }
  return `http://localhost:8080${uri}`;
};

const cover = async () => {
  const uri = await casual.clog_cover;
  if (!uri) {
    return null;
  }
  return `http://localhost:8080${uri}`;
};

async function remove() {
  await models.Clog.remove({});
  await models.Editor.remove({});
}

async function genAuthors() {
  const authors = await Promise.all(_.range(50).map(async () => {
   return models.Editor.create({
      name: casual.name,
      profilePicture: `http://localhost:8080${await casual.profilePicture}`,
      followingCount: casual.positive_int(1000),
      clogIds: [],
    });
  }));
  return authors;
}

async function genClogs(authors) {
  const clogs = await Promise.all(_.range(100).map(async () => {
    return models.Clog.create({
      title: casual.title,
      episodeIds: [],
      preview: await preview(),
      cover: await cover(),
      authorId: authors[_.random(0, authors.length - 1)],
      followerIds: [],
      commentIds: [],
      tagIds: [],
      category: await casual.clog_category,
      review: casual.sentences(20),
      viewCount: casual.positive_int(10000),
      createdAt: new Date(),
    });
  }));
  return clogs;
}

async function gen() {
  const authors = await genAuthors();
  const clogs = await genClogs(authors);
}

gen().then(() => {
  console.log('generated');
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(0);
});
