import { Box, Button, Container, Typography } from "@mui/material";
import { useAuthStore } from "../hooks/useAuthStore";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { Welcome } from "../components/Welcome";
import { MainLayout } from "../layout/MainLayout";
import { AdvisorManager } from "../features/advisors/components/AdvisorManager";
import { useGetAdvisors } from "../features/hooks/useGetAdvisors";
import { ToasterAlert } from "../components/alert";

export const ClientUserDashboard = () => {
  const user = useAuthStore((state: any) => state.user);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const { advisors } = useGetAdvisors(user.id);
  const navigate = useNavigate();
  return (
    <MainLayout>
      <Container>
        <Welcome />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={5}
        >
          <Typography variant="h5">Asesores</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              navigate(`/client-panel/${user?.id}/create-advisor`, {
                state: { user: user, clientId: user?.clientId },
              });
            }}
          >
            Crear asesor
          </Button>
        </Box>

        <AdvisorManager advisors={advisors || []} />
      </Container>
      <ToasterAlert
        open={alert.open}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ ...alert, open: false })}
      />
    </MainLayout>
  );
};
