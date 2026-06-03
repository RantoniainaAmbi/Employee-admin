import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  BooleanInput,
  required,
  minValue,
} from "react-admin";

const validateRequired = required("Ce champ est obligatoire");
const validateSalary = [
  required("Le salaire est obligatoire"),
  minValue(1500, "Le salaire minimum est de 1 500 €"),
];

export const EmployeeEdit = () => (
  <Edit redirect="list">
    <SimpleForm>
      <TextInput source="id" label="Identifiant" disabled />

      <TextInput
        source="firstName"
        label="Prénom"
        validate={validateRequired}
      />
      <TextInput source="lastName" label="Nom" validate={validateRequired} />
      <TextInput source="email" label="Email" validate={validateRequired} />
      <SelectInput
        source="department"
        label="Département"
        validate={validateRequired}
        choices={[
          { id: "Informatique", name: "Informatique" },
          { id: "Marketing", name: "Marketing" },
          { id: "RH", name: "RH" },
          { id: "Finance", name: "Finance" },
        ]}
      />
      <NumberInput source="salary" label="Salaire" validate={validateSalary} />
      <BooleanInput source="active" label="Actif" />
    </SimpleForm>
  </Edit>
);
