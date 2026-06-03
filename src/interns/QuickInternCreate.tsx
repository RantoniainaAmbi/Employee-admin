import React, { useState } from "react";
import { useCreate, ReferenceInput, SelectInput } from "react-admin";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export const QuickInternCreate = () => {
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [managerId, setManagerId] = useState("");

  const [create, { isPending }] = useCreate();

  const handleOpen = () => {
    setOpen(true);
    setErrorMsg(null);
  };

  const handleClose = () => {
    if (!isPending) {
      setOpen(false);
      setFirstName("");
      setLastName("");
      setManagerId("");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!firstName || !lastName || !managerId) {
      setErrorMsg("Tous les champs sont obligatoires.");
      return;
    }

    create(
      "interns",
      {
        data: {
          firstName,
          lastName,
          managerId,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@intern.com`,
          department: "Informatique",
          isRemunerated: false,
          stipend: 0,
        },
      },
      {
        onSuccess: () => {
          handleClose();
        },
        onError: (error: unknown) => {
          setErrorMsg(
            (error as { message?: string })?.message ||
              "Une erreur est survenue lors du traitement.",
          );
        },
      },
    );
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<PersonAddIcon />}
        onClick={handleOpen}
      >
        Ajouter stagiaire rapide
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: "bold" }}>
          Nouveau Stagiaire Rapide
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Box display="flex" flexDirection="column" gap={2}>
              {errorMsg && (
                <Box
                  p={1}
                  bgcolor="#ffebee"
                  borderRadius={1}
                  border="1px solid #f44336"
                >
                  <Typography color="error" variant="body2">
                    {errorMsg}
                  </Typography>
                </Box>
              )}

              <TextField
                label="Prénom"
                variant="outlined"
                fullWidth
                size="small"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isPending}
              />

              <TextField
                label="Nom"
                variant="outlined"
                fullWidth
                size="small"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isPending}
              />

              <ReferenceInput source="managerId" reference="employees">
                <SelectInput
                  label="Manager Référent"
                  fullWidth
                  size="small"
                  value={managerId}
                  onChange={(e) => setManagerId(e.target.value as string)}
                  optionText={(record) =>
                    `${record.firstName} ${record.lastName}`
                  }
                  disabled={isPending}
                />
              </ReferenceInput>
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleClose} color="inherit" disabled={isPending}>
              Annuler
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isPending}
              sx={{ minWidth: 100 }}
            >
              {isPending ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Enregistrer"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
