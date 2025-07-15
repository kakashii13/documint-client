import { useNavigate, useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { useGetAdvisors } from "../features/advisors/hooks/useGetAdvisors";
import { AdvisorManager } from "../features/advisors/components/AdvisorManager";
import { MainLayout } from "./MainLayout";

export const UserDetail = () => {
  const { clientId, userId } = useParams();
  const { advisors } = useGetAdvisors(Number(userId));
  const navigate = useNavigate();

  const handleCreateAdvisor = () => {
    navigate(`/client-detail/${clientId}/user/${userId}/create-advisor`);
  };

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <AdvisorManager
          advisors={advisors || []}
          onCreate={handleCreateAdvisor}
        />
      </Container>
    </MainLayout>
  );
};
