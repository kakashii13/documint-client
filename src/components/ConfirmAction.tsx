import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CloseIcon from "@mui/icons-material/Close";

type ConfirmActionProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
  textConfirmation?: string;
};

export const ConfirmAction = ({
  open,
  setOpen,
  onConfirm,
  textConfirmation = "¿Estás seguro que deseas eliminar?",
}: ConfirmActionProps) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
      <Box position="absolute" top={8} right={8}>
        <IconButton onClick={() => setOpen(false)} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogTitle sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <WarningAmberRoundedIcon color="error" fontSize="large" />
      </DialogTitle>

      <DialogContent>
        <Typography variant="h6" align="center" gutterBottom>
          {textConfirmation}
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
          Esta acción no se puede deshacer.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
        <Button
          onClick={() => setOpen(false)}
          variant="outlined"
          sx={{ minWidth: 100 }}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            setOpen(false);
          }}
          variant="contained"
          color="error"
          sx={{ minWidth: 100 }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
