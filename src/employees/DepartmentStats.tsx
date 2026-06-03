import React from "react";
import { useRecordContext, useGetList } from "react-admin";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

export const DepartmentStats = () => {
  const employee = useRecordContext();

  const { total, isPending, error } = useGetList(
    "employees",
    {
      filter: {
        department: employee?.department,
        active: true,
      },
      pagination: { page: 1, perPage: 0 },

      sort: { field: "id", order: "ASC" },
    },
    {
      enabled: !!employee?.department,
      refetchOnWindowFocus: false,
    },
  );

  if (isPending) return <CircularProgress size={24} sx={{ my: 2 }} />;
  if (error)
    return (
      <Typography color="error">
        Erreur de chargement des statistiques.
      </Typography>
    );

  const currentIsActive = employee?.active === true;
  const colleaguesCount = Math.max(0, (total ?? 0) - (currentIsActive ? 1 : 0));

  return (
    <Card
      variant="outlined"
      sx={{ mt: 2, bgcolor: "#e3f2fd", borderColor: "#90caf9" }}
    >
      <CardContent>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: "#0d47a1" }}
        >
          Statistiques du Département : {employee?.department}
        </Typography>
        <Box mt={1}>
          <Typography variant="body1">
            Nombre de collègues actifs dans ce secteur :{" "}
            <strong>{colleaguesCount}</strong>
          </Typography>
          <Typography variant="caption" color="textSecondary">
            (Total du département : {total} employé
            {total && total > 1 ? "s" : ""} actif{total && total > 1 ? "s" : ""}{" "}
            au total)
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
