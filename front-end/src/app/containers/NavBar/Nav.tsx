import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { ReactComponent as DocumentationIcon } from './assets/documentation-icon.svg';
import { ReactComponent as GithubIcon } from './assets/github-icon.svg';

export function Nav({ isLoggedIn, user }) {
  return (
    <Wrapper>
      <ItemLink to="/">
        <DocumentationIcon />
        Home Page
      </ItemLink>
      <ItemLink to="/test">
        <DocumentationIcon />
        Test Page
      </ItemLink>
      {!isLoggedIn && (
        <Item
          href="https://cansahin.gitbook.io/react-boilerplate-cra-template/"
          target="_blank"
          title="Documentation Page"
          rel="noopener noreferrer"
        >
          <DocumentationIcon />
          Documentation
        </Item>
      )}
      {!isLoggedIn && (
        <Item
          href="https://github.com/react-boilerplate/react-boilerplate-cra-template"
          target="_blank"
          title="Github Page"
          rel="noopener noreferrer"
        >
          <GithubIcon />
          Github
        </Item>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;

const Item = styled.a`
  color: ${p => p.theme.primary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;

const ItemLink = styled(Link)`
  color: ${p => p.theme.primary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;
