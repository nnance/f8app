import mongoose, { Schema } from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';

const userSchema = Schema({
  name: { type: String, required: true },
  profilePicture: String,
});

export const User = mongoose.model('User', userSchema);
export const UserTC = composeWithMongoose(User);
