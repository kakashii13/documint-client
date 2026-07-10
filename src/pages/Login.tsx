import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../services/api";
import { useAuthStore } from "../hooks/useAuthStore";
import logo_marca from "../assets/logo_marca.png";
import { useAlertStore } from "../hooks/useAlertStore";
import { MainLayout } from "../layout/MainLayout";
import { PasswordInput } from "../components/PasswordInput";
import { FcGoogle } from "react-icons/fc";

const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("El email es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setToken = useAuthStore((state: any) => state.setToken);
  const setUser = useAuthStore((state: any) => state.setUser);
  const showAlert = useAlertStore((state) => state.showAlert);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      const response = await apiService.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { dataUser: { email: data.email, password: data.password } },
        { withCredentials: true }
      );

      const responseData = response.data;
      setToken(responseData.token);
      setUser(responseData.user);
      setLoading(false);

      if (responseData.user?.role === "admin") {
        navigate("/admin-panel");
      } else if (responseData.user?.role === "admin-client") {
        navigate(`/client-panel/${responseData.user?.clientId}`);
      } else {
        navigate(`/client-user-panel/${responseData.user?.clientId}`);
      }
    } catch (error: any) {
      showAlert(
        "error",
        error.response?.data?.message || "Error al iniciar sesión"
      );
      setLoading(false);
    }
  };

  const googleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get("error");
    if (error) showAlert("error", error || "Error al iniciar sesión con Google");
  }, []);

  return (
    <MainLayout>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
          px: 2,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 420 }}>
          {/* Logo */}
          <Box textAlign="center" mb={4}>
            <Box
              component="img"
              src={logo_marca}
              alt="Documint"
              sx={{ height: 44 }}
            />
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              textAlign="center"
              mb={0.5}
            >
              Iniciar sesión
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mb={3}
            >
              Ingresá tus credenciales para continuar
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      autoComplete="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <PasswordInput
                      name="password"
                      label="Contraseña"
                      required
                      field={field}
                      fieldState={errors.password}
                      disabled={isSubmitting || loading}
                    />
                  )}
                />
              </Stack>

              <Box textAlign="right" mt={1}>
                <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                  <Typography variant="caption" color="primary">
                    ¿Olvidaste tu contraseña?
                  </Typography>
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting || loading}
                loading={loading}
                sx={{ mt: 2.5, py: 1.4 }}
              >
                {loading ? "Ingresando…" : "Entrar"}
              </Button>
            </Box>

            <Divider sx={{ my: 3 }}>
              <Typography variant="caption" color="text.secondary">
                o continuá con
              </Typography>
            </Divider>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<FcGoogle size={18} />}
              onClick={googleLogin}
              sx={{ py: 1.2, borderColor: "divider", color: "text.primary" }}
            >
              Continuar con Google
            </Button>
          </Paper>
        </Box>
      </Box>
    </MainLayout>
  );
};
