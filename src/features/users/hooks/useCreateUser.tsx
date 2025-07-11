import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useState } from "react";
import usersApi from "../services/usersApi";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const token = useAuthStore((state: any) => state.token);
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
      setAlert({
        open: true,
        type: "success",
        message: "Invitación enviada correctamente.",
      });

      setTimeout(() => {
        navigate(`/client-detail/${clientId}`, {
          state: { client: { id: clientId } },
        });
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al crear el usuario";
      setAlert({ open: true, type: "error", message: errorMessage });
      console.error("Error al crear el usuario", errorMessage);
      setLoading(false);
    }
  };

  return { loading, alert, createUser };
};
