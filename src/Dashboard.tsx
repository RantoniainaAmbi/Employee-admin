import React from "react";
import { useGetList } from "react-admin";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import PaidIcon from "@mui/icons-material/Paid";

export const Dashboard = () => {
  const {
    total: totalEmployees,
    isPending: loadingEmp,
    error: errEmp,
  } = useGetList(
    "employees",
    { pagination: { page: 1, perPage: 0 } },
    { refetchOnWindowFocus: false },
  );

  const {
    total: activeEmployees,
    isPending: loadingActive,
    error: errActive,
  } = useGetList(
    "employees",
    {
      filter: { active: true },
      pagination: { page: 1, perPage: 0 },
    },
    { refetchOnWindowFocus: false },
  );

  const {
    total: totalInterns,
    isPending: loadingInt,
    error: errInt,
  } = useGetList(
    "interns",
    { pagination: { page: 1, perPage: 0 } },
    { refetchOnWindowFocus: false },
  );

  const {
    total: paidInterns,
    isPending: loadingPaid,
    error: errPaid,
  } = useGetList(
    "interns",
    {
      filter: { isRemunerated: true },
      pagination: { page: 1, perPage: 0 },
    },
    { refetchOnWindowFocus: false },
  );

  const renderKPI = (
    title: string,
    value: number | undefined,
    loading: boolean,
    error: unknown,
    icon: React.ReactNode,
    color: string,
  ) => {
    return (
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          borderRadius: 2,
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ fontWeight: "bold", textTransform: "uppercase" }}
            >
              {title}
            </Typography>
            <Box sx={{ color: color, display: "flex", alignItems: "center" }}>
              {icon}
            </Box>
          </Box>

          {loading ? (
            <CircularProgress size={24} sx={{ my: 1 }} />
          ) : error ? (
            <Typography color="error" variant="body2">
              Erreur
            </Typography>
          ) : (
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", color: "#2c3e50" }}
            >
              {value ?? 0}
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ mt: 3, px: 2 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: "bold", color: "#2c3e50" }}
      >
        Tableau de Bord RH
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {renderKPI(
            "Total Employés",
            totalEmployees,
            loadingEmp,
            errEmp,
            <PeopleIcon fontSize="large" />,
            "#1976d2",
          )}
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {renderKPI(
            "Employés Actifs",
            activeEmployees,
            loadingActive,
            errActive,
            <CheckCircleIcon fontSize="large" />,
            "#2e7d32",
          )}
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {renderKPI(
            "Total Stagiaires",
            totalInterns,
            loadingInt,
            errInt,
            <SchoolIcon fontSize="large" />,
            "#ed6c02",
          )}
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {renderKPI(
            "Stagiaires Rémunérés",
            paidInterns,
            loadingPaid,
            errPaid,
            <PaidIcon fontSize="large" />,
            "#9c27b0",
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
