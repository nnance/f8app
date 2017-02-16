import mongoose, { Schema } from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';

import * as helpers from '../helpers';

const tagSchema = Schema({
  name: { type: String, required: true },
  clogIds: { type: [Schema.Types.ObjectId], ref: 'Clog', required: true },
});

const Tag = mongoose.model('Tag', tagSchema);
const TagTC = composeWithMongoose(Tag);

export function onReady({ modelTCs }) {
  helpers.relateArray(TagTC, modelTCs.Clog, 'clogs', 'clogIds');
}

export {
  Tag as Model,
  TagTC as TC,
};

