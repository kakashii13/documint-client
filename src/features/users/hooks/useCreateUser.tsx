import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useState } from "react";
import usersApi from "../services/usersApi";
import { useAlertStore } from "../../../hooks/useAlertStore";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state: any) => state.user);
  const token = useAuthStore((state: any) => state.token);
  const showAlert = useAlertStore((state) => state.showAlert);
  const navigate = useNavigate();

  const createUser = async (
    data: { name: string; email: string; role: string },
    clientId: number
  ) => {
    try {
      setLoading(true);

      const user = {
        name: data.name,
        email: data.email,
        clientId,
        role: data.role,
      };

      await usersApi.createUser(user, token);

      setLoading(false);
      showAlert("success", "Usuario creado correctamente");

      setTimeout(() => {
        if (user.role == "admin") {
          navigate(`/client-detail/${clientId}`);
        } else if (user.role == "admin-client") {
          navigate(`/client-panel/${clientId}`);
        } else {
          navigate(`/client-user-panel/${clientId}`);
        }
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al crear el usuario";
      showAlert("error", errorMessage);
      setLoading(false);
    }
  };

  return { loading, createUser };
};
