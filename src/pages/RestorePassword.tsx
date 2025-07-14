import {
  Container,
  Button,
  Avatar,
  Typography,
  Paper,
  Box,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import logo_marca from "../assets/logo_marca.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useAlertStore } from "../hooks/useAlertStore";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../services/api";

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
        "Contraseña restablecida con éxito. Ahora puedes iniciar sesión."
      );
      setLoading(false);
      reset();
      navigate("/login");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al restablecer la contraseña";
      showAlert("error", errorMessage);
      setLoading(false);
    }
  };

  return (
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

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%" }}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Contraseña"
                type="password"
                margin="normal"
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
                label="Confirmar Contraseña"
                type="password"
                margin="normal"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                required
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
                background: "linear-gradient(135deg, #5A62E5 0%, #000BCC 100%)",
              },
            }}
            loading={loading}
          >
            Continuar
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
  );
};
