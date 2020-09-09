import React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
import { HelmetProvider } from 'react-helmet-async';
import { LogInSignUp, userErrorText } from '..';
import { configureAppStore } from 'store/configureStore';
import { actions, initialState } from '../slice';
import { UserErrorType } from '../types';

function* mocklogInSignUpSaga() {}

jest.mock('../saga', () => ({
  logInSignUpSaga: mocklogInSignUpSaga,
}));

const renderLogInSignUp = (store: Store) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <HelmetProvider>
          <LogInSignUp />
        </HelmetProvider>
      </ThemeProvider>
    </Provider>,
  );

describe('<LogInSignUp />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let component: ReturnType<typeof renderLogInSignUp>;

  beforeEach(() => {
    store = configureAppStore();
    component = renderLogInSignUp(store);
    store.dispatch(actions.userLoaded({}));
    expect(store.getState().logInSignUp).toEqual(initialState);
  });
  afterEach(() => {
    component.unmount();
  });

  it("should fetch user on mount if userEmail isn't empty", () => {
    component.unmount();
    component = renderLogInSignUp(store);
    expect(initialState.userEmail).toBeTruthy();
    expect(store.getState().logInSignUp.loading).toBe(true);
  });

  it("shouldn't fetch user on mount if userEmail is empty", () => {
    store.dispatch(actions.changeUserEmail(0));
    store.dispatch(actions.userLoaded({}));
    component.unmount();
    component = renderLogInSignUp(store);
    expect(store.getState().logInSignUp.loading).toBe(false);
  });

  it('should dispatch action on userEmail change', () => {
    const input = component.container.querySelector('input');
    const userEmail = 1;
    fireEvent.change(input!, { target: { value: userEmail } });
    expect(store.getState().logInSignUp.loading).toBe(true);
  });

  it('should change userEmail field value on action', () => {
    const userEmail = 1;
    const form = renderLogInSignUp(store);

    const input = form.container.querySelector('input');
    fireEvent.change(input!, { target: { value: userEmail } });

    const expectedValue = form.container.querySelector('input')?.value;
    expect(expectedValue).toBe(String(userEmail));
  });

  it('should display loading indicator when state is loading', () => {
    store.dispatch(actions.loadUser());
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
