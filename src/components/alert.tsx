import { Snackbar, Alert as MuiAlert } from "@mui/material";

export const ToasterAlert = ({ open, type, message, onClose }) => {
  // type puede ser 'success' | 'info' | 'warning' | 'error'
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MuiAlert
        onClose={onClose}
        severity={type}
        elevation={6}
        variant="filled"
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};
