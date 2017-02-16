import mongoose, { Schema } from 'mongoose';
import _ from 'lodash';

import * as helpers from '../helpers';

mongoose.connect(process.env.DATABASE_URI);

const ns = ['Clog', 'Comment', 'Episode', 'Editor', 'Tag', 'User'];

const imported = ns.map(model => {
  return _.assign({ name: model, ...require(`./${model}`) });
});
const models = imported.reduce((acc, m) => _.assign(acc, { [m.name]: m.Model }), {});
const modelTCs = imported.reduce((acc, m) => _.assign(acc, { [m.name]: m.TC }), {});

const ex = { models, modelTCs };

_.each(modelTCs, TC => helpers.addId(TC));

imported.forEach(m => {
  if (m.onReady) {
    m.onReady(ex);
  }
});

module.exports = ex;
