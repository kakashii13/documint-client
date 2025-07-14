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
import { useState } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { MainLayout } from "../layout/MainLayout";

export const Account = () => {
  const user = useAuthStore((s) => s.user);
  const [profile, setProfile] = useState({ name: user?.name ?? "" });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  /* ———————————————————
        Handlers “fake”          ⤵︎  añade tu lógica de API
       ——————————————————— */
  const handleSaveProfile = () => {
    console.log("Save profile", profile);
  };

  const handleChangePassword = () => {
    console.log("Change password", passwords);
  };

  /* ———————————————————
        UI
       ——————————————————— */
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
        {/* Título principal */}
        <Typography variant="h4" fontWeight={700} mb={3}>
          Configuración de la cuenta
        </Typography>

        {/* ———————————————————
            Perfil / nombre
           ——————————————————— */}
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
                src="" // --> agrega url si la tienes
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
                // onClick={handlePictureUpload}
              >
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Campos */}
            <Box flex={1} minWidth={240}>
              <Grid container spacing={2}>
                <Grid>
                  <TextField
                    fullWidth
                    label="Name"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, name: e.target.value }))
                    }
                  />
                </Grid>
                <Grid>
                  <TextField
                    fullWidth
                    label="Email"
                    value={user?.email}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handleSaveProfile}
              >
                Guardar cambios
              </Button>
            </Box>
          </Stack>
        </Paper>

        {/* ———————————————————
            Cambiar contraseña
           ——————————————————— */}
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

            <Grid container spacing={2}>
              <Grid>
                <TextField
                  fullWidth
                  type="password"
                  label="Contraseña actual"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, current: e.target.value }))
                  }
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  type="password"
                  label="Nueva contraseña"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, new: e.target.value }))
                  }
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  type="password"
                  label="Cofirmar nueva contraseña"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, confirm: e.target.value }))
                  }
                />
              </Grid>
            </Grid>

            <Button
              variant="outlined"
              sx={{ alignSelf: { xs: "stretch", sm: "flex-start" } }}
              onClick={handleChangePassword}
            >
              Actualizar contraseña
            </Button>
          </Stack>
        </Paper>
      </Box>
    </MainLayout>
  );
};
