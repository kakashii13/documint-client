import { Box, Toolbar } from "@mui/material";
import { TopBar } from "../components/TopBar";
import { Sidebar, SIDEBAR_WIDTH } from "../components/Sidebar";
import { useLocation } from "react-router-dom";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const AUTH_ROUTES = [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/activate-account",
    "/form",
    "/form-submitted",
    "/login/success",
  ]; // prefixes considered non-app layout

  const isAuthFlow = pathname === "/" || AUTH_ROUTES.some((r) => pathname.startsWith(r));

  if (isAuthFlow) {
    return (
      <Box>
        <TopBar />
        {children}
      </Box>
    );
  }

  // App layout with sidebar
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};
