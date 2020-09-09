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
      nestJsConnector: { ...initialState, userId: userId },
    };
    expect(selectors.selectUserId(state)).toEqual(userId);
  });

  it('should select userId', () => {
    const user = { id: 1, name: 'test' } as User;
    state = {
      nestJsConnector: { ...initialState, user },
    };
    expect(selectors.selectUser(state)).toEqual(user);
  });

  it('should select error', () => {
    const error = UserErrorType.USER_NOT_FOUND;
    state = {
      nestJsConnector: { ...initialState, error: error },
    };
    expect(selectors.selectError(state)).toEqual(error);
  });

  it('should select loading', () => {
    const loading = true;
    state = {
      nestJsConnector: { ...initialState, loading: loading },
    };
    expect(selectors.selectLoading(state)).toEqual(loading);
  });
});
