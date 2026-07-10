import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import logo_marca from "../assets/logo_marca.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAlertStore } from "../hooks/useAlertStore";
import apiService from "../services/api";
import { MainLayout } from "../layout/MainLayout";

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
      await apiService.post("/request-reset", { email: data.email });
      showAlert(
        "success",
        "Enlace de restablecimiento enviado. Revisá tu correo."
      );
      setLoading(false);
      reset();
    } catch (error: any) {
      showAlert(
        "error",
        error.response?.data?.message ||
          "Error al enviar el enlace de restablecimiento"
      );
      setLoading(false);
    }
  };

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
            <Typography variant="h5" fontWeight={700} textAlign="center" mb={0.5}>
              Recuperar contraseña
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mb={3}
            >
              Te enviamos un enlace para restablecer tu contraseña.
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
              </Stack>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting || loading}
                loading={loading}
                sx={{ mt: 3, py: 1.4 }}
              >
                Enviar enlace
              </Button>
            </Box>

            <Box textAlign="center" mt={3}>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="primary">
                  ← Volver al inicio de sesión
                </Typography>
              </Link>
            </Box>
          </Paper>
        </Box>
      </Box>
    </MainLayout>
  );
};
