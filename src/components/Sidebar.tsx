import React, { useMemo, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  LuLayoutDashboard,
  LuUsers,
  LuSettings,
  LuChevronDown,
  LuUser,
  LuLogOut,
} from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import logo from "../assets/logo_documint.png";

export const SIDEBAR_WIDTH = 208;

type NavItem = {
  key: string;
  label: string;
  icon: React.ReactElement;
  to: string;
  visible?: boolean;
};

export function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  const dashboardPath = useMemo(() => {
    if (user?.role === "admin") return "/admin-panel";
    if (user?.role === "admin-client") return `/client-panel/${user?.clientId}`;
    return `/client-user-panel/${user?.clientId}`;
  }, [user]);

  const usuariosPath = useMemo(() => {
    if (user?.role === "admin-client") return `/client-detail/${user?.clientId}`;
    return ""; // oculto para otros roles para evitar conflicto con Dashboard
  }, [user]);

  const items: NavItem[] = [
    { key: "dashboard", label: "Dashboard", icon: <LuLayoutDashboard />, to: dashboardPath, visible: true },
    { key: "usuarios", label: "Usuarios", icon: <LuUsers />, to: usuariosPath, visible: user?.role === "admin-client" },
    { key: "settings", label: "Configuración", icon: <LuSettings />, to: "/settings", visible: true },
  ];

  const handleNav = (to: string) => {
    if (!to) return;
    navigate(to);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          borderRight: "1px solid",
          borderColor: "divider",
          backgroundColor: "#fafbfc",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
        {/* Brand */}
        <Toolbar>
          <Box display="flex" alignItems="center" gap={1}>
            <img src={logo} alt="Documint" height={22} />
            <Typography variant="subtitle1" fontWeight={700} color="text.primary">
              Documint
            </Typography>
          </Box>
        </Toolbar>
        <Divider />

        {/* Navigation */}
        <Box sx={{ flex: 1, overflow: "auto", pt: 1 }}>
          <List sx={{ pt: 0 }}>
            {items
              .filter((i) => i.visible)
              .map((item) => {
                const isActive = Boolean(item.to) && (pathname === item.to || pathname.startsWith(item.to + "/"));
                return (
                  <ListItemButton
                    key={item.key}
                    selected={isActive}
                    onClick={() => handleNav(item.to)}
                    sx={{
                      mx: 1,
                      my: 0.25,
                      px: 1,
                      py: 0.5,
                      minHeight: 34,
                      borderRadius: 1,
                      color: "text.secondary",
                      '& .MuiListItemIcon-root': { color: "text.secondary" },
                      '& svg': { fontSize: 18 },
                      '& .MuiListItemText-primary': { fontSize: "0.9rem", fontWeight: 500 },
                      '&.Mui-selected': {
                        bgcolor: "action.selected",
                        color: "text.primary",
                        '& .MuiListItemIcon-root': { color: "text.primary" },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 26 }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                );
              })}
          </List>
        </Box>

        {/* User menu at bottom */}
        <Box sx={{ pb: 1 }}>
          <Divider sx={{ mb: 0.5 }} />
          <UserMenu />
        </Box>
      </Box>
    </Drawer>
  );
}

function UserMenu() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const initial = (user?.name || user?.email || "?").slice(0, 1).toUpperCase();

  return (
    <>
      <List>
        <ListItemButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            mx: 1,
            borderRadius: 1,
            px: 1,
            py: 0.75,
            minHeight: 44,
            color: "text.primary",
          }}
        >
          <ListItemIcon sx={{ minWidth: 30 }}>
            <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>{initial}</Avatar>
          </ListItemIcon>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" noWrap>
              {user?.name || "Usuario"}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user?.email}
            </Typography>
          </Box>
          <LuChevronDown />
        </ListItemButton>
      </List>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MenuItem disabled>
          <Box>
            <Typography variant="body2">{user?.name || "Usuario"}</Typography>
            <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { setAnchorEl(null); navigate("/account"); }}>
          <ListItemIcon>
            <LuUser />
          </ListItemIcon>
          Cuenta
        </MenuItem>
        <MenuItem onClick={() => { setAnchorEl(null); navigate("/settings"); }}>
          <ListItemIcon>
            <LuSettings />
          </ListItemIcon>
          Configuración
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { setAnchorEl(null); logout(); navigate("/login"); }}>
          <ListItemIcon>
            <LuLogOut />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  );
}

