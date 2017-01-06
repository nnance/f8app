import * as loginAction from '../login';

jest.mock('parse/react-native');
jest.mock('FacebookSDK', () => ({
  api: jest.fn((...args) => {
    args[args.length - 1]({});
  }),
  logout: jest.fn(() => Promise.resolve())
}));
jest.mock('../schedule', () => ({
  restoreSchedule: () => Promise.resolve(),
  loadFriendsSchedules: () => Promise.resolve()
}));

import thunk from 'redux-thunk';
var promise = require('../../store/promise');
var array = require('../../store/array');

import Parse from 'parse/react-native';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk, promise, array];
const mockStore = configureMockStore(middlewares);

let pictureObj = {
  url: () => 'url'
};

Parse.User.logIn.mockImplementation((username) => {
  if (username === 'fail') {
    return Promise.reject(new Error('something error'));
  }
  return Promise.resolve();
});
Parse.User.currentAsync.mockImplementation(() => {
  return {
    get: (f) => {
      if (f === 'profilePicture' || f === 'profileCover') {
        return pictureObj;
      }
      return 't';
    },
    set: () => Promise.resolve(),
    save: () => Promise.resolve(),
    _unlinkFrom: () => Promise.resolve()
  };
});

describe('Login Action', () => {
  it('logIn, dispatch loggedIn if success', async () => {
    const store = mockStore({});
    await store.dispatch(loginAction.logIn('test', 'test'));
    const actions = store.getActions();
    expect(actions.filter(action => action && action.type === 'LOGGED_IN').length).toBe(1);
  });

  it('logIn, dont call anything, just return promise', async () => {
    let success = jest.fn();
    let fail = jest.fn();
    await loginAction.logIn('fail', 'fail')(jest.fn()).then(success).catch(fail);
    expect(fail).toBeCalled();
    expect(success).not.toBeCalled();
  });

  it('logInWithFacebook, dispatch loggedIn if success', async () => {
    Parse.FacebookUtils.logIn.mockImplementationOnce((scope, opts) => {
      opts.success();
    });
    const store = mockStore({});
    await store.dispatch(loginAction.logInWithFacebook());
    const actions = store.getActions();
    expect(actions.filter(action => action && action.type === 'LOGGED_IN').length).toBe(1);
  });

  it('forgotPassword must call Parse.User.requestPasswordReset', async () => {
    Parse.User.requestPasswordReset.mockImplementationOnce(() => Promise.resolve());
    await loginAction.forgotPassword('a@a.a')(jest.fn());
    expect(Parse.User.requestPasswordReset).toBeCalled();
    Parse.User.requestPasswordReset.mockClear();
  });

  it('logOut, call ParseUser.logOut and dispatch LOGGED_OUT', async () => {
    Parse.User.logOut.mockImplementationOnce(() => Promise.resolve());
    const store = mockStore({});
    await store.dispatch(loginAction.logOut());
    expect(Parse.User.logOut).toBeCalled();
    expect(store.getActions().filter(action => action && action.type === 'LOGGED_OUT').length).toBe(1);
    Parse.User.logOut.mockClear();
  });

  it('linkFacebook, dispatch FACEBOOK_LINKED if success', async () => {
    Parse.FacebookUtils.link.mockImplementationOnce((a, b, opts) => {
      opts.success();
    });
    const store = mockStore({});
    await store.dispatch(loginAction.linkFacebook());
    expect(Parse.FacebookUtils.link).toBeCalled();
    expect(store.getActions().filter(action => action && action.type === 'FACEBOOK_LINKED').length).toBe(1);
  });

  it('linkFacebook, dont dispatch FACEBOOK_LINKED if fail', async () => {
    Parse.FacebookUtils.link.mockImplementationOnce((a, b, opts) => {
      opts.error(new Error('something error'));
    });
    const store = mockStore({});
    const success = jest.fn();
    const error = jest.fn();
    await store.dispatch(loginAction.linkFacebook()).then(success).catch(error);
    expect(success).not.toBeCalled();
    expect(error).toBeCalled();
    expect(store.getActions().filter(action => action && action.type === 'FACEBOOK_LINKED').length).toBe(0);
  });

  it('unlinkFacebook, dispatch FACEBOOK_UNLINKED if success', async () => {
    Parse.FacebookUtils.unlink.mockImplementationOnce((a, opts) => {
      opts.success();
    });
    const store = mockStore({});
    await store.dispatch(loginAction.unlinkFacebook());
    expect(Parse.FacebookUtils.unlink).toBeCalled();
    expect(store.getActions().filter(action => action && action.type === 'FACEBOOK_UNLINKED').length).toBe(1);
  });

  it('unlinkFacebook, dont dispatch FACEBOOK_UNLINKED if success', async () => {
    Parse.FacebookUtils.unlink.mockImplementationOnce((a, opts) => {
      opts.error(new Error('something error'));
    });
    const store = mockStore({});
    const success = jest.fn();
    const error = jest.fn();
    await store.dispatch(loginAction.unlinkFacebook()).then(success).catch(error);
    expect(success).not.toBeCalled();
    expect(error).toBeCalled();
    expect(Parse.FacebookUtils.unlink).toBeCalled();
    expect(store.getActions().filter(action => action && action.type === 'FACEBOOK_UNLINKED').length).toBe(0);
  });

  it('signUp dispatch SIGNED_UP if success', async () => {
    const store = mockStore({});
    const setSpy = jest.fn();
    const saveSpy = jest.fn(() => Promise.resolve());
    Parse.User.prototype.save.mockImplementationOnce(() => Promise.resolve());
    await store.dispatch(loginAction.signUp('a@a.a', '1'));
    expect(store.getActions().filter(action => action && action.type === 'SIGNED_UP').length).toBe(1);
  });

  it('signUp dont dispatch SIGNED_UP if fail', async () => {
    const store = mockStore({});
    const setSpy = jest.fn();
    const saveSpy = jest.fn(() => Promise.resolve());
    const error = jest.fn();
    Parse.User.prototype.save.mockImplementationOnce(() => Promise.reject(new Error('something error')));
    await store.dispatch(loginAction.signUp('a@a.a', '1')).catch(error);
    expect(error).toBeCalled();
    expect(store.getActions().filter(action => action && action.type === 'SIGNED_UP').length).toBe(0);
  });
});
