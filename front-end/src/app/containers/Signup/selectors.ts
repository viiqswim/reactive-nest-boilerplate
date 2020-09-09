import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.login || initialState;

export const selectUserEmail = createSelector(
  [selectDomain],
  login => login.userEmail,
);

export const selectPassword = createSelector(
  [selectDomain],
  login => login.password,
);

export const selectLoading = createSelector(
  [selectDomain],
  login => login.loading,
);

export const selectError = createSelector(
  [selectDomain],
  login => login.error,
);

export const selectUser = createSelector(
  [selectDomain],
  login => login.user,
);

export const selectIsLoggedIn = createSelector(
  [selectDomain],
  login => login.isLoggedIn,
);
