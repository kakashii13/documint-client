import { Container } from "@mui/material";
import { Welcome } from "../components/Welcome";
import { MainLayout } from "../layout/MainLayout";
import { UsersManager } from "../features/users/containers/UsersManager";
import { useAuthStore } from "../hooks/useAuthStore";

export const ClientAdminDashboard = () => {
  const user = useAuthStore((s: any) => s.user);
  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Welcome subtitle="Gestioná los usuarios de tu organización." />
        <UsersManager clientId={user?.clientId || 0} />
      </Container>
    </MainLayout>
  );
};
