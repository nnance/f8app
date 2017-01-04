import {REHYDRATE} from 'redux-persist/constants';

import userReducer from '../user';
import * as actions from '../../actions';

describe('Reducer User', () => {
  it('CHANGED_PUBLIC_PROFILE should set new name', () => {
    const oldState = {
      name: 'test'
    };
    const newState = userReducer(oldState, actions.changedPublicProfile({
      name: 'new test'
    }));
    expect(newState.name).toBe('new test');
  });

  it('FACEBOOK_LINKED, linked to true', () => {
    const oldState = {
      name: 'test'
    };
    const newState = userReducer(oldState, actions.facebookLinked());
    expect(newState.facebookLinked).toBe(true);
  });

  it('FACEBOOK_UNLINKED, linked to false', () => {
    const oldState = {
      name: 'test'
    };
    const newState = userReducer(oldState, actions.facebookUnlinked());
    expect(newState.facebookLinked).toBe(false);
  });

  it('REHYDRATE birthDayDate', () => {
    const expectDate = new Date();
    const oldState = {
      name: 'test',
      birthDayDate: expectDate.toString()
    };
    const newState = userReducer(oldState, {type: REHYDRATE, payload: oldState});
    expect(typeof newState.birthDayDate.getTime).toBe('function');
    expect(newState.birthDayDate.toString()).toBe(expectDate.toString());
  });
});
