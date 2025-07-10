import { useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmAction } from "./ConfirmAction";

export const DeleteButton = ({
  onConfirm,
  loading,
}: {
  onConfirm: () => void;
  loading: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="error"
        sx={{ mt: 2 }}
        onClick={() => setOpen(true)}
        startIcon={<DeleteIcon />}
        loading={loading}
      >
        Eliminar cliente
      </Button>

      <ConfirmAction
        open={open}
        setOpen={setOpen}
        onConfirm={() => {
          onConfirm();
          setOpen(false);
        }}
      />
    </>
  );
};
