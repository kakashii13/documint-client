import { useNavigate, useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { AdvisorManager } from "../features/advisors/components/AdvisorManager";
import { MainLayout } from "../layout/MainLayout";

export const UserDetail = () => {
  const { clientId, userId } = useParams();
  const navigate = useNavigate();

  const handleCreateAdvisor = () => {
    navigate(`/client-detail/${clientId}/user/${userId}/create-advisor`);
  };

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <AdvisorManager
          onCreate={handleCreateAdvisor}
          userId={Number(userId)}
        />
      </Container>
    </MainLayout>
  );
};
