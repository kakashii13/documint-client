import { Container, Typography, Paper, Box } from "@mui/material";
import { MainLayout } from "../layout/MainLayout";

export const Settings = () => {
  return (
    <MainLayout>
      <Container maxWidth="md">
        <Paper sx={{ mt: 4, p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Configuración
          </Typography>
          <Box color="text.secondary">
            Próximamente podrás ajustar tus preferencias aquí.
          </Box>
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default Settings;

