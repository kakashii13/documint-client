import { Backdrop, Box, Fade, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const Success = ({ success }: { success: boolean }) => {
  return (
    <Backdrop
      open={success}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Fade in={success} timeout={{ enter: 300, exit: 300 }}>
        <Box
          textAlign="center"
          bgcolor={"background.paper"}
          p={4}
          borderRadius={2}
        >
          <CheckCircleIcon sx={{ fontSize: 80, color: "success.main" }} />
          <Typography variant="h6" color="text.primary" mt={2}>
            Formulario enviado con éxito
          </Typography>
        </Box>
      </Fade>
    </Backdrop>
  );
};
