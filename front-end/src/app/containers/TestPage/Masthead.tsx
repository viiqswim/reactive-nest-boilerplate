import React from 'react';
import { Logos } from './Logos';
import { Title } from 'app/containers/TestPage/components/Title';
import { Wrapper } from 'app/components/Wrapper';

export function Masthead({ isSignupPage, isLoginPage }) {
  return (
    <Wrapper>
      <Logos />
      {isLoginPage && <Title>Log In</Title>}
      {isSignupPage && <Title>Sign Up</Title>}
    </Wrapper>
  );
}
