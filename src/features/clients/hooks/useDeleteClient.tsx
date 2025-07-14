import { useState } from "react";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import clientsApi from "../services/clientsApi";
import { useAlertStore } from "../../../hooks/useAlertStore";

export const useDeleteClient = (clientId: number) => {
  const token = useAuthStore((s: any) => s.token);
  const [loading, setLoading] = useState(false);
  const showAlert = useAlertStore((s) => s.showAlert);
  const navigate = useNavigate();

  const handleDeleteClient = async () => {
    try {
      setLoading(true);
      await clientsApi.deleteClient(clientId, token);
      showAlert("success", "Cliente eliminado correctamente");
      navigate("/admin-panel");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al eliminar el cliente";
      showAlert("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleDeleteClient };
};
