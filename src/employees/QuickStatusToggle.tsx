import React from "react";
import { useRecordContext, useUpdate } from "react-admin";
import { Button } from "@mui/material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

export const QuickStatusToggle = () => {
  const record = useRecordContext();

  const [update, { isPending }] = useUpdate();

  if (!record) return null;

  const handleToggle = (event: React.MouseEvent) => {
    event.stopPropagation();

    update("employees", {
      id: record.id,
      data: { active: !record.active },
      previousData: record,
    });
  };

  return (
    <Button
      variant="contained"
      size="small"
      color={record.active ? "error" : "success"}
      disabled={isPending}
      onClick={handleToggle}
      startIcon={record.active ? <ToggleOffIcon /> : <ToggleOnIcon />}
      sx={{ minWidth: "110px" }}
    >
      {record.active ? "Désactiver" : "Activer"}
    </Button>
  );
};
