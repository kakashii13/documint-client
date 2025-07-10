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
import { ToasterAlert } from "../components/alert";
import { useAuthStore } from "../hooks/useAuthStore";
import { useLocation, useNavigate } from "react-router-dom";
import { TopBar } from "../components/TopBar";

const clientSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  email: yup.string().email("Email inválido").required("El email es requerido"),
});

export const CreateUserForm = () => {
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
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const token = useAuthStore((state: any) => state.token);
  const { state } = useLocation();
  const { client } = state || {};
  const navigate = useNavigate();

  const onSubmit = async (data: { name: string; email: string }) => {
    try {
      setLoading(true);

      const user = {
        name: data.name,
        email: data.email,
        clientId: client?.id,
        role: "client",
      };
      await apiService.post(
        `${import.meta.env.VITE_API_URL}/invitations`,
        { user },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      reset();
      setLoading(false);
      setAlert({
        open: true,
        type: "success",
        message: "Invitacion enviada correctamente.",
      });
      setTimeout(() => {
        navigate(`/client-detail/${client?.id}`, {
          state: { client },
        });
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al crear el usuario";
      setAlert({
        open: true,
        type: "error",
        message: errorMessage,
      });
      console.error("Error al crear el usuario", errorMessage);
      setLoading(false);
    }
  };

  return (
    <Box>
      <TopBar />
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
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
                Crear usuario
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
                Enviar invitación
              </Button>
            </Box>
          </Paper>
          <ToasterAlert
            open={alert.open}
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ ...alert, open: false })}
          />
        </form>
      </Container>
    </Box>
  );
};
