import React from "react";
import {
  List,
  Datagrid,
  TextField,
  FunctionField,
  ReferenceField,
  EditButton,
  DeleteButton,
  TextInput,
  SelectInput,
} from "react-admin";

const internFilters = [
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

  <SelectInput
    label="Payé"
    source="paid"
    key="paid"
    choices={[
      { id: true, name: "Oui" },
      { id: false, name: "Non" },
    ]}
  />,
];

export const InternList = () => (
  <List filters={internFilters} perPage={5}>
    <Datagrid rowClick="show">
      <TextField source="firstName" label="Prénom" />
      <TextField source="lastName" label="Nom" />
      <TextField source="email" label="Email" />
      <TextField source="department" label="Département" />

      <FunctionField
        label="Payé"
        render={(record) => (record?.paid ? "Oui" : "Non")}
      />

      <FunctionField
        label="salaire"
        render={(record) =>
          record?.paid && record.stipend
            ? new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(record.stipend)
            : "Non rémunéré"
        }
      />

      <ReferenceField source="managerId" reference="employees" label="Manager">
        <FunctionField
          render={(record) =>
            record ? `${record.firstName} ${record.lastName}` : "-"
          }
        />
      </ReferenceField>

      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
