import { useEffect, useState } from "react";
import { useAuthStore } from "../../../hooks/useAuthStore";
import usersApi from "../services/usersApi";

export const useGetUsers = (clientId: number) => {
  const [users, setUsers] = useState<[]>([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const token = useAuthStore((s: any) => s.token);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await usersApi.getUsers(clientId, token);
      setUsers(response?.users);
      setLoading(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al obtener los usuarios";
      setAlert({
        open: true,
        type: "error",
        message: errorMessage,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [clientId]);

  return { users, loading, alert, fetchUsers };
};
