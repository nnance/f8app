import mongoose, { Schema } from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';

import * as helpers from '../helpers';

const commentSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true },
});

const Comment = mongoose.model('Comment', commentSchema);
const CommentTC = composeWithMongoose(Comment);

export function onReady({ modelTCs }) {  
  helpers.relateObject(CommentTC, modelTCs.User, 'user', 'userId');
}

export {
  Comment as Model,
  CommentTC as TC,
};
