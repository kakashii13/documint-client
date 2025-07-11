import { createBrowserRouter } from "react-router-dom";
import { AdminDashboard } from "../pages/AdminDashboard";
import { CreateClientForm } from "../layout/CreateClientForm";
import { ActivateAccount } from "../layout/activate-account";
import { ClientUserDashboard } from "../pages/ClientUserDashboard";
import { ProtectedRoute } from "./protectedRoute";
import { ClientDetail } from "../pages/ClientDetail";
import { CreateUserForm } from "../layout/CreateUserForm";
import { CreateAdvisorForm } from "../layout/CreateAdvisorForm";
import { UserDetail } from "../layout/UserDetail";
import { FormLayout } from "../layout/FormLayout";
import { ClientAdminDashboard } from "../pages/ClientAdminDashboard";
import { Login } from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/form/:slug",
    element: <FormLayout />,
  },
  {
    path: "/activate-account/:token",
    element: <ActivateAccount />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin-panel",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    errorElement: <div>Error</div>,
  },
  {
    path: "/create-client",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <CreateClientForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-detail/:clientId",
    element: (
      <ProtectedRoute allowedRoles={["admin", "admin-client"]}>
        <ClientDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-panel",
    element: (
      <ProtectedRoute allowedRoles={["admin", "admin-client"]}>
        <ClientAdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-detail/create-user",
    element: (
      <ProtectedRoute allowedRoles={["admin", "admin-client"]}>
        <CreateUserForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-user-panel",
    element: (
      <ProtectedRoute allowedRoles={["client"]}>
        <ClientUserDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-user-panel/:userId/create-advisor",
    element: (
      <ProtectedRoute allowedRoles={["client", "admin", "admin-client"]}>
        <CreateAdvisorForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-detail/user/:userId/advisors",
    element: (
      <ProtectedRoute allowedRoles={["client", "admin", "admin-client"]}>
        <UserDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-detail/:userId/create-advisor",
    element: (
      <ProtectedRoute allowedRoles={["client", "admin", "admin-client"]}>
        <CreateAdvisorForm />
      </ProtectedRoute>
    ),
  },
]);
