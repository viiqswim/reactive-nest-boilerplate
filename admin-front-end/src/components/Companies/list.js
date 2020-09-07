// in src/posts.js
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  DeleteButton,
} from 'react-admin';

import { CompaniesFilter } from './filter';

export const CompaniesList = props => (
  <List filters={<CompaniesFilter />} {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <ShowButton />
      <DeleteButton />
    </Datagrid>
  </List>
);