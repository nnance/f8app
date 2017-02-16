import mongoose, { Schema } from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';

import * as helpers from '../helpers';

const CATEGORY_ENUM = ['D', 'M', 'G', 'N'];

const clogSchema = Schema({
  title: { type: String, required: true },
  episodeIds: [{ type: Schema.Types.ObjectId, ref: 'Episode', required: true }],
  preview: String,
  cover: String,
  category: { type: String, enum: CATEGORY_ENUM },
  authorId: { type: Schema.Types.ObjectId, ref: 'Editor', required: true },
  review: { type: String, required: true },
  followerIds: [{ type: [Schema.Types.ObjectId], ref: 'User', required: true }],
  viewCount: { type: Number, default: 0 },
  commentIds: { type: [Schema.Types.ObjectId], ref: 'Comment', required: true },
  tagIds: { type: [Schema.Types.ObjectId], ref: 'Tag', required: true },
  createdAt: { type: Date, required: true },
});

export const Clog = mongoose.model('Clog', clogSchema);
export const ClogTC = composeWithMongoose(Clog);

ClogTC.addField('likeCount', {
  type: 'Int',
  resolve: () => 0,
});
helpers.countArray(ClogTC, 'followerCount', 'followerIds');
helpers.countArray(ClogTC, 'commentCount', 'commentIds');

export function onReady(models) {
  helpers.relateObject(models.ClogTC, models.EditorTC, 'author', 'authorId');
  helpers.relateArray(models.ClogTC, models.CommentTC, 'comments', 'commentIds');
  helpers.relateArray(models.ClogTC, models.EpisodeTC, 'episodes', 'episodeIds');
  helpers.relateArray(models.ClogTC, models.TagTC, 'tags', 'tagIds');
  helpers.relateArray(models.ClogTC, models.UserTC, 'followers', 'followerIds');
  helpers.relateArray(models.ClogTC, models.UserTC, 'followersYouKnow', 'followerIds');
}
