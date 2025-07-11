import { Container } from "@mui/material";
import { Welcome } from "../components/Welcome";
import { MainLayout } from "../layout/MainLayout";
import { UsersManager } from "../features/users/containers/UsersManager";
import { useAuthStore } from "../hooks/useAuthStore";

export const ClientAdminDashboard = () => {
  const user = useAuthStore((s: any) => s.user);
  const clientId = user?.clientId;
  return (
    <MainLayout>
      <Container>
        <Welcome />
        Client admin dashboard
        <UsersManager clientId={clientId || 0} />
      </Container>
    </MainLayout>
  );
};
