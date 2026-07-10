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
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthStore } from "../hooks/useAuthStore";
import { useState } from "react";
import apiService from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { useAlertStore } from "../hooks/useAlertStore";
import { MainLayout } from "../layout/MainLayout";

const advisorSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  email: yup.string().email("Email inválido").required("El email es requerido"),
});

export const CreateAdvisorForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(advisorSchema),
    defaultValues: { name: "", email: "" },
  });

  const { clientId, userId } = useParams();
  const token = useAuthStore((state: any) => state.token);
  const userAuth = useAuthStore((state: any) => state.user);
  const showAlert = useAlertStore((state) => state.showAlert);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await apiService.post(
        "/advisors",
        { name: data.name, email: data.email, userId: Number(userId) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoading(false);
      reset();
      showAlert("success", "Asesor creado correctamente");
      const dest =
        userAuth?.role === "admin" || userAuth?.role === "admin-client"
          ? `/client-detail/${clientId}/user/${userId}/advisors`
          : `/client-user-panel/${clientId}`;
      setTimeout(() => navigate(dest), 1000);
    } catch (error: any) {
      showAlert(
        "error",
        error.response?.data?.message || "Error al crear el asesor"
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
            Crear asesor
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Completá los datos del nuevo asesor.
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
                Crear asesor
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </MainLayout>
  );
};
