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

import * as CompaniesComponents from '../components/Companies';

const dataProvider = crudProvider('http://localhost:3001');

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="companies" list={CompaniesComponents.CompaniesList} show={ShowGuesser} edit={CompaniesComponents.CompaniesEdit} create={CompaniesComponents.CompaniesCreate} icon={BusinessIcon} />
    </Admin>
);
export default App;
