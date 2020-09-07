import { put, takeLatest } from 'redux-saga/effects';
import * as slice from '../slice';

import { nestJsConnectorSaga, getUser } from '../saga';
import { RepoErrorType } from '../types';
import { User } from 'types/Repo';

describe('getUser Saga', () => {
  let username: any;
  let user: User;
  let getUserIterator: any;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getUserIterator = getUser();
    const delayDescriptor = getUserIterator.next().value;
    expect(delayDescriptor).toMatchSnapshot();

    const selectDescriptor = getUserIterator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should return error if username is empty', () => {
    username = '';
    const putDescriptor = getUserIterator.next(username).value;
    expect(putDescriptor).toEqual(
      put(slice.actions.repoError(RepoErrorType.USERNAME_EMPTY)),
    );

    const iteration = getUserIterator.next();
    expect(iteration.done).toBe(true);
  });

  it('should dispatch the userLoaded action if it requests the data successfully', () => {
    username = 'test';
    user = {
      id: 1,
      firstName: 'repo1',
    };

    const requestDescriptor = getUserIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getUserIterator.next(user).value;
    expect(putDescriptor).toEqual(put(slice.actions.userLoaded(user)));
  });

  it('should dispatch the user not found error', () => {
    username = 'test';

    const requestDescriptor = getUserIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getUserIterator.throw({ response: { status: 404 } })
      .value;
    expect(putDescriptor).toEqual(
      put(slice.actions.repoError(RepoErrorType.USER_NOT_FOUND)),
    );
  });
  it('should dispatch the user has no repo error', () => {
    username = 'test';
    user = {};

    const requestDescriptor = getUserIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getUserIterator.next(user).value;
    expect(putDescriptor).toEqual(
      put(slice.actions.repoError(RepoErrorType.USER_HAS_NO_REPO)),
    );
  });

  it('should dispatch the response error', () => {
    username = 'test';

    const requestDescriptor = getUserIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getUserIterator.throw(new Error('some error')).value;
    expect(putDescriptor).toEqual(
      put(slice.actions.repoError(RepoErrorType.RESPONSE_ERROR)),
    );
  });
});

describe('nestJsConnectorSaga Saga', () => {
  const nestJsConnectorIterator = nestJsConnectorSaga();
  it('should start task to watch for loadRepos action', () => {
    const takeLatestDescriptor = nestJsConnectorIterator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(slice.actions.loadRepos.type, getUser),
    );
  });
});
