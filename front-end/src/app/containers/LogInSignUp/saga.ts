import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { selectUserEmail } from './selectors';
import { actions } from './slice';
import { User } from 'types/User';
import { UserErrorType } from './types';

/**
 * Github user request/response handler
 */
export function* getUser() {
  yield delay(500);
  // Select userEmail from store
  const userEmail: string = yield select(selectUserEmail);
  if (userEmail.length === 0) {
    yield put(actions.userError(UserErrorType.USER_ID_EMPTY));
    return;
  }
  const requestURL = `${process.env.REACT_APP_BACK_END_URL}/users/${userEmail}`;

  try {
    // Call our request helper (see 'utils/request')
    const user: User = yield call(request, requestURL);
    if (user.id) {
      yield put(actions.userLoaded(user));
    } else {
      yield put(actions.userError(UserErrorType.USER_HAS_NO_USER));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.userError(UserErrorType.USER_NOT_FOUND));
    } else {
      yield put(actions.userError(UserErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* logInSignUpSaga() {
  // Watches for loadUser actions and calls getUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadUser.type, getUser);
}
