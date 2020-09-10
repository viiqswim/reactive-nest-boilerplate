import React from 'react';
import { Helmet } from 'react-helmet-async';

// import { AppLayout } from '../Layout';
import { Masthead } from './Masthead';
import { Login } from '../Login';
import { Signup } from '../Signup';
import { AppLayout } from '../Layout';

export function TestPage(props) {
  const isSignupPage = props.location.pathname.includes('signup');
  const isLoginPage = props.location.pathname.includes('login');
  const pageTitle = isLoginPage ? 'Log in' : 'Sign up';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="A Reactive Nest Boilerplate application"
        />
      </Helmet>
      <AppLayout>
        <Masthead isSignupPage={isSignupPage} isLoginPage={isLoginPage} />
        {isLoginPage && <Login />}
        {isSignupPage && <Signup />}
      </AppLayout>
    </>
  );
}
