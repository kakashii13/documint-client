import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ToasterAlert } from "../components/alert";
import { TopBar } from "../components/TopBar";
import { useGetAdvisors } from "../features/hooks/useGetAdvisors";
import { AdvisorManager } from "../features/advisors/components/AdvisorManager";

export const UserDetail = () => {
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const { state } = useLocation();
  const { user } = state || {};
  const { advisors } = useGetAdvisors(user?.id);
  const navigate = useNavigate();

  const handleCreateAdvisor = () => {
    navigate(`/client-detail/${user?.id}/create-advisor`, {
      state: { user: user, clientId: user?.clientId },
    });
  };

  return (
    <Box>
      <TopBar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5">Asesores</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateAdvisor}
          >
            Crear asesor
          </Button>
        </Box>

        <AdvisorManager advisors={advisors || []} />
        <ToasterAlert
          open={alert.open}
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ ...alert, open: false })}
        />
      </Container>
    </Box>
  );
};
