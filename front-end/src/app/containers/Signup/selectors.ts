import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.signup || initialState;

export const selectUserEmail = createSelector(
  [selectDomain],
  signup => signup.userEmail,
);

export const selectPassword = createSelector(
  [selectDomain],
  signup => signup.password,
);

export const selectPasswordConfirm = createSelector(
  [selectDomain],
  signup => signup.passwordConfirm,
);

export const selectLoading = createSelector(
  [selectDomain],
  signup => signup.loading,
);

export const selectError = createSelector(
  [selectDomain],
  signup => signup.error,
);

export const selectUser = createSelector(
  [selectDomain],
  signup => signup.user,
);

export const selectIsLoggedIn = createSelector(
  [selectDomain],
  signup => signup.isLoggedIn,
);
