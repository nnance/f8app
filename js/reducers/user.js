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

'use strict';

import type {Action} from '../actions/types';
import {REHYDRATE} from 'redux-persist/constants'

export type State = {
  isReqedForgotPassword: boolean;
  isSignedUp: boolean;
  isLoggedIn: boolean;
  hasSkippedLogin: boolean;
  sharedSchedule: ?boolean;
  facebookLinked: ?boolean;
  loginError: ?string;
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
  isReqedForgotPassword: false,
  isSignedUp: false,
  isLoggedIn: false,
  hasSkippedLogin: false,
  sharedSchedule: null,
  loginError: null,
  id: null,
  name: null,
  savingProfile: false,
  birthDayDate: null,
  sex: null,
  facebookLinked: false,
  profilePicture: null,
  profileCover: null,
  changingPassword: false,
  changedPassword: false,
  changePasswordError: null,
  changingEmail: false,
  changedEmail: false,
  changeEmailError: null,
  facebookLinkProcessing: false,
  facebookLinkError: null
};

function changeProfile(state: State = initialState, action: Action): State {
  if (action.type === 'CLEAR_SAVE_STATE') {
    return {
      ...state,
      savingProfile: false,
      savedProfile: false
    };
  }
  if (action.type === 'SAVING_PROFILE') {
    return {
      ...state,
      savingProfile: true
    };
  }
  if (action.type === 'CHANGED_PUBLIC_PROFILE') {
    return {
      ...state,
      name: action.name,
      birthDayDate: action.birthDayDate,
      sex: action.sex,
      savedProfile: true,
      profilePicture: action.profilePicture,
      profileCover: action.profileCover
    };
  }
  if (action.type === 'CLEAR_CHANGE_PASSWORD_STATE') {
    return {
      ...state,
      changingPassword: false,
      changedPassword: false,
      changePasswordError: null
    };
  }
  if (action.type === 'CHANGING_PASSWORD') {
    return {
      ...state,
      changingPassword: true,
      changedPassword: false,
      changePasswordError: null
    };
  }
  if (action.type === 'CHANGED_PASSWORD') {
    return {
      ...state,
      changingPassword: false,
      changedPassword: true,
      changePasswordError: null
    };
  }
  if (action.type === 'CHANGE_PASSWORD_ERROR') {
    return {
      ...state,
      changingPassword: false,
      changedPassword: false,
      changePasswordError: action.payload
    };
  }
  if (action.type === 'CLEAR_CHANGE_EMAIL_STATE') {
    return {
      ...state,
      changingEmail: false,
      changedEmail: false,
      changeEmailError: null
    };
  }
  if (action.type === 'CHANGING_EMAIL') {
    return {
      ...state,
      changingEmail: true,
      changedEmail: false,
      changeEmailError: null
    };
  }
  if (action.type === 'CHANGED_EMAIL') {
    return {
      ...state,
      changingEmail: false,
      changedEmail: true,
      changeEmailError: null
    };
  }
  if (action.type === 'CHANGE_EMAIL_ERROR') {
    return {
      ...state,
      changingEmail: false,
      changedEmail: false,
      changeEmailError: action.payload
    };
  }
  return state;
}

function authen(state: State = initialState, action: Action): State {
  if (action.type === 'CLEAR_IS_REQED_FORGOT_PASSWORD') {
    return {
      ...state,
      isReqedForgotPassword: false
    };
  }
  if (action.type === 'REQED_FORGOT_PASSWORD') {
    return {
      ...state,
      isReqedForgotPassword: true
    };
  }
  if (action.type === 'SIGNED_UP') {
    return {
      ...state,
      isSignedUp: true
    };
  }
  if (action.type === 'CLEAR_SIGNED_UP') {
    return {
      ...state,
      isSignedUp: false
    };
  }
  if (action.type === 'LOGIN_ERROR') {
    return {
      ...state,
      loginError: action.message
    };
  }
  if (action.type === 'CLEAR_LOGIN_ERROR') {
    return {
      ...state,
      loginError: null
    };
  }
  if (action.type === 'FACEBOOK_LINK_PROCESSING') {
    return {
      ...state,
      facebookLinkProcessing: true
    };
  }
  if (action.type === 'FACEBOOK_LINKED') {
    let {id, name} = action.data;
    return {
      ...state,
      id,
      name,
      facebookLinked: true,
      facebookLinkProcessing: false
    };
  }
  if (action.type === 'FACEBOOK_UNLINKED') {
    return {
      ...state,
      id: null,
      facebookLinked: false,
      facebookLinkProcessing: false
    };
  }
  if (action.type === 'LOGGED_IN') {
    let {id, name, sex, email, birthDayDate, profilePicture, profileCover, sharedSchedule, facebookLinked} = action.data;
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
      facebookLinked
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
  state = changeProfile(state, action);
  state = authen(state, action);
  if (action.type === REHYDRATE) {
    const incoming = action.payload;
    if (incoming && incoming.birthDayDate) {
      return {
        ...state,
        ...incoming,
        birthDayDate: new Date(incoming.birthDayDate)
      };
    }
  }
  if (action.type === 'SET_SHARING') {
    return {
      ...state,
      sharedSchedule: action.enabled,
    };
  }
  if (action.type === 'RESET_NUXES') {
    return {...state, sharedSchedule: null};
  }
  return state;
}

module.exports = user;
