/*
 * Signup Slice
 *
 * Here we define:
 * - The shape of our container's slice of Redux store,
 * - All the actions which can be triggered for this slice, including their effects on the store.
 *
 * Note that, while we are using dot notation in our reducer, we are not actually mutating the state
 * manually. Under the hood, we use immer to apply these updates to a new copy of the state.
 * Please see https://immerjs.github.io/immer/docs/introduction for more information.
 *
 */

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, UserErrorType } from './types';
import { User } from 'types/User';

// The initial state of the Signup container
export const initialState: ContainerState = {
  isLoggedIn: false,
  userEmail: '',
  password: '',
  passwordConfirm: '',
  user: {},
  loading: false,
  error: null,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    changeIsLoggedIn(state, action: PayloadAction<any>) {
      state.isLoggedIn = action.payload;
    },
    changeUserEmail(state, action: PayloadAction<any>) {
      state.userEmail = action.payload;
    },
    changePassword(state, action: PayloadAction<any>) {
      state.password = action.payload;
    },
    changePasswordConfirm(state, action: PayloadAction<any>) {
      state.passwordConfirm = action.payload;
    },
    loadUser(state) {
      state.loading = true;
      state.error = null;
      state.user = {};
    },
    userLoaded(state, action: PayloadAction<User>) {
      const user = action.payload;
      state.user = {
        userEmail: user.userEmail,
        id: 1,
        uid: user.uid,
      };
      state.isLoggedIn = true;
      state.loading = false;
    },
    userError(state, action: PayloadAction<UserErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
    signupUser(state) {
      state.loading = true;
      state.error = null;
      state.user = {};
    },
    logoutUser(state) {
      state.loading = false;
      state.error = null;
      state.user = {};
    },
  },
});

export const { actions, reducer, name: sliceKey } = signupSlice;
