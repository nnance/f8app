import path from 'path';
import fs from 'fs';
import casual from 'casual';

casual.seed(1);

const memo = {};

async function staticPath(dir) {
  if (memo[dir]) {
    return memo[dir];
  }
  const allFiles = await new Promise((resolve, reject) => fs.readdir(path.join(__dirname, '../../../static/', dir), (err, files) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(files);
  }));
  memo[dir] = allFiles.map(file => `/static/${dir}/${file}`);
  return memo[dir];
}

async function randomStatic(dir) {
  const files = await staticPath(dir);
  const idx = casual.integer(0, files.length - 1);
  return files[idx];
}

casual.define('clog_cover', () => randomStatic('cover'));

casual.define('clog_preview', () => randomStatic('preview'));

const category = ['D', 'G', 'M', 'N'];

casual.define('clog_category', async () => {
  const idx = casual.integer(0, category.length - 1);
  return category[idx];
});

casual.define('profilePicture', () => randomStatic('preview'));

casual.define('positive_int', max => casual.integer(1, max));

casual.define('id', () => String(casual.positive_int(10000000)));

casual.define('arrayN', (max) => {
  let n = casual.integer(0, max);
  const result = [];
  while (n) {
    result.push(1);
    n -= 1;
  }
  return result;
});

casual.define('date', () => {
  const date = new Date(casual.integer(0, 1486548112329));
  return date;
});
