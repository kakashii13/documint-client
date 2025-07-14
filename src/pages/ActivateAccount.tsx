import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Avatar,
  Paper,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../services/api";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import logo_marca from "../assets/logo_marca.png";
import { useAlertStore } from "../hooks/useAlertStore";

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
  const [countdown, setCountdown] = useState(3);
  const [success, setSuccess] = useState(false);
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

  useEffect(() => {
    // Countdown logic
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    if (countdown === 0 && success) {
      navigate("/login");
    }

    return () => clearInterval(timer);
  }, []);

  const onSubmit = async (data: { password: string }) => {
    try {
      setLoading(true);

      await apiService.post(
        `${import.meta.env.VITE_API_URL}/activate-account`,
        { token, password: data.password }
      );

      setLoading(false);
      reset();
      showAlert(
        "success",
        "Cuenta activada exitosamente, serás redirigido al inicio de sesión."
      );

      setSuccess(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al activar la cuenta";
      showAlert("error", errorMessage);
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
        <Avatar sx={{ mb: 1, bgcolor: "primary.main" }}>
          <VpnKeyOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Activar Cuenta
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3, textAlign: "center" }}>
          Ingresa tu nueva contraseña para completar la activación.
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
          >
            {loading ? "Activando..." : "Activar Cuenta"}
          </Button>
        </Box>
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
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          Si ya tienes una cuenta, puedes iniciar sesión{" "}
          <Button
            href="/login"
            color="primary"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            aquí
          </Button>
        </Typography>
        {success && (
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 2, fontSize: "0.875rem" }}
          >
            Serás redirigido al inicio de sesión en <strong>{countdown}</strong>{" "}
            segundo{countdown !== 1 ? "s" : ""}.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};
