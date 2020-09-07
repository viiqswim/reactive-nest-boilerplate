/*
 * NestJsConnector Slice
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

// The initial state of the NestJsConnector container
export const initialState: ContainerState = {
  userId: 22,
  user: {},
  loading: false,
  error: null,
};

const nestJsConnectorSlice = createSlice({
  name: 'nestJsConnector',
  initialState,
  reducers: {
    changeUserId(state, action: PayloadAction<number>) {
      state.userId = Number(action.payload);
    },
    loadUser(state) {
      state.loading = true;
      state.error = null;
      state.user = {};
    },
    userLoaded(state, action: PayloadAction<User>) {
      const user = action.payload;
      state.user = user;
      state.loading = false;
    },
    userError(state, action: PayloadAction<UserErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = nestJsConnectorSlice;
