import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import logo_marca from "../assets/logo_marca.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useAlertStore } from "../hooks/useAlertStore";
import apiService from "../services/api";
import { TopBar } from "../components/TopBar";

const resetSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("El email es obligatorio"),
});

export const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(resetSchema),
    defaultValues: { email: "" },
  });

  const [loading, setLoading] = useState(false);
  const showAlert = useAlertStore((state) => state.showAlert);

  const onSubmit = async (data: { email: string }) => {
    try {
      setLoading(true);
      await apiService.post("/request-reset", {
        email: data.email,
      });

      showAlert(
        "success",
        "Enlace de restablecimiento enviado con éxito. Revisa tu correo electrónico."
      );
      setLoading(false);
      reset();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Error al enviar el enlace de restablecimiento";
      showAlert("error", errorMessage);
      setLoading(false);
    }
  };

  return (
    <Box>
      <TopBar />
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
            Restablecer contraseña
          </Typography>

          <Typography variant="body2" sx={{ mb: 2, textAlign: "center" }}>
            Ingresa tu correo electrónico para recibir un enlace de
            restablecimiento de contraseña.
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
              loading={loading}
            >
              Enviar email
            </Button>

            {/* Logo de Documint */}
            <Box
              component="img"
              src={logo_marca}
              alt="Documint Logo"
              sx={{
                display: "block",
                mx: "auto",
                width: 120,
                mt: 4,
                mb: 2,
              }}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
