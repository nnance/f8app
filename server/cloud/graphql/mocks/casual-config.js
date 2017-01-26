import path from 'path';
import fs from 'fs';
import casual from 'casual';

casual.seed(1);

let memo = {};

async function staticPath(_path) {
  if (memo[_path]) {
    return memo[_path];
  }
  let files = await new Promise((resolve, reject) => fs.readdir(path.join(__dirname, '../../../static/', _path), (err, files) => {
    if (err) {
      return reject(err);
    }
    resolve(files);
  }));
  memo[_path] = files.map(file => `/static/${_path}/${file}`);
  return memo[_path];
}

async function randomStatic(_path) {
  let files = await staticPath(_path);
  let idx = casual.integer(from = 0, to = files.length - 1);
  return files[idx];
}

casual.define('clog_cover', () => randomStatic('cover'));

casual.define('clog_preview', () => randomStatic('preview'));

let category = ['D', 'G', 'M', 'N'];

casual.define('clog_category', async () => {
  let idx = casual.integer(from = 0, to = category.length - 1);
  return category[idx];
});

casual.define('profilePicture', () => randomStatic('preview'));

casual.define('positive_int', function(max) {
  return casual.integer(from = 1, to = max);
});

casual.define('arrayN', function(max) {
  let n = casual.integer(from = 0, to = max);
  let result = [];
  while(n--) {
    result.push(1);
  }
  return result;
});
