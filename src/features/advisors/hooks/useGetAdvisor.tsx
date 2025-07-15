import { useEffect, useState } from "react";
import advisorApi from "../services/advisorApi";

export const useGetAdvisor = (advisorSlug: string) => {
  const [advisor, setAdvisor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAdvisor = async () => {
    if (!advisorSlug) return; // evita fetch en blanco

    try {
      setLoading(true);
      const response = await advisorApi.getAdvisorBySlug(advisorSlug);
      setAdvisor(response?.advisor || []);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.message || "Error al obtener los asesores";
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    fetchAdvisor();
  }, [advisorSlug]);

  return { advisor, loading, fetchAdvisor };
};
