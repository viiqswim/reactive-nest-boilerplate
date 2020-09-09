import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useDispatch } from 'react-redux';

import { User } from 'types/User';
import { sliceKey, reducer, actions } from '../Login/slice';
import { loginSaga } from '../Login/saga';
import { NavBar } from '../NavBar';
import { Masthead } from './Masthead';
import { PageWrapper } from 'app/components/PageWrapper';
import { Login } from '../Login';
import { Signup } from '../Signup';

import { firebaseApp } from '../../../firebaseApp';

export function TestPage(props) {
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

  const isSignupPage = props.location.pathname.includes('signup');
  const isLoginPage = props.location.pathname.includes('login');

  return (
    <>
      <Helmet>
        <title>Test Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <Masthead isSignupPage={isSignupPage} isLoginPage={isLoginPage} />
        {isLoginPage && <Login />}
        {isSignupPage && <Signup />}
      </PageWrapper>
    </>
  );
}
