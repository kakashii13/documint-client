import {
  Box,
  Button,
  Container,
  TextField,
  Paper,
  Typography,
  Stack,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { useCreateUser } from "../features/users/hooks/useCreateUser";
import { useGetRoles } from "../hooks/useGetRoles";

const clientSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  email: yup.string().email("Email inválido").required("El email es requerido"),
  role: yup.string().required("El rol es requerido"),
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
  const { clientId } = useParams();
  const { roles } = useGetRoles();
  const { createUser, loading } = useCreateUser();
  const navigate = useNavigate();

  const onSubmit = async (data: { name: string; email: string; role: string }) => {
    if (!clientId) return;
    await createUser(data, Number(clientId));
    reset();
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
            Crear usuario
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Se enviará una invitación por email al nuevo usuario.
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
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    label="Rol"
                    {...field}
                    fullWidth
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
                size="large"
                loading={loading}
                sx={{ py: 1.4, mt: 1 }}
              >
                Enviar invitación
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </MainLayout>
  );
};
