import mongoose, { Schema } from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';

const userSchema = Schema({
  name: { type: String, required: true },
  profilePicture: String,
});

const User = mongoose.model('User', userSchema);
const UserTC = composeWithMongoose(User);

export {
  User as Model,
  UserTC as TC,
};
