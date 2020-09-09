import React from 'react';
import styled from 'styled-components/macro';
import { Logos } from './Logos';
import { Title } from 'app/containers/TestPage/components/Title';
import { Lead } from 'app/containers/TestPage/components/Lead';

export function Masthead() {
  return (
    <Wrapper>
      <Logos />
      <Title>This is a test page</Title>
      <Lead>The best test page ever</Lead>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
`;
