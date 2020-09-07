// in src/App.js
import * as React from "react";
import {
  Admin,
  Resource,
  ShowGuesser,
  // ListGuesser,
  // EditGuesser,
} from 'react-admin';
import BusinessIcon from '@material-ui/icons/Business';
import crudProvider from 'ra-data-nestjsx-crud'

import {
  CompaniesList,
  CompaniesCreate,
  CompaniesEdit,
} from '../components/Companies';

const dataProvider = crudProvider('http://localhost:3001');

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="companies" list={CompaniesList} show={ShowGuesser} edit={CompaniesEdit} create={CompaniesCreate} icon={BusinessIcon} />
    </Admin>
);
export default App;
