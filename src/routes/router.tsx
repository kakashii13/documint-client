import { createBrowserRouter } from "react-router-dom";
import { AdminPanel } from "../pages/AdminPanel";
import { CreateClientForm } from "../layout/CreateClientForm";
import { ActivateAccount } from "../layout/activate-account";
import { Login } from "../layout/login";
import { PanelClient } from "../pages/ClientPanel";
import { ProtectedRoute } from "./protectedRoute";
import { ClientDetail } from "../layout/ClientDetail";
import { CreateUserForm } from "../layout/CreateUserForm";
import { CreateAdvisorForm } from "../layout/CreateAdvisorForm";
import { UserDetail } from "../layout/UserDetail";
import { FormLayout } from "../layout/form";

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
        <AdminPanel />
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
      <ProtectedRoute allowedRoles={["admin"]}>
        <ClientDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-detail/create-user",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <CreateUserForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-panel",
    element: (
      <ProtectedRoute allowedRoles={["client"]}>
        <PanelClient />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-panel/:userId/create-advisor",
    element: (
      <ProtectedRoute allowedRoles={["client", "admin"]}>
        <CreateAdvisorForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-detail/user/:userId/advisors",
    element: (
      <ProtectedRoute allowedRoles={["client", "admin"]}>
        <UserDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-detail/:userId/create-advisor",
    element: (
      <ProtectedRoute allowedRoles={["client", "admin"]}>
        <CreateAdvisorForm />
      </ProtectedRoute>
    ),
  },
]);
