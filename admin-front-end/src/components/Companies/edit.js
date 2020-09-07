import * as React from "react";
import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';

export const CompaniesEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <NumberInput source="id" disabled />
            <TextInput source="name"/>
        </SimpleForm>
    </Edit>
);
