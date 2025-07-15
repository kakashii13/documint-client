import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/"); // redirige a la página de inicio
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography variant="h2" fontWeight={700} gutterBottom>
        404
      </Typography>

      <Typography variant="h5" mb={2}>
        Página no encontrada
      </Typography>

      <Typography variant="body1" mb={4} maxWidth={480}>
        Lo sentimos, la página que buscás no existe, cambió de dirección o fue
        eliminada.
      </Typography>

      <Button variant="contained" size="large" onClick={handleBackHome}>
        Volver al inicio
      </Button>
    </Box>
  );
};
