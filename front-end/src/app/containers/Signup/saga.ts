import { call, put, select, takeLatest } from 'redux-saga/effects';
import { selectUserEmail, selectPassword, selectPasswordConfirm, selectIsLoggedIn } from './selectors';
import { actions } from './slice';
import { User } from 'types/User';
import { UserErrorType } from './types';
import { firebaseApp } from '../../../firebaseApp';

export function* signupUser() {
  // Select userEmail from store
  const userEmail: string = yield select(selectUserEmail);
  const password: string = yield select(selectPassword);
  const passwordConfirm: string = yield select(selectPasswordConfirm);

  if (password !== passwordConfirm) {
    yield put(actions.userError(UserErrorType.PASSWORDS_DO_NOT_MATCH));
    return;
  }

  try {
    const user: User = yield call(signup, userEmail, password);
    if (user.uid) {
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

export async function signup(
  userEmail: string,
  password: string,
): Promise<any> {
  const response = await firebaseApp
    .auth()
    .createUserWithEmailAndPassword(userEmail, password);

  return {
    uid: response?.user?.uid,
    userEmail: response?.user?.email,
  };
}

/**
 * Root saga manages watcher lifecycle
 */
export function* signupSaga() {
  // Watches for loadUser actions and calls getUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.signupUser.type, signupUser);
}
