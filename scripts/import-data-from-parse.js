/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 */

import fetch from 'isomorphic-fetch';
import Parse from 'parse/node';
import _ from 'lodash';

import env from '../js/env';

Parse.initialize(env.parse.appID, env.parse.javascriptKey);
Parse.serverURL = `${env.serverURL}/parse`;

const BLACKLISTED_KEYS = new Set(['objectId', 'createdAt', 'updatedAt']);
const ID_MAP = new Map();

function convertPointer(pointer) {
  /* eslint no-underscore-dangle: "off"*/
  if (pointer.__type === 'Pointer') {
    return { ...pointer, objectId: ID_MAP.get(pointer.objectId) || pointer.objectId };
  }
  return pointer;
}

async function importObject(ClassType, attributes) {
  let obj = new ClassType();
  _.keys(attributes).forEach((key) => {
    if (BLACKLISTED_KEYS.has(key)) {
      return;
    }
    let value = attributes[key];
    if (Array.isArray(value)) {
      value = value.map(convertPointer);
    }
    obj.set(key, value);
  });
  obj = await obj.save();
  ID_MAP.set(attributes.objectId, obj.id);
  return obj;
}

async function importClass(className) {
  console.log('Loading', className);
  const response = await fetch(`https://api.parse.com/1/classes/${className}`, {
    method: 'get',
    headers: {
      'X-Parse-Application-Id': 'R0yDMIKCUyEke2UiadcTBBGd1L5hMBTGJSdBNL3W',
      'X-Parse-JavaScript-Key': 'BJ5V0APFMlvmCBPDXl9Mgh3q3dFrs18XkQz6A2bO',
      'Content-Type': 'application/json',
    },
  });
  const { results } = await response.json();
  const ClassType = Parse.Object.extend(className);
  console.log('Cleaning old', className, 'data');
  await new Parse.Query(ClassType)
    .each(record => record.destroy());
  console.log('Converting', className);
  return Promise.all(results.map(attrs => importObject(ClassType, attrs)));
}

const Survey = Parse.Object.extend('Survey');

function createSurvey(session) {
  return new Survey({
    session,
    q1: 'How useful did you find the content from this session?',
    q2: 'How likely are you to implement the products/techniques covered in this session?',
  }).save();
}

async function main() {
  await importClass('Speakers');
  const sessions = await importClass('Agenda');

  console.log('Generating sample survey questions');
  await new Parse.Query(Survey)
    .each(record => record.destroy());
  await sessions.map((s) => {
    if (s.get('hasDetails')) {
      return createSurvey(s);
    }
    return Promise.resolve(null);
  });

  await Promise.all([
    importClass('FAQ'),
    importClass('Maps'),
    importClass('Notification'),
    importClass('Page'),
  ]);
  return 'OK';
}

main()
  .then(console.dir, console.error);
