import mongoose, { Schema } from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';

import * as helpers from '../helpers';

const CATEGORY_ENUM = ['D', 'M', 'G', 'N'];

const clogSchema = Schema({
  title: { type: String, required: true },
  episodeIds: [{ type: Schema.Types.ObjectId, ref: 'Episode', required: true }],
  preview: String,
  cover: String,
  category: { type: String, enum: CATEGORY_ENUM, index: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'Editor', required: true },
  review: { type: String, required: true },
  followerIds: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  viewCount: { type: Number, default: 0 },
  commentIds: [{ type: Schema.Types.ObjectId, ref: 'Comment', required: true }],
  tagIds: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Tag', required: true }],
    index: true,
  },
  createdAt: { type: Date, required: true, index: true },
});

clogSchema.index({ category: 1, createdAt: 1 });

const Clog = mongoose.model('Clog', clogSchema);
const ClogTC = composeWithMongoose(Clog);

ClogTC.setField('likeCount', {
  type: 'Int',
  resolve: () => 0,
});
helpers.countArray(ClogTC, 'followerCount', 'followerIds');
helpers.countArray(ClogTC, 'commentCount', 'commentIds');

export function onReady({modelTCs}) {
  helpers.relateObject(ClogTC, modelTCs.Editor, 'author', 'authorId');
  helpers.relateArray(ClogTC, modelTCs.Comment, 'comments', 'commentIds');
  helpers.relateArray(ClogTC, modelTCs.Episode, 'episodes', 'episodeIds');
  helpers.relateArray(ClogTC, modelTCs.Tag, 'tags', 'tagIds');
  helpers.relateArray(ClogTC, modelTCs.User, 'followers', 'followerIds');
  helpers.relateArray(ClogTC, modelTCs.User, 'followersYouKnow', 'followerIds');
}

export {
  Clog as Model,
  ClogTC as TC,
};
