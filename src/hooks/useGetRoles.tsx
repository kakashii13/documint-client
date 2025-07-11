import { useEffect, useState } from "react";
import { useAuthStore } from "./useAuthStore";
import apiService from "../services/api";

export const useGetRoles = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const token = useAuthStore((state: any) => state.token);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("/roles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles(response.data.roles);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al obtener los roles";
      setAlert({ open: true, type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return { roles, loading, alert };
};
