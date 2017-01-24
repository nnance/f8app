import path from 'path';
import fs from 'fs';
import casual from 'casual';

casual.seed(1);

let clogPreviews = undefined;
async function getPreviews() {
  if (clogPreviews) {
    return clogPreviews;
  }
  let files = await new Promise((resolve, reject) => fs.readdir(path.join(__dirname, '../../../static/preview'), (err, files) => {
    if (err) {
      return reject(err);
    }
    resolve(files);
  }));
  clogPreviews = files.map(file => `/static/preview/${file}`);
  return clogPreviews;
}

casual.define('clog_cover', async () => {
  return null;
});

casual.define('clog_preview', async () => {
  let clogCovers = await getPreviews();
  let idx = casual.integer(from = 0, to = clogCovers.length - 1);
  return clogCovers[idx];
});

let category = ['D', 'G', 'M', 'N'];

casual.define('clog_category', async () => {
  let idx = casual.integer(from = 0, to = category.length - 1);
  return category[idx];
});

casual.define('profilePicture', async () => {
  let clogCovers = await getPreviews();
  let idx = casual.integer(from = 0, to = clogCovers.length - 1);
  return clogCovers[idx];
});

casual.define('positive_int', function(max) {
  return casual.integer(from = 0, to = max);
});

casual.define('arrayN', function(max) {
  let n = casual.integer(from = 0, to = max);
  let result = [];
  while(n--) {
    result.push(1);
  }
  return result;
});
