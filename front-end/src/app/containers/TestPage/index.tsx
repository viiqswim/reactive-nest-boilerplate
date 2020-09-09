import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../NavBar';
import { Masthead } from './Masthead';
import { PageWrapper } from 'app/components/PageWrapper';

export function TestPage() {
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
        <Masthead />
      </PageWrapper>
    </>
  );
}
