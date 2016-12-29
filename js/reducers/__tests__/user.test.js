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

  it.only('FACEBOOK_LINKED, linked to true', () => {
    const oldState = {
      name: 'test'
    };
    const newState = userReducer(oldState, actions.facebookLinked());
    expect(newState.facebookLinked).toBe(true);
  })

  it('FACEBOOK_UNLINKED, linked to false', () => {
    const oldState = {
      name: 'test'
    };
    const newState = userReducer(oldState, actions.facebookUnlinked());
    expect(newState.facebookLinked).toBe(false);
  })
});
