import React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
} from "react-admin";
import { Typography, Divider, Box } from "@mui/material";
import { InternsByManager } from "./InternsByManager";
import { DepartmentStats } from "./DepartmentStats";

export const EmployeeShow = () => (
  <Show>
    <SimpleShowLayout>
      <Typography
        variant="h6"
        sx={{ color: "#333", mb: 1, fontWeight: "bold" }}
      >
        Profil de l&apos;Employé
      </Typography>
      <TextField source="id" label="Identifiant" />
      <TextField source="firstName" label="Prénom" />
      <TextField source="lastName" label="Nom" />
      <TextField source="email" label="Email" />
      <TextField source="department" label="Département" />
      <NumberField
        source="salary"
        label="Salaire"
        options={{ style: "currency", currency: "EUR" }}
      />
      <BooleanField source="active" label="Statut Actif" />

      <Box my={3}>
        <Divider />
      </Box>

      <Typography
        variant="h6"
        sx={{ color: "#333", mb: 1, fontWeight: "bold" }}
      >
        Indicateurs Métiers & Relations RH
      </Typography>

      <DepartmentStats />

      <InternsByManager />
    </SimpleShowLayout>
  </Show>
);
