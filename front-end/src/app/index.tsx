/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useDispatch } from 'react-redux';

import { User } from 'types/User';
import { sliceKey, reducer, actions } from '../app/containers/Login/slice';
import { loginSaga } from '../app/containers/Login/saga';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

import { HomePage } from './containers/HomePage/Loadable';
import { TestPage } from './containers/TestPage/Loadable';
import { NotFoundPage } from './containers/NotFoundPage/Loadable';
import { firebaseApp } from '../../src/firebaseApp';

import 'antd/dist/antd.css';

export function App() {
  useInjectReducer({ key: sliceKey, reducer });
  useInjectSaga({ key: sliceKey, saga: loginSaga });
  const dispatch = useDispatch();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        const userToSave: User = {
          id: 0,
          uid: user.uid,
          userEmail: user.email,
        };
        dispatch(actions.changeIsLoggedIn(true));
        dispatch(actions.userLoaded(userToSave));
      }
    });
  });

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={HomePage} />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/login'}
          component={TestPage}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/signup'}
          component={TestPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
