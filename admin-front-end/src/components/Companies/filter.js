import * as React from "react";
import { Filter, TextInput } from 'react-admin';

export const CompaniesFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Name search" source="name" alwaysOn />
    </Filter>
);
