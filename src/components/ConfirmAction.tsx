import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

type ConfirmActionProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
};

export const ConfirmAction = ({
  open,
  setOpen,
  onConfirm,
}: ConfirmActionProps) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>¿Estás seguro?</DialogTitle>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancelar</Button>
        <Button
          color="error"
          onClick={() => {
            onConfirm();
            setOpen(false);
          }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
