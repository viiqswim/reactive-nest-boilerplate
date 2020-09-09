import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { selectUserEmail, selectPassword, selectIsLoggedIn } from './selectors';
import { actions } from './slice';
import { User } from 'types/User';
import { UserErrorType } from './types';
import { firebaseApp } from '../../../firebaseApp';

export function* loginUser() {
  yield delay(500);
  // Select userEmail from store
  const userEmail: string = yield select(selectUserEmail);
  const password: string = yield select(selectPassword);

  if (userEmail.length === 0) {
    yield put(actions.userError(UserErrorType.USER_ID_EMPTY));
    return;
  }

  try {
    const user: User = yield call(login, userEmail, password);
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

export function* logoutUser() {
  yield delay(500);
  const isLoggedIn: boolean = yield select(selectIsLoggedIn);
  if (!isLoggedIn) {
    return;
  }

  try {
    const user = yield call(logout);
    if (user.uid) {
      yield put(actions.changeIsLoggedIn(false));
    } else {
      yield put(actions.userError(UserErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.userError(UserErrorType.USER_NOT_FOUND));
    } else {
      yield put(actions.userError(UserErrorType.RESPONSE_ERROR));
    }
  }
}

export async function login(userEmail: string, password: string): Promise<any> {
  const response = await firebaseApp
    .auth()
    .signInWithEmailAndPassword(userEmail, password);

  return {
    uid: response?.user?.uid,
    userEmail: response?.user?.email,
  };
}

export async function logout(): Promise<any> {
  const response = await firebaseApp
    .auth()
    .signOut()
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });

  return response;
}

/**
 * Root saga manages watcher lifecycle
 */
export function* logInSignUpSaga() {
  // Watches for loadUser actions and calls getUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loginUser.type, loginUser);
  yield takeLatest(actions.logoutUser.type, logoutUser);
}
