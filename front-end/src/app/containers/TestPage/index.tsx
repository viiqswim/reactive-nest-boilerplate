import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';

import { sliceKey, reducer, actions } from '../LogInSignup/slice';
import { logInSignUpSaga } from '../LogInSignup/saga';
import { selectIsLoggedIn, selectUser } from '../LogInSignup/selectors';
import { NavBar } from '../NavBar';
import { Masthead } from './Masthead';
import { PageWrapper } from 'app/components/PageWrapper';
import { SignUp } from './SignUp';

import { User } from 'types/User';
import { firebaseApp } from '../../../firebaseApp';

export function TestPage() {
  useInjectReducer({ key: sliceKey, reducer });
  useInjectSaga({ key: sliceKey, saga: logInSignUpSaga });
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

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <>
      <Helmet>
        <title>Test Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <NavBar isLoggedIn={isLoggedIn} user={user} />
      <PageWrapper>
        <Masthead />
        <SignUp />
      </PageWrapper>
    </>
  );
}
