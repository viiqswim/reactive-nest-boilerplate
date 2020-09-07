import * as React from "react";
import { Create, SimpleForm, TextInput } from 'react-admin';

export const CompaniesCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name"/>
        </SimpleForm>
    </Create>
);
