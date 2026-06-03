import React from "react";
import {
  useRecordContext,
  useGetOne,
  EmailField,
  BooleanField,
} from "react-admin";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

export const ManagerCard = () => {
  const record = useRecordContext();

  const {
    data: manager,
    isPending,
    error,
  } = useGetOne(
    "employees",
    { id: record?.managerId },
    { enabled: !!record?.managerId },
  );

  if (isPending) {
    return (
      <Box display="flex" alignItems="center" gap={2} p={2}>
        <CircularProgress size={20} />
        <Typography variant="body2" color="textSecondary">
          Chargement du manager...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2} bgcolor="#ffebee" borderRadius={1}>
        <Typography color="error" variant="body2">
          Erreur lors du chargement du manager.
        </Typography>
      </Box>
    );
  }

  if (!manager) {
    return (
      <Typography variant="body2" color="textSecondary" sx={{ p: 2 }}>
        Aucun manager rattaché à ce stagiaire.
      </Typography>
    );
  }

  return (
    <Card variant="outlined" sx={{ mt: 2, maxWidth: 400, bgcolor: "#f9f9f9" }}>
      <CardContent>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Fiche du Manager Référent
        </Typography>

        <Typography variant="body2">
          <strong>Nom complet :</strong> {manager.firstName} {manager.lastName}
        </Typography>

        <Typography variant="body2" sx={{ my: 0.5 }}>
          <strong>Département :</strong> {manager.department}
        </Typography>

        <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
          <Typography variant="body2">
            <strong>Email :</strong>
          </Typography>
          <EmailField record={manager} source="email" variant="body2" />
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2">
            <strong>Statut Actif :</strong>
          </Typography>
          <BooleanField
            record={manager}
            source="active"
            valueLabelTrue="Oui"
            valueLabelFalse="Non"
          />
        </Box>
      </CardContent>
    </Card>
  );
};
