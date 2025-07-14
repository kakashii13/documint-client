import { useEffect, useState } from "react";
import clientsApi from "../services/clientsApi";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useAlertStore } from "../../../hooks/useAlertStore";
import { useClientStore } from "../../../hooks/useClientStore";

export const useGetClients = () => {
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((s: any) => s.token);
  const showAlert = useAlertStore((s: any) => s.showAlert);
  const setClients = useClientStore((s) => s.setClients);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await clientsApi.getClients(token);
      setClients(response?.clients || []);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al obtener los clientes";
      showAlert("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return { loading, fetchClients };
};
