import { Snackbar, Alert as MuiAlert } from "@mui/material";

type AlertProps = {
  open: boolean;
  type: "success" | "info" | "warning" | "error";
  message: string;
  onClose: () => void;
};

export const ToasterAlert = ({ open, type, message, onClose }: AlertProps) => {
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
