import mongoose, { Schema } from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';

import * as helpers from '../helpers';

const tagSchema = Schema({
  name: { type: String, required: true },
  clogIds: { type: [Schema.Types.ObjectId], ref: 'Clog', required: true },
});

export const Tag = mongoose.model('Tag', tagSchema);
export const TagTC = composeWithMongoose(Tag);

export function onReady(models) {
  helpers.relateArray(models.TagTC, models.ClogTC, 'clogs', 'clogIds');
}

