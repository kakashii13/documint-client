import { useState } from "react";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiService from "../services/api";
import logo_marca from "../assets/logo_marca.png";
import { useAlertStore } from "../hooks/useAlertStore";
import { MainLayout } from "../layout/MainLayout";

const activationSchema = yup.object().shape({
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Las contraseñas deben coincidir")
    .required("La confirmación de contraseña es requerida"),
});

export const ActivateAccount = () => {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(false);
  const showAlert = useAlertStore((state) => state.showAlert);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(activationSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: { password: string }) => {
    try {
      setLoading(true);
      await apiService.post(`${import.meta.env.VITE_API_URL}/activate-account`, {
        token,
        password: data.password,
      });
      setLoading(false);
      reset();
      showAlert("success", "Cuenta activada. Serás redirigido al inicio de sesión.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      showAlert(
        "error",
        error.response?.data?.message || "Error al activar la cuenta"
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
              Activar cuenta
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mb={3}
            >
              Creá tu contraseña para completar la activación.
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
                      label="Contraseña"
                      type="password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      required
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
                      required
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
                {loading ? "Activando…" : "Activar cuenta"}
              </Button>
            </Box>

            <Box textAlign="center" mt={3}>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="primary">
                  ¿Ya tenés cuenta? Iniciá sesión
                </Typography>
              </Link>
            </Box>
          </Paper>
        </Box>
      </Box>
    </MainLayout>
  );
};
