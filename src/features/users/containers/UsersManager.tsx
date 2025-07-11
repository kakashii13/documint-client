import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useGetUsers } from "../hooks/useGetUsers";
import { UsersTable } from "../components/UsersTable";
import usersApi from "../services/usersApi";
import { ToasterAlert } from "../../../components/alert";

export const UsersManager = ({ clientId }: { clientId: number }) => {
  const token = useAuthStore((s: any) => s.token);
  const { users, fetchUsers } = useGetUsers(clientId || 0);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });

  const navigate = useNavigate();

  const handleDeleteUser = async (userId: number) => {
    try {
      setLoading(true);
      await usersApi.deleteUser(clientId, userId, token);
      setAlert({
        open: true,
        type: "success",
        message: "Usuario eliminado correctamente",
      });
      fetchUsers();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al eliminar el usuario";
      setAlert({ open: true, type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = () => {
    navigate("/client-detail/create-user", {
      state: { client: { id: clientId } },
    });
  };

  const handleNavigateAdvisors = (params: any, userId: number) => {
    navigate(`/client-detail/user/${userId}/advisors`, {
      state: { user: params.row, clientId: clientId },
    });
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
      <ToasterAlert
        open={alert.open}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ open: false, type: "", message: "" })}
      />
    </Box>
  );
};
