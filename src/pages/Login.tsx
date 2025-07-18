import { useState } from "react";
import {
  Container,
  Box,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../services/api";
import { useAuthStore } from "../hooks/useAuthStore";
import logo_marca from "../assets/logo_marca.png";
import { useAlertStore } from "../hooks/useAlertStore";
import { MainLayout } from "../layout/MainLayout";

const loginSchema = yup.object().shape({
  // Esquema de validación para Login\const loginSchema = yup.object().shape({
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
      const user = {
        email: data.email,
        password: data.password,
      };

      const response = await apiService.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { dataUser: user }
      );

      const responseData = response.data;
      const responseToken = responseData.token;
      const responseUser = responseData.user;
      // console.log(response.data);
      setLoading(false);
      setToken(responseToken);
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
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            mt: 8,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Iniciar Sesión
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: "100%" }}
          >
            <Controller
              name="email"
              control={control}
              rules={{ required: "El email es obligatorio" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  margin="normal"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{ required: "La contraseña es obligatoria" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Contraseña"
                  type="password"
                  margin="normal"
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting || loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.2,
                textTransform: "none",
                fontWeight: "bold",
                background:
                  "linear-gradient(135deg, #6B73FF 0%,rgb(0, 119, 255) 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5A62E5 0%, #000BCC 100%)",
                },
              }}
            >
              {loading ? "Ingresando..." : "Entrar"}
            </Button>

            <Box textAlign="center">
              <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="#1976D2">
                  ¿Olvidaste tu contraseña?
                </Typography>
              </Link>
            </Box>
            {/* Logo de Documint */}
            <Box
              component="img"
              src={logo_marca}
              alt="Documint Logo"
              sx={{
                display: "block",
                mx: "auto", // centra horizontalmente
                width: 120, // ajusta al tamaño deseado
                mt: 4, // margen superior
                mb: 2, // margen inferior
              }}
            />
          </Box>
        </Paper>
      </Container>
    </MainLayout>
  );
};
