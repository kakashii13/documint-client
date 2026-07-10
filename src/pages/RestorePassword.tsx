import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import logo_marca from "../assets/logo_marca.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlertStore } from "../hooks/useAlertStore";
import apiService from "../services/api";
import { MainLayout } from "../layout/MainLayout";

const resetSchema = yup.object().shape({
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Las contraseñas deben coincidir")
    .required("La confirmación de contraseña es requerida"),
});

export const RestorePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const { token, uid } = useParams<{ token: string; uid: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const showAlert = useAlertStore((state) => state.showAlert);

  const onSubmit = async (data: { password: string }) => {
    try {
      setLoading(true);
      await apiService.post("/reset-password", {
        token,
        uid,
        password: data.password,
      });
      showAlert(
        "success",
        "Contraseña restablecida con éxito. Ahora podés iniciar sesión."
      );
      setLoading(false);
      reset();
      navigate("/login");
    } catch (error: any) {
      showAlert(
        "error",
        error.response?.data?.message || "Error al restablecer la contraseña"
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
              Nueva contraseña
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mb={3}
            >
              Ingresá y confirmá tu nueva contraseña.
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Nueva contraseña"
                      type="password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Confirmar contraseña"
                      type="password"
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
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
                Restablecer contraseña
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
