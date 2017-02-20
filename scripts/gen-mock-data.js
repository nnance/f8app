import 'dotenv/config';
import casual from 'casual';
import _ from 'lodash';
import mongoose from 'mongoose';

import '../server/cloud/graphql/mocks/casual-config';
import { models } from '../server/cloud/graphql/models';

mongoose.connect(process.env.DATABASE_URI);

const url = process.env.URL;

const preview = async () => {
  const uri = await casual.clog_preview;
  if (!uri) {
    return null;
  }
  return `${url}${uri}`;
};

const cover = async () => {
  const uri = await casual.clog_cover;
  if (!uri) {
    return null;
  }
  return `${url}${uri}`;
};

function genArray(array, maxSize) {
  return _.range(_.random(0, maxSize)).map(() => array[_.random(0, array.length - 1)]);
}

function genUsers() {
  return Promise.all(_.range(2000).map(async () => models.User.create({
    name: casual.name,
    profilePicture: `${url}${await casual.profilePicture}`,
  })));
}

function genAuthors(users) {
  return Promise.all(_.range(50).map(async () => {
    const editor = await models.Editor.create({
      name: casual.name,
      profilePicture: `${url}${await casual.profilePicture}`,
      followingCount: casual.positive_int(1000),
    });
    await Promise.all(genArray(users, 1000).map(user => models.EditorFollower.create({
      userId: user,
      editorId: editor,
    })));
    return editor;
  }));
}

function genTags() {
  return Promise.all(_.range(20).map(() => models.Tag.create({
    name: casual.title,
  })));
}

async function genClogs(users, authors, tags) {
  const author = authors[_.random(0, authors.length - 1)];
  const dumpClog = await models.Clog.create({
    _id: "58a6e85138cbdaba481a7b59",
    title: casual.title,
    episodeIds: [],
    thumbnailImage: await preview(),
    coverImage: await cover(),
    authorId: author,
    commentIds: [],
    tagIds: genArray(tags, 5),
    category: await casual.clog_category,
    synopsis: casual.sentences(20),
    viewCount: casual.positive_int(10000),
    createdAt: casual.date,
  });
  const clogs = await Promise.all(_.range(100).map(async () => {
      const author = authors[_.random(0, authors.length - 1)];
      return models.Clog.create({
        title: casual.title,
        episodeIds: [],
        thumbnailImage: await preview(),
        coverImage: await cover(),
        authorId: author,
        commentIds: [],
        tagIds: genArray(tags, 5),
        category: await casual.clog_category,
        synopsis: casual.sentences(20),
        viewCount: casual.positive_int(10000),
        createdAt: casual.date,
      })
      .then(clog => {
        return genClogFollower(users, clog).then(() => clog);
      });
    })
  );
  return [].concat([dumpClog], clogs);
}

function genClogFollower(users, clog) {
  return Promise.all(genArray(users, 1000).map(user => models.ClogFollower.create({
    userId: user,
    clogId: clog,
  })));
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

function genTrendingClog(clogs) {
  return Promise.all(genArray(clogs, clogs.length - 1).map(clog => models.TrendingClog.create({
    clogId: clog,
    category: clog.category,
  })));
}

async function gen() {
  const users = await genUsers();
  const tags = await genTags();
  const authors = await genAuthors(users);
  const clogs = await genClogs(users, authors, tags);
  await genTrendingClog(clogs);
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
