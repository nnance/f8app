import 'dotenv/config';
import _ from 'lodash';
import mongoose from 'mongoose';

import { modelMapping } from './models';
import { loadSeed } from './helpers';

mongoose.Promise = Promise;

mongoose.connect(process.env.DATABASE_URI);

const prog = require('caporal');
const sequential = require('promise-sequential');

const defaultTypes = _.keys(modelMapping).join(',');

prog
  .version('1.0.0')
  .option('--types <types>', prog.LIST)
  .action((args, options) => {
    const types = (options.types || defaultTypes).split(',');
    return sequential(types.map(type => async () => {
      let result;
      try {
        result = loadSeed(type);
      } catch (error) {
        console.error(error.message);
        return;
      }
      if (!modelMapping[type]) {
        throw new Error(`model ${type} not exists`);
      }
      console.log(`creating ${type}`);
      // FOR ADD isSeed
      modelMapping[type].schema.add({
        isSeed: Boolean,
      });
      await Promise.all(result.map(obj => modelMapping[type].findOneAndUpdate({ _id: obj._id }, {
        ...obj,
        isSeed: true,
      }, {
        upsert: true,
      })));
    }))
    .then(() => console.log('complete'))
    .catch(error => console.error(error.message))
    .then(() => process.exit(0));
  });

prog.parse(process.argv);
