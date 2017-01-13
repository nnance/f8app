import path from 'path';
import fs from 'fs';
import casual from 'casual';

casual.seed(1);

let clogCovers = undefined;
async function getCovers() {
  if (clogCovers) {
    return clogCovers;
  }
  let files = await new Promise((resolve, reject) => fs.readdir(path.join(__dirname, '../../../static/cover'), (err, files) => {
    if (err) {
      return reject(err);
    }
    resolve(files);
  }));
  clogCovers = files.map(file => `/static/cover/${file}`);
  return clogCovers;
}

casual.define('clog_cover', async () => {
  let clogCovers = await getCovers();
  let idx = casual.integer(from = 0, to = clogCovers.length - 1);
  return clogCovers[idx];
});

let category = ['D', 'G', 'M', 'N'];

casual.define('clog_category', async () => {
  let idx = casual.integer(from = 0, to = category.length - 1);
  return category[idx];
});
