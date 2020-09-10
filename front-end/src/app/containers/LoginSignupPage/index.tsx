import React from 'react';
import { Helmet } from 'react-helmet-async';

import { NavBar } from '../NavBar';
import { Masthead } from './Masthead';
import { PageWrapper } from 'app/components/PageWrapper';
import { Login } from '../Login';
import { Signup } from '../Signup';

export function TestPage(props) {
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
