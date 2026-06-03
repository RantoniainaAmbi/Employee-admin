import React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  EditButton,
  DeleteButton,
  TextInput,
  SelectInput,
} from "react-admin";
import { QuickStatusToggle } from "./QuickStatusToggle";

const employeeFilters = [
  <TextInput label="Rechercher" source="q" alwaysOn key="q" />,
  <SelectInput
    label="Département"
    source="department"
    key="department"
    choices={[
      { id: "Informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
      { id: "Finance", name: "Finance" },
    ]}
  />,
];

export const EmployeeList = () => (
  <List filters={employeeFilters} perPage={5}>
    <Datagrid rowClick="show">
      <TextField source="firstName" label="Prénom" />
      <TextField source="lastName" label="Nom" />
      <TextField source="email" label="Email" />
      <TextField source="department" label="Département" />
      <NumberField
        source="salary"
        label="Salaire"
        options={{ style: "currency", currency: "EUR" }}
      />
      <BooleanField source="active" label="Actif" />

      <QuickStatusToggle />

      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
