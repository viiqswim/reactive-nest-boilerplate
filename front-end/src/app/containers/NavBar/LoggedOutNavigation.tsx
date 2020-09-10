import React from 'react';

import { ReactComponent as GithubIcon } from './assets/github-icon.svg';
import { ReactComponent as DocumentationIcon } from './assets/documentation-icon.svg';
import { ItemLink } from './ItemLink';
import { Item } from './Item';

export function LoggedOutNavigation() {
  return (
    <>
      <ItemLink to="/login">
        <DocumentationIcon />
        Log in
      </ItemLink>
      <Item
        href="https://cansahin.gitbook.io/react-boilerplate-cra-template/"
        target="_blank"
        title="Documentation Page"
        rel="noopener noreferrer"
      >
        <DocumentationIcon />
        Documentation
      </Item>
      <Item
        href="https://github.com/react-boilerplate/react-boilerplate-cra-template"
        target="_blank"
        title="Github Page"
        rel="noopener noreferrer"
      >
        <GithubIcon />
        Github
      </Item>
    </>
  );
}
