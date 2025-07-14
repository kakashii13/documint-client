import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { UsersManager } from "../features/users/containers/UsersManager";
import { useDeleteClient } from "../features/clients/hooks/useDeleteClient";
import { CardClient } from "../features/clients/components/CardClient";
import { MainLayout } from "../layout/MainLayout";
import { useClientStore } from "../hooks/useClientStore";

export const ClientDetail = () => {
  const { clientId } = useParams();
  const clientIdParsed = Number(clientId);
  const { handleDeleteClient, loading } = useDeleteClient(clientIdParsed);
  const client = useClientStore((state) => state.getClientById(clientIdParsed));

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CardClient
          client={client}
          onDelete={handleDeleteClient}
          loading={loading}
        />
        <UsersManager clientId={clientIdParsed} />
      </Container>
    </MainLayout>
  );
};
