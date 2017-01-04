/* @flow */

'use strict';

import Parse from 'parse/react-native';

import type { Action } from './types';

async function getUser() {
  const user = await Parse.User.currentAsync();
  if (!user) {
    throw new Error('not logged in');
  }
  return user;
}

async function _changePassword(newPassword) {
  const user = await getUser();
  user.set('password', newPassword);
  await user.save();
}

async function _changeEmail(newEmail) {
  const user = await getUser();
  user.set('username', newEmail);
  user.set('email', newEmail);
  await user.save();
}

export const changeEmail = (newEmail) => dispatch => {
  return _changeEmail(newEmail).then(() => {
    dispatch(changedEmail(newEmail));
  });
};

function changedEmail() {
  return {
    type: 'CHANGED_EMAIL'
  };
}

export const changePassword = (newPassword) => dispatch => {
  return _changePassword(newPassword).then(() => {
    dispatch(changedPassword());
  });
};

function changedPassword() {
  return {
    type: 'CHANGED_PASSWORD'
  };
}

async function _changeProfile(data) {
  const user = await getUser();
  if (data.profilePicture) {
    const base64 = data.profilePicture.data;
    const file = new Parse.File(data.profilePicture.fileName, { base64: base64 });
    await file.save();
    user.set('profilePicture', file);
  }
  if (data.profileCover) {
    const base64 = data.profileCover.data;
    const file = new Parse.File(data.profileCover.fileName, { base64: base64 });
    await file.save();
    user.set('profileCover', file);
  }
  delete data.profileCover;
  delete data.profilePicture;
  Object.keys(data).forEach(key => {
    user.set(key, data[key]);
  });
  // await new Promise(resolve => {
  //   setTimeout(() => resolve(), 2000);
  // })
  await user.save();
  return await user.fetch();
}

export const changePublicProfile = (name, birthDayDate, sex, profilePicture, profileCover) => dispatch => {
  return _changeProfile({
    name,
    birthDayDate,
    sex,
    profilePicture,
    profileCover
  }).then(
    (user) => {
      dispatch(changedPublicProfile({
        name: user.get('name'),
        sex: user.get('sex'),
        birthDayDate: user.get('birthDayDate'),
        profilePicture: user.get('profilePicture') ? user.get('profilePicture').url() : null,
        profileCover: user.get('profileCover') ? user.get('profileCover').url() : null
      }));
    }
  );
};

export function changedPublicProfile(data) {
  return {
    type: 'CHANGED_PUBLIC_PROFILE',
    payload: data
  };
}

function changedEmail(email): Action {
  return {
    type: 'CHANGED_EMAIL',
    payload: email
  };
}
