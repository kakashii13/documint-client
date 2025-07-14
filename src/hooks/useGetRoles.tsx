import { useEffect, useState } from "react";
import { useAuthStore } from "./useAuthStore";
import apiService from "../services/api";
import { useAlertStore } from "./useAlertStore";

export const useGetRoles = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((state: any) => state.token);
  const showAlert = useAlertStore((state: any) => state.showAlert);

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
      showAlert("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return { roles, loading };
};
