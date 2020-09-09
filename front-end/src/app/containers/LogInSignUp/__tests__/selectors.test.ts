import * as selectors from '../selectors';
import { RootState } from 'types';
import { UserErrorType } from '../types';
import { initialState } from '../slice';
import { User } from 'types/User';

describe('LogInSignUp selectors', () => {
  let state: RootState = {};

  beforeEach(() => {
    state = {};
  });

  it('should select the initial state', () => {
    expect(selectors.selectUserId(state)).toEqual(initialState.userId);
  });

  it('should select userId', () => {
    const userId = 'test';
    state = {
      logInSignUp: { ...initialState, userId: userId },
    };
    expect(selectors.selectUserId(state)).toEqual(userId);
  });

  it('should select userId', () => {
    const user = { id: 1, name: 'test' } as User;
    state = {
      logInSignUp: { ...initialState, user },
    };
    expect(selectors.selectUser(state)).toEqual(user);
  });

  it('should select error', () => {
    const error = UserErrorType.USER_NOT_FOUND;
    state = {
      logInSignUp: { ...initialState, error: error },
    };
    expect(selectors.selectError(state)).toEqual(error);
  });

  it('should select loading', () => {
    const loading = true;
    state = {
      logInSignUp: { ...initialState, loading: loading },
    };
    expect(selectors.selectLoading(state)).toEqual(loading);
  });
});
