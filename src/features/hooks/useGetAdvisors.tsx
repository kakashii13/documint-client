import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import advisorApi from "../advisors/services/advisorApi";

export const useGetAdvisors = (userId: number) => {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const token = useAuthStore((state: any) => state.token);
  const fetchAdvisors = async () => {
    try {
      setLoading(true);
      const response = await advisorApi.getAdvisors(userId, token);
      setAdvisors(response?.advisors || []);
      setLoading(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al obtener los asesores";
      setAlert({
        open: true,
        type: "error",
        message: errorMessage,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvisors();
  }, []);

  return { advisors, loading, alert, fetchAdvisors };
};
