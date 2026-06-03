import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  BooleanInput,
  ReferenceInput,
  required,
  email,
} from "react-admin";
import { useWatch } from "react-hook-form";

const validateRequired = required("Ce champ est obligatoire");
const validateEmail = [
  required("L'email est obligatoire"),
  email("Format d'email invalide"),
];

export const InternCreate = () => {
  const isRemunerated = useWatch({ name: "isRemunerated" });
  const selectedDepartment = useWatch({ name: "department" });

  const validateStipend = (value: number | string | null | undefined) => {
    if (isRemunerated) {
      if (value === undefined || value === null || value === "") {
        return "La rémunération est obligatoire si le stagiaire est payé";
      }
      if (typeof value === "number" && value <= 0) {
        return "Le montant de la gratification doit être supérieur à 0 €";
      }
    }
    return undefined;
  };

  return (
    <Create redirect="list">
      <SimpleForm>
        <TextInput
          source="firstName"
          label="Prénom"
          validate={validateRequired}
        />
        <TextInput source="lastName" label="Nom" validate={validateRequired} />
        <TextInput source="email" label="Email" validate={validateEmail} />

        <SelectInput
          source="department"
          label="Département / Domaine"
          validate={validateRequired}
          choices={[
            { id: "Informatique", name: "Informatique" },
            { id: "Marketing", name: "Marketing" },
            { id: "RH", name: "RH" },
            { id: "Finance", name: "Finance" },
          ]}
        />

        <ReferenceInput
          source="managerId"
          reference="employees"
          queryOptions={{
            enabled: !!selectedDepartment,
            meta: {
              filter: {
                active: true,
                department: selectedDepartment,
              },
            },
          }}
        >
          <SelectInput
            label="Manager Rattaché"
            optionText={(record) => `${record.firstName} ${record.lastName}`}
            validate={validateRequired}
            disabled={!selectedDepartment}
            emptyText="Aucun manager actif disponible dans ce domaine"
          />
        </ReferenceInput>

        <BooleanInput
          source="isRemunerated"
          label="Ce stagiaire est-il rémunéré ?"
          defaultValue={false}
        />

        <NumberInput
          source="stipend"
          label="salaire (€)"
          validate={validateStipend}
          disabled={!isRemunerated}
        />
      </SimpleForm>
    </Create>
  );
};
