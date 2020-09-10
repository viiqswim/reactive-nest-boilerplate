import React from 'react';
import { Button } from 'antd';

import { ReactComponent as DocumentationIcon } from './assets/documentation-icon.svg';

export function LoggedInNavigation(props) {
  return (
    <Button type="ghost" onClick={props.logoutUser}>
      <DocumentationIcon />
      Log out
    </Button>
  );
}
