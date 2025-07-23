import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import apiService from "../services/api";
import { useAlertStore } from "../hooks/useAlertStore";
import { Box, Typography, CircularProgress } from "@mui/material";

const LoginSuccess = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const setToken = useAuthStore((s) => s.setToken);
  const showAlert = useAlertStore((s) => s.showAlert);

  useEffect(() => {
    const finalizeLogin = async () => {
      const query = new URLSearchParams(window.location.search);
      const token = query.get("accessToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setToken(token);

        const response = await apiService.get(
          `${import.meta.env.VITE_API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        const responseUser = response.data.user;

        setUser(responseUser);

        if (responseUser?.role === "admin") {
          navigate("/admin-panel");
        } else if (responseUser?.role === "admin-client") {
          navigate(`/client-panel/${responseUser?.clientId}`);
        } else {
          navigate(`/client-user-panel/${responseUser?.clientId}`);
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Error al iniciar sesión";
        console.error("Error al iniciar sesión:", errorMessage);
        showAlert("error", errorMessage);
      }
    };

    finalizeLogin();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
      <Typography variant="h6" mt={2}>
        Iniciando sesión con Google...
      </Typography>
    </Box>
  );
};

export default LoginSuccess;
