/* @flow */

'use strict';

import Parse from 'parse/react-native';

import type { Action, ThunkAction } from './types';

async function _changeProfile(data) {
  const user = await Parse.User.currentAsync();
  if (!user) {
    throw new Error('not logged in');
  }
  Object.keys(data).forEach(key => {
    user.set(key, data[key]);
  });
  await user.save();
  return await user.fetch();
}

export const changePublicProfile = (name, birthDayDate, sex): ThunkAction => dispatch => {
  dispatch(savingProfile());
  return _changeProfile({
    name,
    birthDayDate,
    sex
  }).then(
    (user) => {
      dispatch(changedPublicProfile({
        name: user.get('name'),
        sex: user.get('sex'),
        birthDayDate: user.get('birthDayDate')
      }));
    }
  );
}

export function clearSaveState() {
  return {
    type: 'CLEAR_SAVE_STATE'
  };
}

function savingProfile() {
  return {
    type: 'SAVING_PROFILE'
  };
}

function changedPublicProfile(data) {
  return {
    type: 'CHANGED_PUBLIC_PROFILE',
    ...data
  }
}

function changedEmail(email): Action {
  return {
    type: 'CHANGED_EMAIL',
    email
  };
}

function changePassword(password): Action {
  return {
    type: 'CHANGED_PASSWORD',
    password
  };
}
