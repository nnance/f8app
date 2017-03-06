import 'dotenv/config';
import casual from 'casual';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';

import './casual-config';

const url = process.env.URL;
const clogHTML = fs.readFileSync(__dirname + '/mock-clog.html');

function urlToImageObj(fromUrl) {
  return {
    id: null,
    secure_url: fromUrl,
    url: fromUrl,
    public_id: null,
    width: 100,
    height: 100,
  };
}

export function loadSeed(type) {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, 'data', `${type}.json`));
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`cant load seed on type ${type}`);
  }
}

export function loadSeedId(type) {
  return loadSeed(type).map(obj => obj._id);
}

export const profile = async () => {
  return urlToImageObj(`${url}${await casual.profilePicture}`);
};

export const preview = async () => {
  const uri = await casual.clog_preview;
  if (!uri) {
    return null;
  }
  return urlToImageObj(`${url}${uri}`);
};

export const cover = async () => {
  const uri = await casual.clog_cover;
  if (!uri) {
    return null;
  }
  return urlToImageObj(`${url}${uri}`);
};

export function genArray(array, maxSize) {
  return _.uniqWith(_.range(casual.integer(0, maxSize)).map(() => array[casual.integer(0, array.length - 1)]));
}

export function genFixArray(array, size) {
  return _.uniqWith(_.range(size).map(() => array[casual.integer(0, array.length - 1)]));
}

export function writeSeed(fileName, json) {
  fs.writeFileSync(path.resolve(__dirname, 'data', `${fileName}.json`), JSON.stringify(json, null, 2));
}

export {
  casual,
};
