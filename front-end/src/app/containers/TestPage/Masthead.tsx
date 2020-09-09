import React from 'react';
import { Logos } from './Logos';
import { Title } from 'app/containers/TestPage/components/Title';
import { Wrapper } from 'app/components/Wrapper';

export function Masthead() {
  return (
    <Wrapper>
      <Logos />
      <Title>Sign up</Title>
    </Wrapper>
  );
}
