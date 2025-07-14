import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useGetUsers } from "../hooks/useGetUsers";
import { UsersTable } from "../components/UsersTable";
import usersApi from "../services/usersApi";
import { useAlertStore } from "../../../hooks/useAlertStore";

export const UsersManager = ({ clientId }: { clientId: number }) => {
  const token = useAuthStore((s: any) => s.token);
  const { users, fetchUsers } = useGetUsers(clientId || 0);
  const showAlert = useAlertStore((state) => state.showAlert);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleDeleteUser = async (userId: number) => {
    try {
      setLoading(true);
      await usersApi.deleteUser(clientId, userId, token);
      showAlert("success", "Usuario eliminado correctamente");
      fetchUsers();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al eliminar el usuario";
      showAlert("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = () => {
    navigate(`/client-detail/${clientId}/create-user`);
  };

  const handleNavigateAdvisors = (userId: number) => {
    navigate(`/client-detail/${clientId}/user/${userId}/advisors`);
  };

  return (
    <Box>
      <UsersTable
        users={users}
        loading={loading}
        onDelete={handleDeleteUser}
        onCreate={handleCreateUser}
        onNavigateAdvisors={handleNavigateAdvisors}
      />
    </Box>
  );
};
