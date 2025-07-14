import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import advisorApi from "../advisors/services/advisorApi";
import { useAlertStore } from "../../hooks/useAlertStore";

export const useGetAdvisors = (userId: number) => {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = useAuthStore((state: any) => state.token);
  const showAlert = useAlertStore((state) => state.showAlert);

  const fetchAdvisors = async () => {
    try {
      setLoading(true);
      const response = await advisorApi.getAdvisors(userId, token);
      setAdvisors(response?.advisors || []);
      setLoading(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al obtener los asesores";
      showAlert("error", errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvisors();
  }, []);

  return { advisors, loading, fetchAdvisors };
};
