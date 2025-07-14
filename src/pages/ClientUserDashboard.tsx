import { Container } from "@mui/material";
import { useAuthStore } from "../hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Welcome } from "../components/Welcome";
import { MainLayout } from "../layout/MainLayout";
import { AdvisorManager } from "../features/advisors/components/AdvisorManager";
import { useGetAdvisors } from "../features/hooks/useGetAdvisors";

export const ClientUserDashboard = () => {
  const user = useAuthStore((state: any) => state.user);
  const { advisors } = useGetAdvisors(user.id);
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Container>
        <Welcome />

        <AdvisorManager
          advisors={advisors || []}
          onCreate={() => {
            navigate(
              `/client-detail/${user?.clientId}/user/${user?.id}/create-advisor`
            );
          }}
        />
      </Container>
    </MainLayout>
  );
};
