import { put, takeLatest } from 'redux-saga/effects';
import * as slice from '../slice';

import { logInSignUpSaga, getUser } from '../saga';
import { UserErrorType } from '../types';
import { User } from 'types/User';

describe('getUser Saga', () => {
  let userId: any;
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

  it('should return error if userId is empty', () => {
    userId = '';
    const putDescriptor = getUserIterator.next(userId).value;
    expect(putDescriptor).toEqual(
      put(slice.actions.userError(UserErrorType.USER_ID_EMPTY)),
    );

    const iteration = getUserIterator.next();
    expect(iteration.done).toBe(true);
  });

  it('should dispatch the userLoaded action if it requests the data successfully', () => {
    userId = 'test';
    user = {
      id: 1,
      firstName: 'user1',
    };

    const requestDescriptor = getUserIterator.next(userId).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getUserIterator.next(user).value;
    expect(putDescriptor).toEqual(put(slice.actions.userLoaded(user)));
  });

  it('should dispatch the user not found error', () => {
    userId = 'test';

    const requestDescriptor = getUserIterator.next(userId).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getUserIterator.throw({ response: { status: 404 } })
      .value;
    expect(putDescriptor).toEqual(
      put(slice.actions.userError(UserErrorType.USER_NOT_FOUND)),
    );
  });
  it('should dispatch the user has no user error', () => {
    userId = 'test';
    user = {};

    const requestDescriptor = getUserIterator.next(userId).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getUserIterator.next(user).value;
    expect(putDescriptor).toEqual(
      put(slice.actions.userError(UserErrorType.USER_HAS_NO_USER)),
    );
  });

  it('should dispatch the response error', () => {
    userId = 'test';

    const requestDescriptor = getUserIterator.next(userId).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getUserIterator.throw(new Error('some error')).value;
    expect(putDescriptor).toEqual(
      put(slice.actions.userError(UserErrorType.RESPONSE_ERROR)),
    );
  });
});

describe('logInSignUpSaga Saga', () => {
  const nestJsConnectorIterator = logInSignUpSaga();
  it('should start task to watch for loadUser action', () => {
    const takeLatestDescriptor = nestJsConnectorIterator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(slice.actions.loadUser.type, getUser),
    );
  });
});
