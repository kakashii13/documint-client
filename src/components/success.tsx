import { Box, Button, Container, Paper, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type Props = {
  /** Línea principal, ej. “¡Gracias!” */
  title: string;
  /** Sub-título, ej. “El formulario se envió correctamente” */
  message?: string;
  /** Texto del botón opcional */
  buttonText?: string;
  /** URL a la que redirige el botón */
  url?: string;
};

export const Success = ({ title, message, buttonText, url }: Props) => {
  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper elevation={2} sx={{ overflow: "hidden" }}>
        {/* Franja superior verde */}
        <Box sx={{ height: 6, bgcolor: "success.main" }} />

        {/* Contenido */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          px={4}
          py={8}
        >
          {/* Círculo con tilde */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={120}
            height={120}
            borderRadius="50%"
            bgcolor="success.main"
          >
            <CheckCircleIcon sx={{ fontSize: 64, color: "#fff" }} />
          </Box>

          {/* Título y mensaje */}
          <Typography variant="h5" fontWeight="bold" mt={4}>
            {title}
          </Typography>

          {message && (
            <Typography variant="body1" mt={2} color="text.secondary">
              {message}
            </Typography>
          )}

          {/* Botón opcional */}
          {buttonText && (
            <Button
              href={url}
              variant="contained"
              sx={{ mt: 4, minWidth: 160 }}
            >
              {buttonText}
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};
