import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

import { models } from './models';

mongoose.connect(process.env.DATABASE_URI);

const clogHTML = fs.readFileSync(path.resolve(__dirname, 'mock-clog-with-scroll-ratio.html'));

models.Episode.update({ data: null, isSeed: true }, {
  data: {
    binary: clogHTML,
  },
}, {
  multi: true,
})
.then(() => console.log('complete'))
.catch(error => console.error(error.message))
.then(() => process.exit(0));

