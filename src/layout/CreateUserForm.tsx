import {
  Box,
  Button,
  Container,
  TextField,
  Paper,
  Typography,
  MenuItem, // ⬅️ nuevo
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToasterAlert } from "../components/alert";
import { useLocation } from "react-router-dom";
import { TopBar } from "../components/TopBar";
import { useCreateUser } from "../features/users/hooks/useCreateUser";
import { useGetRoles } from "../hooks/useGetRoles";

const clientSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  email: yup.string().email("Email inválido").required("El email es requerido"),
  role: yup.string().required("El rol es requerido"), // ⬅️ validación del select
});

export const CreateUserForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(clientSchema),
    defaultValues: { name: "", email: "", role: "" },
  });

  // TODO: ver el tema de los alertas, no esta funcionando bien, quizas hacerlas global?
  const { roles, alert } = useGetRoles();
  const { createUser, loading } = useCreateUser();

  const { state } = useLocation();
  const { client } = state || {};

  const onSubmit = async (data: {
    name: string;
    email: string;
    role: string;
  }) => {
    createUser(data, client?.id);
    reset();
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
              <Typography variant="h5" component="h1" textAlign="center" mb={2}>
                Crear usuario
              </Typography>

              {/* Nombre */}
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

              {/* Email */}
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

              {/* Select de Roles */}
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    label="Rol"
                    {...field}
                    error={!!errors.role}
                    helperText={errors.role?.message}
                    required
                  >
                    {roles.map((r) => (
                      <MenuItem key={r.id ?? r.role} value={r.role}>
                        {r.role}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
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
