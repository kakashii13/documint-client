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
  Avatar,
  Divider,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo_documint.png";
import { useAuthStore } from "../hooks/useAuthStore";

const AUTH_ROUTES = ["/login", "/forgot-password", "/reset-password"];

export const TopBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const isAuthFlow =
    pathname === "/" || AUTH_ROUTES.some((r) => pathname.startsWith(r));

  /** Auth / landing navbar */
  if (isAuthFlow) {
    return (
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", minHeight: 64 }}>
          <IconButton component={RouterLink} to="/" disableRipple sx={{ p: 0 }}>
            <img src={logo} alt="Documint" height={36} />
          </IconButton>

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

  /** Logged-in navbar */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const handleNavigateHome = () => {
    if (user?.role === "admin") navigate("/admin-panel");
    else if (user?.role === "admin-client")
      navigate(`/client-panel/${user?.clientId}`);
    else navigate(`/client-user-panel/${user?.clientId}`);
  };

  const initials = user?.name
    ?.split(" ")
    .slice(0, 2)
    .map((w: string) => w[0])
    .join("")
    .toUpperCase() ?? "U";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
        top: 0,
        zIndex: (t) => t.zIndex.appBar,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 64 }}>
        {/* Logo + brand */}
        <Box
          onClick={handleNavigateHome}
          display="flex"
          alignItems="center"
          gap={1}
          sx={{
            cursor: "pointer",
            px: 1,
            py: 0.5,
            borderRadius: 2,
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <img src={logo} alt="Documint" style={{ height: 32 }} />
          <Typography
            variant="subtitle1"
            fontWeight={700}
            color="primary.main"
            noWrap
          >
            Documint
          </Typography>
        </Box>

        {/* User avatar menu */}
        <IconButton
          onClick={openMenu}
          size="small"
          sx={{
            border: "1.5px solid",
            borderColor: "divider",
            borderRadius: 2,
            p: 0.5,
          }}
        >
          <Avatar
            sx={{
              width: 30,
              height: 30,
              fontSize: 13,
              fontWeight: 700,
              bgcolor: "primary.main",
            }}
          >
            {initials}
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{ paper: { sx: { mt: 1, minWidth: 180 } } }}
        >
          <Box px={2} py={1.5}>
            <Typography variant="body2" fontWeight={600} noWrap>
              {user?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user?.email}
            </Typography>
          </Box>
          <Divider />
          <MenuItem
            onClick={() => {
              closeMenu();
              navigate("/account");
            }}
          >
            Mi cuenta
          </MenuItem>
          <MenuItem
            onClick={() => {
              closeMenu();
              logout();
            }}
            sx={{ color: "error.main" }}
          >
            Cerrar sesión
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
