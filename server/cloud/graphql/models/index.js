import mongoose, { Schema } from 'mongoose';
import _ from 'lodash';

import * as helpers from '../helpers';

mongoose.connect(process.env.DATABASE_URI);

const ns = ['Clog', 'Comment', 'Episode', 'Editor', 'Tag', 'User'];

const imported = ns.map(model => require(`./${model}`));
const models = imported.reduce((acc, m) => _.assign(acc, _.omit(m, 'onReady')), {});

ns.forEach(model => helpers.addId(models[`${model}TC`]));

imported.forEach(m => {
  if (m.onReady) {
    m.onReady(models);
  }
});

module.exports = models;
