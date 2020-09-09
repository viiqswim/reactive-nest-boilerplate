import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.logInSignUp || initialState;

export const selectUserEmail = createSelector(
  [selectDomain],
  logInSignUpState => logInSignUpState.userEmail,
);

export const selectPassword = createSelector(
  [selectDomain],
  logInSignUpState => logInSignUpState.password,
);

export const selectLoading = createSelector(
  [selectDomain],
  logInSignUpState => logInSignUpState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  logInSignUpState => logInSignUpState.error,
);

export const selectUser = createSelector(
  [selectDomain],
  logInSignUpState => logInSignUpState.user,
);

export const selectIsLoggedIn = createSelector(
  [selectDomain],
  logInSignUpState => logInSignUpState.isLoggedIn,
);
