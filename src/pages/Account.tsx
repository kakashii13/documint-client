// Account.tsx
import {
  Box,
  Paper,
  Avatar,
  IconButton,
  Typography,
  TextField,
  Grid,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import { useAuthStore } from "../hooks/useAuthStore";
import { MainLayout } from "../layout/MainLayout";
import { useForm, Controller } from "react-hook-form";
import usersApi from "../features/users/services/usersApi";
import { useAlertStore } from "../hooks/useAlertStore";

type ProfileValues = { name: string; email?: string };
type PasswordValues = { current: string; new: string; confirm: string };

export const Account = () => {
  const { user, setUser } = useAuthStore((s) => s);
  const token = useAuthStore((s) => s.token);
  const showAlert = useAlertStore((s) => s.showAlert);

  /* ————————————  PROFILE FORM  ———————————— */
  const {
    control: profileControl,
    handleSubmit: submitProfile,
    formState: { isDirty: profileDirty },
  } = useForm<ProfileValues>({
    defaultValues: { name: user?.name ?? "", email: user?.email ?? "" },
  });

  const handleSaveProfile = async (data: ProfileValues) => {
    try {
      const dataToSend = {
        name: data.name,
        email: data.email,
        userId: user?.id.toString(),
      };
      const response = await usersApi.updateUser(dataToSend, token ?? "");

      const updatedUser = response.user;

      setUser(updatedUser);
      console.log("Profile updated:", response);
      showAlert("success", "Perfil actualizado correctamente");
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message || "Error al guardar el perfil";
      showAlert("error", errorMessage);
    }
  };

  /* ————————————  PASSWORD FORM  ———————————— */
  const {
    control: passControl,
    handleSubmit: submitPassword,
    watch,
    formState: { isSubmitting: passSubmitting },
  } = useForm<PasswordValues>({
    defaultValues: { current: "", new: "", confirm: "" },
  });

  const handleChangePassword = (data: PasswordValues) => {
    console.log("Change password →", data);
    // ...request al backend, etc.
  };

  // Validación de confirmación de contraseña ― simple y local
  const newPass = watch("new");

  return (
    <MainLayout>
      <Box
        sx={{
          px: { xs: 2, md: 6 },
          py: { xs: 4, md: 6 },
          maxWidth: 880,
          m: "auto",
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={3}>
          Configuración de la cuenta
        </Typography>

        {/* ———————————————————  PERFIL  ——————————————————— */}
        <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, mb: 5 }}>
          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            flexWrap="wrap"
          >
            {/* Avatar + botón cambiar */}
            <Box sx={{ position: "relative", width: 96, height: 96 }}>
              <Avatar
                src=""
                alt={user?.name}
                sx={{ width: 1, height: 1, fontSize: 40 }}
              >
                {user?.name?.[0] ?? "U"}
              </Avatar>
              <IconButton
                size="small"
                color="primary"
                sx={{
                  position: "absolute",
                  right: -6,
                  bottom: -6,
                  bgcolor: "background.paper",
                  border: 1,
                  borderColor: "divider",
                  "&:hover": { bgcolor: "background.paper" },
                }}
                aria-label="Change picture"
              >
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Formulario de perfil */}
            <Box
              component="form"
              onSubmit={submitProfile(handleSaveProfile)}
              flex={1}
              minWidth={240}
            >
              <Grid container spacing={2}>
                <Grid>
                  <Controller
                    control={profileControl}
                    name="name"
                    rules={{ required: "Tu nombre es obligatorio" }}
                    render={({ field, fieldState }) => (
                      <TextField
                        fullWidth
                        label="Name"
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid>
                  <Controller
                    control={profileControl}
                    name="email"
                    rules={{
                      required: "Email es obligatorio",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Email no válido",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <TextField
                        fullWidth
                        label="Email"
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3 }}
                disabled={!profileDirty}
              >
                Guardar cambios
              </Button>
            </Box>
          </Stack>
        </Paper>

        {/* ———————————————————  CONTRASEÑA  ——————————————————— */}
        <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 } }}>
          <Stack spacing={3}>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <LockResetRoundedIcon fontSize="small" />
              Cambiar contraseña
            </Typography>

            <Divider />

            <Box
              component="form"
              onSubmit={submitPassword(handleChangePassword)}
            >
              <Grid container spacing={2}>
                <Grid>
                  <Controller
                    control={passControl}
                    name="current"
                    rules={{ required: "Requerido" }}
                    render={({ field, fieldState }) => (
                      <TextField
                        fullWidth
                        type="password"
                        label="Contraseña actual"
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid>
                  <Controller
                    control={passControl}
                    name="new"
                    rules={{
                      required: "Requerido",
                      minLength: { value: 8, message: "Mínimo 8 caracteres" },
                    }}
                    render={({ field, fieldState }) => (
                      <TextField
                        fullWidth
                        type="password"
                        label="Nueva contraseña"
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid>
                  <Controller
                    control={passControl}
                    name="confirm"
                    rules={{
                      required: "Requerido",
                      validate: (value) =>
                        value === newPass || "Las contraseñas no coinciden",
                    }}
                    render={({ field, fieldState }) => (
                      <TextField
                        fullWidth
                        type="password"
                        label="Confirmar nueva contraseña"
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="outlined"
                sx={{ mt: 3, alignSelf: { xs: "stretch", sm: "flex-start" } }}
                disabled={passSubmitting}
              >
                Actualizar contraseña
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </MainLayout>
  );
};
