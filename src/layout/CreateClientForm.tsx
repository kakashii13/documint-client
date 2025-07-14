import {
  Box,
  Button,
  Container,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import apiService from "../services/api";
import { useAuthStore } from "../hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import { TopBar } from "../components/TopBar";
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

      const client = {
        name: data.name,
        email: data.email,
      };
      const response = await apiService.post(
        `${import.meta.env.VITE_API_URL}/clients`,
        { client },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      reset();
      setLoading(false);
      showAlert("success", response.data.message);
      setTimeout(() => {
        navigate("/admin-panel");
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al crear el cliente";
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
              Crear Cliente
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
              Crear Cliente
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
