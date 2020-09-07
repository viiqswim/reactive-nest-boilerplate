import * as slice from '../slice';
import { ContainerState, RepoErrorType } from '../types';
import { User } from 'types/Repo';

describe('NestJsConnector slice', () => {
  let state: ContainerState;

  beforeEach(() => {
    state = slice.initialState;
  });

  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: '' })).toEqual(state);
  });

  it('should handle changeUsername', () => {
    const text = 'test';
    expect(slice.reducer(state, slice.actions.changeUsername(text))).toEqual<
      ContainerState
    >({
      ...slice.initialState,
      username: text,
    });
  });

  it('should handle loadRepos', () => {
    expect(slice.reducer(state, slice.actions.loadRepos())).toEqual<
      ContainerState
    >({
      ...slice.initialState,
      loading: true,
      user: {},
      error: null,
    });
  });

  it('should handle userLoaded', () => {
    const user = { id: 1, name: 'test' } as User;
    expect(slice.reducer(state, slice.actions.userLoaded(user))).toEqual<
      ContainerState
    >({
      ...slice.initialState,
      loading: false,
      user: user,
    });
  });

  it('should handle userError', () => {
    const userError = RepoErrorType.USER_NOT_FOUND;
    expect(slice.reducer(state, slice.actions.userError(userError))).toEqual<
      ContainerState
    >({
      ...slice.initialState,
      error: userError,
    });
  });
});
