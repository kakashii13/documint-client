import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  Button,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LoginIcon from "@mui/icons-material/Login";

import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

import logo from "../assets/logo_documint.png";
import { useAuthStore } from "../hooks/useAuthStore";

// Rutas que se consideran "flow de auth"
const AUTH_ROUTES = ["/login", "/forgot-password", "/reset-password"];

export const TopBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  /** ------------------------ 1. BARRA PARA AUTH FLOW ---------------------- */
  const isAuthFlow =
    pathname === "/" || AUTH_ROUTES.some((r) => pathname.startsWith(r));
  if (isAuthFlow) {
    return (
      <AppBar position="static" sx={{ background: "#f5f7fa" }} elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo → Home */}
          <IconButton component={RouterLink} to="/" disableRipple>
            <img src={logo} alt="Documint" height={32} />
          </IconButton>

          {/* Botón “Iniciar sesión” (oculto si ya estás en /login) */}
          {pathname !== "/login" && (
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              size="small"
              startIcon={<LoginIcon />}
            >
              Iniciar sesión
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  }

  /** --------------------- 2. BARRA PARA USUARIO LOGUEADO ------------------ */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const handleNavigateHome = () => {
    if (user?.role === "admin") navigate("/admin-panel");
    else if (user?.role === "admin-client")
      navigate(`/client-panel/${user?.clientId}`);
    else navigate("/user-panel");
  };

  return (
    <AppBar position="static" elevation={1} sx={{ bgcolor: "primary.main" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo + nombre */}
        <Box
          onClick={handleNavigateHome}
          display="flex"
          alignItems="center"
          px={1}
          sx={{
            cursor: "pointer",
            "&:hover": { bgcolor: "rgba(255,255,255,0.08)", borderRadius: 1 },
          }}
        >
          <img src={logo} alt="Logo" style={{ height: 40, marginRight: 8 }} />
          <Typography variant="h6" color="#fff" noWrap>
            Documint
          </Typography>
        </Box>

        {/* Menu “…” */}
        <IconButton onClick={openMenu} size="small">
          <MoreHorizIcon sx={{ color: "#fff" }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem
            onClick={() => {
              /* TODO: perfil */ closeMenu();
            }}
          >
            Cuenta
          </MenuItem>
          <MenuItem
            onClick={() => {
              closeMenu();
              logout();
            }}
          >
            Salir
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
