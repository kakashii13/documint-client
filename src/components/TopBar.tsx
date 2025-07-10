import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Ruta de tu logo
import logo from "../assets/logo_documint.png";
import { useAuthStore } from "../hooks/useAuthStore";
import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const logout = useAuthStore((state: any) => state.logout);
  const user = useAuthStore((state: any) => state.user);
  const navigate = useNavigate();

  const handleAvatarClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavigate = () => {
    if (user?.role === "admin") {
      navigate("/admin-panel");
    } else {
      navigate("/client-panel");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccount = () => {
    // lógica para "cuenta"
    handleClose();
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{ backgroundColor: "#1b62b4", color: "#000" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo a la izquierda */}
        <Box
          display="flex"
          alignItems="center"
          onClick={handleNavigate}
          px="10px"
          sx={{
            cursor: "pointer",
            ":hover": {
              bgcolor: "rgba(197, 209, 219, 0.5)", // 0.5 = 50% opacidad
              borderRadius: "4px",
              px: "10px",
            },
          }}
        >
          <img src={logo} alt="Logo" style={{ height: 40, marginRight: 8 }} />
          <Typography variant="h6" color="#fff" noWrap>
            Documint
          </Typography>
        </Box>

        {/* Avatar y menú a la derecha */}
        <IconButton onClick={handleAvatarClick} size="small">
          <Avatar sx={{ width: 35, height: 35 }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleAccount}>Cuenta</MenuItem>
          <MenuItem onClick={handleLogout}>Salir</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
