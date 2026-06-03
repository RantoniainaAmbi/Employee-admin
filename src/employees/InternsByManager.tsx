import React from "react";
import { useRecordContext, useGetList, Link } from "react-admin";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

export const InternsByManager = () => {
  const employee = useRecordContext();

  const {
    data: interns,
    total,
    isPending,
    error,
  } = useGetList(
    "interns",
    {
      filter: { managerId: employee?.id },
      pagination: { page: 1, perPage: 100 },
    },
    { enabled: !!employee?.id },
  );

  if (isPending) return <CircularProgress size={24} sx={{ my: 2 }} />;
  if (error)
    return (
      <Typography color="error">
        Erreur de chargement des stagiaires rattachés.
      </Typography>
    );

  return (
    <Card variant="outlined" sx={{ mt: 2, bgcolor: "#fafafa" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Stagiaires encadrés ({total ?? 0})
        </Typography>

        {!interns || interns.length === 0 ? (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontStyle: "italic", p: 1 }}
          >
            Cet employé n&apos;encadre aucun stagiaire actuellement.
          </Typography>
        ) : (
          <List disablePadding>
            {interns.map((intern) => (
              <ListItem
                key={intern.id}
                divider
                sx={{
                  px: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ListItemText
                  primary={`${intern.firstName} ${intern.lastName}`}
                  secondary={`${intern.email} | Domaine : ${intern.department}`}
                />
                <Button
                  component={Link}
                  to={`/interns/${intern.id}/show`}
                  variant="outlined"
                  size="small"
                >
                  Voir la fiche ↗
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};
