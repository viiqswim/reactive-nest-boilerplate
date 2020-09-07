import * as selectors from '../selectors';
import { RootState } from 'types';
import { RepoErrorType } from '../types';
import { initialState } from '../slice';
import { User } from 'types/Repo';

describe('NestJsConnector selectors', () => {
  let state: RootState = {};

  beforeEach(() => {
    state = {};
  });

  it('should select the initial state', () => {
    expect(selectors.selectUsername(state)).toEqual(initialState.username);
  });

  it('should select username', () => {
    const username = 'test';
    state = {
      nestJsConnector: { ...initialState, username: username },
    };
    expect(selectors.selectUsername(state)).toEqual(username);
  });

  it('should select username', () => {
    const user = { id: 1, name: 'test' } as User;
    state = {
      nestJsConnector: { ...initialState, user },
    };
    expect(selectors.selectUser(state)).toEqual(user);
  });

  it('should select error', () => {
    const error = RepoErrorType.USER_NOT_FOUND;
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
