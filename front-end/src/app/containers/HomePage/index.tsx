import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Masthead } from './Masthead';
import { Features } from './Features';
import { AppLayout } from '../Layout';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A Reactive Nest Boilerplate application homepage"
        />
      </Helmet>
      <AppLayout>
        <Masthead />
        <Features />
      </AppLayout>
    </>
  );
}
