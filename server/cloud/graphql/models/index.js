import mongoose, { Schema } from 'mongoose';

mongoose.connect(process.env.DATABASE_URI);

const CATEGORY_ENUM = ['D', 'M', 'G', 'N'];

const userSchema = Schema({
  name: { type: String, required: true },
  profilePicture: String,
});

const editorSchema = Schema({
  name: { type: String, required: true },
  profilePicture: String,
  followingCount: { type: Number, default: 0 },
  following: { type: [Schema.Types.ObjectId], ref: 'User' },
  clogCount: { type: Number, default: 0 },
  isFollowing: { type: Boolean, default: false },
  clogs: { type: [Schema.Types.ObjectId], ref: 'Clog' },
});

const userClogFollowingSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  clog: { type: Schema.Types.ObjectId, ref: 'Clog' },
});

const clogSchema = Schema({
  title: { type: String, required: true },
  episodes: [{ type: Schema.Types.ObjectId, ref: 'Episode', required: true }],
  preview: String,
  cover: String,
  category: { type: String, enum: CATEGORY_ENUM },
  author: { type: Schema.Types.ObjectId, ref: 'Editor', required: true },
  review: { type: String, required: true },
  followers: { type: [Schema.Types.ObjectId], ref: 'User', required: true },
  followerCount: { type: Number, default: 0 },
  followersYouKnow: { type: [Schema.Types.ObjectId], ref: 'User', required: true },
  likes: { type: [Schema.Types.ObjectId], ref: 'User', required: true },
  likeCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  comments: { type: [Schema.Types.ObjectId], ref: 'Comment', required: true },
  commentCount: { type: Number, default: 0 },
  tags: { type: [Schema.Types.ObjectId], ref: 'Tag', required: true },
  createdAt: { type: Date, required: true },
});

const episodeSchema = Schema({
  no: { type: Number, required: true },
  title: { type: String, required: true },
  preview: String,
  likes: { type: [Schema.Types.ObjectId], ref: 'User', required: true },
  viewCount: { type: Number, default: 0 },
  likeCount: { type: Number, default: 0 },
  createdAt: { type: Date, required: true },
  comments: { type: [Schema.Types.ObjectId], ref: 'Comment', required: true },
  commentCount: { type: Number, default: 0 },
});

const commentSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true },
});

const tagSchema = Schema({
  name: { type: String, required: true },
  clogs: { type: [Schema.Types.ObjectId], ref: 'Clog', required: true },
});

export const User = mongoose.model('User', userSchema);
export const Editor = mongoose.model('Editor', editorSchema);
export const Clog = mongoose.model('Clog', clogSchema);
export const Episode = mongoose.model('Episode', episodeSchema);
export const Comment = mongoose.model('Comment', commentSchema);
export const Tag = mongoose.model('Tag', tagSchema);
export const UserClogFollowing = mongoose.model('UserClogFollowing', userClogFollowingSchema);
