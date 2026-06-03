import React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  EmailField,
  BooleanField,
  FunctionField,
  ReferenceField,
} from "react-admin";
import { Typography, Divider, Box } from "@mui/material";
import { ManagerCard } from "./ManagerCard";

export const InternShow = () => (
  <Show>
    <SimpleShowLayout>
      <Typography variant="h6" sx={{ color: "#333", mb: 1 }}>
        Informations du Stagiaire
      </Typography>

      <TextField source="id" label="Identifiant" />
      <TextField source="firstName" label="Prénom" />
      <TextField source="lastName" label="Nom" />
      <EmailField source="email" label="Email" />
      <TextField source="department" label="Département" />

      <BooleanField source="isRemunerated" label="Rémunéré" />

      <FunctionField
        label="Gratification"
        render={(record) =>
          record?.isRemunerated && record.stipend
            ? new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(record.stipend)
            : "Non rémunéré"
        }
      />

      <ReferenceField
        source="managerId"
        reference="employees"
        label="Lien vers le Manager"
        link="show"
      >
        <FunctionField
          render={(record) =>
            record ? `${record.firstName} ${record.lastName} ↗` : "-"
          }
        />
      </ReferenceField>

      <Box my={3}>
        <Divider />
      </Box>

      <Typography variant="h6" sx={{ color: "#333", mb: 1 }}>
        Aperçu du Manager Référent
      </Typography>

      <ManagerCard />
    </SimpleShowLayout>
  </Show>
);
