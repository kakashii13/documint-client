import { useEffect, useState } from "react";
import clientsApi from "../services/clientsApi";
import { useAuthStore } from "../../../hooks/useAuthStore";

export const useGetClients = () => {
  const [clients, setClients] = useState<[]>([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const token = useAuthStore((s: any) => s.token);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await clientsApi.getClients(token);
      setClients(response?.clients || []);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al obtener los clientes";
      setAlert({
        open: true,
        type: "error",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return { clients, loading, alert, fetchClients };
};
