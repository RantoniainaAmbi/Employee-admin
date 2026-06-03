import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  BooleanInput,
  ReferenceInput,
  useRecordContext,
  required,
  email,
} from "react-admin";
import { useWatch } from "react-hook-form";

const InternTitle = () => {
  const record = useRecordContext();
  return record ? (
    <span>
      Modifier : {record.firstName} {record.lastName}
    </span>
  ) : (
    <span>Modifier le stagiaire</span>
  );
};

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
    <Edit title={<InternTitle />} redirect="list">
      <SimpleForm>
        <TextInput source="id" label="Identifiant" disabled />

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
        />

        <NumberInput
          source="stipend"
          label="Salaire (€)"
          validate={validateStipend}
          disabled={!isRemunerated}
        />
      </SimpleForm>
    </Edit>
  );
};
