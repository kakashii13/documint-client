import { Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import { Box } from "@mui/material";

type ProtectedRouteProps = {
  allowedRoles?: string[];
  children: React.ReactNode;
};

export const ProtectedRoute = ({
  allowedRoles,
  children,
}: ProtectedRouteProps) => {
  const user = useAuthStore((state: any) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Box>{children}</Box>;
};
