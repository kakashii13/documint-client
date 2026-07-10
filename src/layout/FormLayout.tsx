import { Container, Box, Typography, CircularProgress } from "@mui/material";
import Form from "../components/Form";
import logoClient from "../assets/logo_client.png";
import { useParams } from "react-router-dom";
import { useGetAdvisor } from "../features/advisors/hooks/useGetAdvisor";

export const FormLayout = () => {
  const { slug } = useParams();
  const { advisor, loading, error } = useGetAdvisor(slug || "");

  return (
    <Container maxWidth="md" sx={{ pb: 6 }}>
      <Box
        component="img"
        src={logoClient}
        alt="Logo MGN Salud"
        sx={{ width: "100%", height: "auto", borderRadius: 2 }}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" py={10}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box
          sx={{
            mt: 4,
            p: 4,
            textAlign: "center",
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" fontWeight={700} mb={1}>
            Link no válido
          </Typography>
          <Typography color="text.secondary">{error}</Typography>
        </Box>
      ) : (
        <Form advisor={advisor} />
      )}
    </Container>
  );
};
