// in src/App.js
import * as React from "react";
import {
  Admin,
  Resource,
  ListGuesser,
  ShowGuesser,
  EditGuesser,
} from 'react-admin';
import crudProvider from 'ra-data-nestjsx-crud'

const dataProvider = crudProvider('http://localhost:3001');

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="companies" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
    </Admin>
);
export default App;
