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
 *
 * @flow
 */

import { REHYDRATE } from 'redux-persist/constants';

import type { Action } from '../actions/types';

export type State = {
  isLoggedIn: boolean;
  hasSkippedLogin: boolean;
  sharedSchedule: ?boolean;
  facebookLinked: ?boolean;
  id: ?string;
  name: ?string;
  savingProfile: boolean;
  birthDayDate: boolean;
  sex: ?string;
  facebookLinked: boolean;
  profilePicture: ?string;
  profileCover: ?string;
};

const initialState = {
  isLoggedIn: false,
  hasSkippedLogin: false,
  sharedSchedule: null,
  id: null,
  name: null,
  birthDayDate: null,
  sex: null,
  facebookLinked: false,
  profilePicture: null,
  profileCover: null,
};

function changeProfile(state: State = initialState, action: Action): State {
  if (action.type === 'CHANGED_PUBLIC_PROFILE') {
    return {
      ...state,
      name: action.payload.name,
      birthDayDate: action.payload.birthDayDate,
      sex: action.payload.sex,
      profilePicture: action.payload.profilePicture,
      profileCover: action.payload.profileCover,
    };
  }
  return state;
}

function authen(state: State = initialState, action: Action): State {
  if (action.type === 'FACEBOOK_LINKED') {
    const { id, name } = action.data;
    return {
      ...state,
      id,
      name,
      facebookLinked: true,
    };
  }
  if (action.type === 'FACEBOOK_UNLINKED') {
    return {
      ...state,
      id: null,
      facebookLinked: false,
    };
  }
  if (action.type === 'LOGGED_IN') {
    const {
      id,
      name,
      sex,
      email,
      birthDayDate,
      profilePicture,
      profileCover,
      facebookLinked } = action.data;
    let { sharedSchedule } = action.data;
    if (sharedSchedule === undefined) {
      sharedSchedule = null;
    }
    return {
      isLoggedIn: true,
      hasSkippedLogin: false,
      sharedSchedule,
      id,
      name,
      sex,
      email,
      birthDayDate,
      profilePicture,
      profileCover,
      facebookLinked,
    };
  }
  if (action.type === 'SKIPPED_LOGIN') {
    return {
      isLoggedIn: false,
      hasSkippedLogin: true,
      sharedSchedule: null,
      id: null,
      name: null,
    };
  }
  if (action.type === 'LOGGED_OUT') {
    return initialState;
  }
  return state;
}

function user(state: State = initialState, action: Action): State {
  let nState = state;
  nState = changeProfile(nState, action);
  nState = authen(nState, action);
  if (action.type === REHYDRATE) {
    const incoming = action.payload;
    if (incoming && incoming.birthDayDate) {
      return {
        ...nState,
        ...incoming,
        birthDayDate: new Date(incoming.birthDayDate),
      };
    }
  }
  if (action.type === 'SET_SHARING') {
    return {
      ...nState,
      sharedSchedule: action.enabled,
    };
  }
  if (action.type === 'RESET_NUXES') {
    return { ...nState, sharedSchedule: null };
  }
  return nState;
}

module.exports = user;
