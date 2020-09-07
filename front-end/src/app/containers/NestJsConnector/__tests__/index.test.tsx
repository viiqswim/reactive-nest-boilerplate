import React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
import { HelmetProvider } from 'react-helmet-async';
import { NestJsConnector, repoErrorText } from '..';
import { configureAppStore } from 'store/configureStore';
import { actions, initialState } from '../slice';
import { RepoErrorType } from '../types';

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
    store.dispatch(actions.reposLoaded([]));
    expect(store.getState().nestJsConnector).toEqual(initialState);
  });
  afterEach(() => {
    component.unmount();
  });

  it("should fetch repos on mount if username isn't empty", () => {
    component.unmount();
    component = renderNestJsConnector(store);
    expect(initialState.username.length).toBeGreaterThan(0);
    expect(store.getState().nestJsConnector.loading).toBe(true);
  });

  it("shouldn't fetch repos on mount if username is empty", () => {
    store.dispatch(actions.changeUsername(''));
    store.dispatch(actions.reposLoaded([]));
    component.unmount();
    component = renderNestJsConnector(store);
    expect(store.getState().nestJsConnector.loading).toBe(false);
  });

  it('should dispatch action on username change', () => {
    const input = component.container.querySelector('input');
    fireEvent.change(input!, { target: { value: 'test' } });
    expect(store.getState().nestJsConnector.loading).toBe(true);
  });

  it('should change username field value on action', () => {
    const value = 'test';
    const form = renderNestJsConnector(store);

    const input = form.container.querySelector('input');
    fireEvent.change(input!, { target: { value: value } });

    expect(form.container.querySelector('input')?.value).toBe(value);
  });

  it('should display loading indicator when state is loading', () => {
    store.dispatch(actions.loadRepos());
    expect(component.container.querySelector('circle')).toBeInTheDocument();
  });

  it('should display list when repos not empty', () => {
    const repoName = 'testRepo';
    store.dispatch(
      actions.reposLoaded([{ id: 'test', name: repoName } as any]),
    );
    expect(component.queryByText(repoName)).toBeInTheDocument();
  });

  it('should display error when repoError fired', () => {
    let error = RepoErrorType.USER_NOT_FOUND;
    store.dispatch(actions.repoError(error));
    expect(component.queryByText(repoErrorText(error))).toBeInTheDocument();

    error = RepoErrorType.USER_HAS_NO_REPO;
    store.dispatch(actions.repoError(error));
    expect(component.queryByText(repoErrorText(error))).toBeInTheDocument();

    error = RepoErrorType.USERNAME_EMPTY;
    store.dispatch(actions.repoError(error));
    expect(component.queryByText(repoErrorText(error))).toBeInTheDocument();

    error = RepoErrorType.RESPONSE_ERROR;
    store.dispatch(actions.repoError(error));
    expect(component.queryByText(repoErrorText(error))).toBeInTheDocument();

    error = RepoErrorType.GITHUB_RATE_LIMIT;
    store.dispatch(actions.repoError(error));
    expect(component.queryByText(repoErrorText(error))).toBeInTheDocument();
  });
});
