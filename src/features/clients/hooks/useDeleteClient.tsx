import { useState } from "react";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import clientsApi from "../services/clientsApi";

export const useDeleteClient = (clientId: number) => {
  const token = useAuthStore((s: any) => s.token);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const navigate = useNavigate();

  const handleDeleteClient = async () => {
    try {
      setLoading(true);
      await clientsApi.deleteClient(clientId, token);
      setAlert({
        open: true,
        type: "success",
        message: "Cliente eliminado correctamente",
      });
      navigate("/admin-panel");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al eliminar el cliente";
      setAlert({ open: true, type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return { loading, alert, handleDeleteClient };
};
