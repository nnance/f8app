import 'dotenv/config';
import _ from 'lodash';

import { models } from '../server/cloud/graphql/models';

function clean() {
  return Promise.all(_.map(models, model => model.remove({})));
}

clean().then(() => {
  console.log('database is clean');
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(0);
});
