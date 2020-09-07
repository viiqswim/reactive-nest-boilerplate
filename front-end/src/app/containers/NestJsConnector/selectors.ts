import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) =>
  state.nestJsConnector || initialState;

export const selectUsername = createSelector(
  [selectDomain],
  nestJsConnectorState => nestJsConnectorState.username,
);

export const selectLoading = createSelector(
  [selectDomain],
  nestJsConnectorState => nestJsConnectorState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  nestJsConnectorState => nestJsConnectorState.error,
);

export const selectUser = createSelector(
  [selectDomain],
  nestJsConnectorState => nestJsConnectorState.user,
);
