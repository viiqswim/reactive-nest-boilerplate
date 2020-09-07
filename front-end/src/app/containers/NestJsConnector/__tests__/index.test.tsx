import React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
import { HelmetProvider } from 'react-helmet-async';
import { NestJsConnector, userErrorText } from '..';
import { configureAppStore } from 'store/configureStore';
import { actions, initialState } from '../slice';
import { UserErrorType } from '../types';

function* mocknestJsConnectorSaga() {}

jest.mock('../saga', () => ({
  nestJsConnectorSaga: mocknestJsConnectorSaga,
}));

const renderNestJsConnector = (store: Store) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <HelmetProvider>
          <NestJsConnector />
        </HelmetProvider>
      </ThemeProvider>
    </Provider>,
  );

describe('<NestJsConnector />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let component: ReturnType<typeof renderNestJsConnector>;

  beforeEach(() => {
    store = configureAppStore();
    component = renderNestJsConnector(store);
    store.dispatch(actions.userLoaded({}));
    expect(store.getState().nestJsConnector).toEqual(initialState);
  });
  afterEach(() => {
    component.unmount();
  });

  it("should fetch user on mount if userId isn't empty", () => {
    component.unmount();
    component = renderNestJsConnector(store);
    expect(initialState.userId).toBeTruthy();
    expect(store.getState().nestJsConnector.loading).toBe(true);
  });

  it("shouldn't fetch user on mount if userId is empty", () => {
    store.dispatch(actions.changeUserId(0));
    store.dispatch(actions.userLoaded({}));
    component.unmount();
    component = renderNestJsConnector(store);
    expect(store.getState().nestJsConnector.loading).toBe(false);
  });

  it('should dispatch action on userId change', () => {
    const input = component.container.querySelector('input');
    const userId = 1;
    fireEvent.change(input!, { target: { value: userId } });
    expect(store.getState().nestJsConnector.loading).toBe(true);
  });

  it('should change userId field value on action', () => {
    const userId = 1;
    const form = renderNestJsConnector(store);

    const input = form.container.querySelector('input');
    fireEvent.change(input!, { target: { value: userId } });

    const expectedValue = form.container.querySelector('input')?.value;
    expect(expectedValue).toBe(String(userId));
  });

  it('should display loading indicator when state is loading', () => {
    store.dispatch(actions.loadUsers());
    expect(component.container.querySelector('circle')).toBeInTheDocument();
  });

  it('should display list when user not empty', () => {
    const firstName = 'first name';
    store.dispatch(actions.userLoaded({ id: 1, firstName } as any));
    expect(component.queryByText(firstName)).toBeInTheDocument();
  });

  it('should display error when userError fired', () => {
    let error = UserErrorType.USER_NOT_FOUND;
    store.dispatch(actions.userError(error));
    expect(component.queryByText(userErrorText(error))).toBeInTheDocument();

    error = UserErrorType.USER_HAS_NO_USER;
    store.dispatch(actions.userError(error));
    expect(component.queryByText(userErrorText(error))).toBeInTheDocument();

    error = UserErrorType.USER_ID_EMPTY;
    store.dispatch(actions.userError(error));
    expect(component.queryByText(userErrorText(error))).toBeInTheDocument();

    error = UserErrorType.RESPONSE_ERROR;
    store.dispatch(actions.userError(error));
    expect(component.queryByText(userErrorText(error))).toBeInTheDocument();
  });
});
