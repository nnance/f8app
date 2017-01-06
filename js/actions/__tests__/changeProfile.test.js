import * as actions from '../changeProfile';

jest.mock('parse/react-native');

import thunk from 'redux-thunk';
var promise = require('../../store/promise');
var array = require('../../store/array');

import Parse from 'parse/react-native';
// import FacebookSDK from 'FacebookSDK';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk, promise, array];
const mockStore = configureMockStore(middlewares);

let pictureObj = {
  url: () => 'url'
};

let setSpy = jest.fn(() => Promise.resolve());

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
    set: setSpy,
    save: () => Promise.resolve(),
    fetch: function() { return Promise.resolve(this); }
  };
});

describe('Action changeProfile', () => {
  it('changePublicProfile, dispatch changedPublicProfile, and call api with corrct parameter', async () => {
    const store = mockStore({});
    await store.dispatch(actions.changePublicProfile('name test'));
    expect(setSpy.mock.calls.filter(call => call[0] === 'name')[0][1]).toBe('name test');
    expect(store.getActions().filter(action => action.type === 'CHANGED_PUBLIC_PROFILE').length).toBe(1);
    setSpy.mockClear();
  });

  it('changeEmail, dispatch changedEmail', async () => {
    const store = mockStore({});
    await store.dispatch(actions.changeEmail('b@b.b'));
    expect(setSpy.mock.calls.filter(call => call[0] === 'email')[0][1]).toBe('b@b.b');
    expect(setSpy.mock.calls.filter(call => call[0] === 'username')[0][1]).toBe('b@b.b');
    expect(store.getActions().filter(action => action.type === 'CHANGED_EMAIL').length).toBe(1);
    expect(store.getActions().filter(action => action.type === 'CHANGED_EMAIL')[0].payload).toBe('b@b.b');
    setSpy.mockClear();
  });

  it('changePassword, dispatch changedPassword', async () => {
    const store = mockStore({});
    await store.dispatch(actions.changePassword('secret'));
    expect(setSpy.mock.calls.filter(call => call[0] === 'password')[0][1]).toBe('secret');
    expect(store.getActions().filter(action => action.type === 'CHANGED_PASSWORD').length).toBe(1);
    setSpy.mockClear();
  });
});
