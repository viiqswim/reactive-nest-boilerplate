import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.login || initialState;

export const selectUserEmail = createSelector(
  [selectDomain],
  loginState => loginState.userEmail,
);

export const selectPassword = createSelector(
  [selectDomain],
  loginState => loginState.password,
);

export const selectLoading = createSelector(
  [selectDomain],
  loginState => loginState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  loginState => loginState.error,
);

export const selectUser = createSelector(
  [selectDomain],
  loginState => loginState.user,
);

export const selectIsLoggedIn = createSelector(
  [selectDomain],
  loginState => loginState.isLoggedIn,
);
