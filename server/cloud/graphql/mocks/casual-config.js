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
  let idx = Math.floor(Math.random() * clogCovers.length);
  return clogCovers[idx];
});

let category = ['D', 'G', 'M', 'N'];

casual.define('clog_category', async () => {
  return category[Math.floor(Math.random() * category.length)];
});
