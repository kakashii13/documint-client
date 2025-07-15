import {
  Box,
  Paper,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { TopBar } from "../components/TopBar";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthStore } from "../hooks/useAuthStore";
import { useState } from "react";
import apiService from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { useAlertStore } from "../hooks/useAlertStore";

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
        {
          name: data.name,
          email: data.email,
          userId: Number(userId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      reset();
      showAlert("success", "Asesor creado correctamente");
      if (userAuth?.role === "admin" || userAuth?.role === "admin-client") {
        setTimeout(() => {
          navigate(`/client-detail/${clientId}/user/${userId}/advisors`);
        }, 1000);
      } else {
        setTimeout(() => {
          navigate(`/client-user-panel/${clientId}`);
        }, 1000);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al crear el asesor";
      showAlert("error", errorMessage);
      setLoading(false);
    }
  };
  return (
    <Box>
      <TopBar />
      <Container maxWidth="sm">
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
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",

              gap: 2,
              my: 2,
              p: "10px",
              width: "100%",
              borderRadius: "8px",
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              sx={{ mb: 2 }}
              textAlign={"center"}
            >
              Crear asesor
            </Typography>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Nombre"
                  {...field}
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
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  required
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              loading={loading}
            >
              Crear Asesor
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
