import 'dotenv/config';
import casual from 'casual';
import _ from 'lodash';
import mongoose from 'mongoose';

import '../server/cloud/graphql/mocks/casual-config';
import { models } from '../server/cloud/graphql/models';

mongoose.connect(process.env.DATABASE_URI);

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

function genArray(array, maxSize) {
  return _.range(_.random(0, maxSize)).map(() => array[_.random(0, array.length - 1)]);
}

function genUsers() {
  return Promise.all(_.range(2000).map(async () => models.User.create({
    name: casual.name,
    profilePicture: `http://localhost:8080${await casual.profilePicture}`,
  })));
}

function genAuthors() {
  return Promise.all(_.range(50).map(async () => {
   return models.Editor.create({
      name: casual.name,
      profilePicture: `http://localhost:8080${await casual.profilePicture}`,
      followingCount: casual.positive_int(1000),
      clogIds: [],
    });
  }));
}

function genTags() {
  return Promise.all(_.range(20).map(() => models.Tag.create({
    name: casual.title,
  })));
}

function genClogs(users, authors, tags) {
  return Promise.all(_.range(100).map(async () => {
    return models.Clog.create({
      title: casual.title,
      episodeIds: [],
      thumbnailImage: await preview(),
      coverImage: await cover(),
      authorId: authors[_.random(0, authors.length - 1)],
      followerIds: genArray(users, users.length),
      commentIds: [],
      tagIds: genArray(tags, 5),
      category: await casual.clog_category,
      synopsis: casual.sentences(20),
      viewCount: casual.positive_int(10000),
      createdAt: casual.date,
    });
  }));
}

function genEpisodes(clogs) {
  return Promise.all(
    clogs.map(clog => 
      Promise.all(
        _.range(_.random(0, 40)).map(async (idx) => 
          models.Episode.create({
            no: idx + 1,
            title: casual.title,
            thumbnailImage: await preview(),
            viewCount: _.random(0, 3000),
            createdAt: casual.date,
          })
          .then(ep => {
            clog.episodeIds.push(ep._id);
            return clog.save().then(() => ep);
          })
        )
      )
    )
  ).then(Array.concat);
}

async function gen() {
  const users = await genUsers();
  const tags = await genTags();
  const authors = await genAuthors();
  const clogs = await genClogs(users, authors, tags);
  await genEpisodes(clogs);
}

gen().then(() => {
  console.log('generated');
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(0);
});
