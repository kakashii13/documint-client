import {
  Box,
  Button,
  Container,
  TextField,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import apiService from "../services/api";
import { useAuthStore } from "../hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { useAlertStore } from "../hooks/useAlertStore";

const clientSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  email: yup.string().email("Email inválido").required("El email es requerido"),
});

export const CreateClientForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(clientSchema),
    defaultValues: { name: "", email: "" },
  });
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((state: any) => state.token);
  const showAlert = useAlertStore((state) => state.showAlert);
  const navigate = useNavigate();

  const onSubmit = async (data: { name: string; email: string }) => {
    try {
      setLoading(true);
      const response = await apiService.post(
        `${import.meta.env.VITE_API_URL}/clients`,
        { client: { name: data.name, email: data.email } },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      reset();
      setLoading(false);
      showAlert("success", response.data.message);
      setTimeout(() => navigate("/admin-panel"), 1000);
    } catch (error: any) {
      showAlert(
        "error",
        error.response?.data?.message || "Error al crear el cliente"
      );
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3, color: "text.secondary" }}
        >
          Volver
        </Button>

        <Paper
          elevation={0}
          sx={{ p: { xs: 3, sm: 4 }, border: "1px solid", borderColor: "divider" }}
        >
          <Typography variant="h5" fontWeight={700} mb={0.5}>
            Crear cliente
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Completá los datos del nuevo cliente.
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Nombre"
                    {...field}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    required
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Email"
                    type="email"
                    {...field}
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    required
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                loading={loading}
                sx={{ py: 1.4, mt: 1 }}
              >
                Crear cliente
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </MainLayout>
  );
};
