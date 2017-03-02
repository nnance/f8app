import 'dotenv/config';
import casual from 'casual';
import _ from 'lodash';
import mongoose from 'mongoose';
import fs from 'fs';

import '../server/cloud/graphql/mocks/casual-config';
import { models } from '../server/cloud/graphql/models';

mongoose.connect(process.env.DATABASE_URI);

const url = process.env.URL;
const clogHTML = fs.readFileSync(__dirname + '/mock-clog.html');

function urlToImageObj(fromUrl) {
  return {
    id: null,
    secure_url: fromUrl,
    url: fromUrl,
    public_id: null,
    width: 100,
    height: 100,
  };
}

const profile = async () => {
  return urlToImageObj(`${url}${await casual.profilePicture}`);
};

const preview = async () => {
  const uri = await casual.clog_preview;
  if (!uri) {
    return null;
  }
  return urlToImageObj(`${url}${uri}`);
};

const cover = async () => {
  const uri = await casual.clog_cover;
  if (!uri) {
    return null;
  }
  return urlToImageObj(`${url}${uri}`);
};

function genArray(array, maxSize) {
  return _.uniqWith(_.range(_.random(0, maxSize)).map(() => array[_.random(0, array.length - 1)]));
}

function genFixArray(array, size) {
  return _.uniqWith(_.range(size).map(() => array[_.random(0, array.length - 1)]));
}

function genUsers() {
  return Promise.all(_.range(2000).map(async () => models.User.create({
    name: casual.name,
    profilePicture: await profile(),
    bookmarks: [],
  })));
}

function genAuthors(users) {
  return Promise.all(_.range(50).map(async () => {
    const editor = await models.Editor.create({
      name: casual.name,
      profilePicture: await profile(),
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
            clogId: clog._id,
            no: idx + 1,
            title: casual.title,
            thumbnailImage: await preview(),
            viewCount: _.random(0, 3000),
            createdAt: casual.date,
            data: {
              binary: clogHTML,
            },
          })
        )
      ).then(eps => {
        eps.sort((a, b) => Number(a.no) - Number(b.no)).forEach(ep => {
          clog.episodeIds.push(ep._id);
        });
        return clog.save().then(() => eps);
      })
    )
  ).then(result => [].concat(...result));
}

function genTrendingClog(clogs) {
  return Promise.all(genArray(clogs, clogs.length - 1).map(clog => models.TrendingClog.create({
    clogId: clog,
    category: clog.category,
  })));
}

async function genRecommend(clogs) {
  await Promise.all(['N', 'M', 'D', 'G'].map(c => 
    models.RecommendClog.create({
      type: `CATEGORY_${c}`,
      clogIds: genFixArray(clogs, 10),
    })
  ));
  await models.RecommendClog.create({
    type: `shelf`,
    clogIds: genFixArray(clogs, 1),
  })
  await models.RecommendClog.create({
    type: `heroBanner`,
    clogIds: genFixArray(clogs, 10),
  })
}

function genEpisodeBookmarks(users, episodes) {
  return Promise.all(
    users.map(user => {
        genArray(episodes, 30).map(ep => {
          user.bookmarks.push({
            url: `player?id=${ep._id}`,
            clogId: ep.clogId,
            episodeId: ep._id,
          });
        });
        return user.save();
      }
    )
  )
}

function genClogBookmarks(users, clogs) {
  return Promise.all(
    users.map(user => {
        genArray(clogs, 5).map(clog => {
          user.bookmarks.push({
            url: `book?id=${clog._id}`,
            clogId: clog._id,
          });
        });
        return user.save();
      }
    )
  )
}

function genFeedClog(clogs) {
  return Promise.all(
    clogs.map(clog =>
        // console.log(clog.authorId._id, clog._id, clog.createdAt)
      models.FeedClog.create({
        authorId: clog.authorId._id,
        clogId: clog._id,
        createdAt: clog.createdAt,
      })
    )
  )
}

async function gen() {
  const users = await genUsers();
  const tags = await genTags();
  const authors = await genAuthors(users);
  const clogs = await genClogs(users, authors, tags);
  await genTrendingClog(clogs);
  const episodes = await genEpisodes(clogs);
  await genRecommend(clogs);
  await genEpisodeBookmarks([users[0]], episodes);
  await genClogBookmarks([users[0]], clogs);
  await genFeedClog(clogs);
}

gen().then(() => {
  console.log('generated');
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(0);
});
