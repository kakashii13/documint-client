import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Box } from "@mui/material";
import { ToasterAlert } from "../components/alert";
import { TopBar } from "../components/TopBar";
import { UsersManager } from "../features/users/containers/UsersManager";
import { useDeleteClient } from "../features/clients/hooks/useDeleteClient";
import { CardClient } from "../features/clients/components/CardClient";

type Client = {
  id: number;
  name: string;
  email: string;
};

export const ClientDetail = () => {
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const { state } = useLocation() as { state: { client?: Client } };
  const { client } = state || {};
  const { handleDeleteClient, loading } = useDeleteClient(client?.id || 0);

  return (
    <Box>
      <TopBar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CardClient
          client={client}
          onDelete={handleDeleteClient}
          loading={loading}
        />
        <UsersManager clientId={client?.id || 0} />
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
