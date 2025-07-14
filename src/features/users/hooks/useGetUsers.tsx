import { useEffect, useState } from "react";
import { useAuthStore } from "../../../hooks/useAuthStore";
import usersApi from "../services/usersApi";
import { useAlertStore } from "../../../hooks/useAlertStore";

export const useGetUsers = (clientId: number) => {
  const [users, setUsers] = useState<[]>([]);
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((s: any) => s.token);
  const showAlert = useAlertStore((state) => state.showAlert);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await usersApi.getUsers(clientId, token);
      setUsers(response?.users);
      setLoading(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al obtener los usuarios";
      showAlert("error", errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [clientId]);

  return { users, loading, fetchUsers };
};
