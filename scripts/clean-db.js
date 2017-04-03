import 'dotenv/config';
import _ from 'lodash';
import mongoose from 'mongoose';

import { models } from '../server/cloud/graphql/models';

mongoose.connect(process.env.DATABASE_URI);

function clean() {
  return Promise.all(_.map(models, model => model.remove({})));
}

clean().then(() => {
  console.log('database is clean');
  process.exit(0);
})
.catch(err => {
  console.error('error', err);
  process.exit(0);
});
