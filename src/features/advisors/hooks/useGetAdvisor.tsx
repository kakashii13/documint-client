import { useEffect, useState } from "react";
import advisorApi from "../services/advisorApi";

export const useGetAdvisor = (advisorSlug: string) => {
  const [advisor, setAdvisor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvisor = async () => {
    if (!advisorSlug) return;

    try {
      setLoading(true);
      setError(null);
      const response = await advisorApi.getAdvisorBySlug(advisorSlug);
      setAdvisor(response?.advisor || null);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "El link de formulario no es válido o no existe.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvisor();
  }, [advisorSlug]);

  return { advisor, loading, error, fetchAdvisor };
};
