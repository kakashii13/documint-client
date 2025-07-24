import { useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmAction } from "./ConfirmAction";

export const DeleteButton = ({
  onConfirm,
  loading,
  text = "Eliminar cliente",
}: {
  onConfirm: () => void;
  loading: boolean;
  text?: string;
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
        {text}
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
