import mongoose, { Schema } from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';

import * as helpers from '../helpers';

const commentSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true },
});

export const Comment = mongoose.model('Comment', commentSchema);
export const CommentTC = composeWithMongoose(Comment);

export function onReady(models) {  
  helpers.relateObject(models.CommentTC, models.UserTC, 'user', 'userId');
}
