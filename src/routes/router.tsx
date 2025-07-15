import { createBrowserRouter } from "react-router-dom";
import { AdminDashboard } from "../pages/AdminDashboard";
import { CreateClientForm } from "../layout/CreateClientForm";
import { ActivateAccount } from "../pages/ActivateAccount";
import { ClientUserDashboard } from "../pages/ClientUserDashboard";
import { ProtectedRoute } from "./protectedRoute";
import { ClientDetail } from "../pages/ClientDetail";
import { CreateUserForm } from "../layout/CreateUserForm";
import { CreateAdvisorForm } from "../layout/CreateAdvisorForm";
import { UserDetail } from "../layout/UserDetail";
import { FormLayout } from "../layout/FormLayout";
import { ClientAdminDashboard } from "../pages/ClientAdminDashboard";
import { Login } from "../pages/Login";
import { ForgotPassword } from "../pages/ForgotPassword";
import { RestorePassword } from "../pages/RestorePassword";
import Landing from "../pages/Landing";
import { FormSendedPage } from "../pages/Success";
import { Account } from "../pages/Account";
import { NotFound } from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/form/:slug",
    element: <FormLayout />,
  },
  {
    path: "/form-submitted/:referenceNumber",
    element: <FormSendedPage />,
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
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token/:uid",
    element: <RestorePassword />,
  },
  {
    path: "/account",
    element: (
      <ProtectedRoute allowedRoles={["client", "admin", "admin-client"]}>
        <Account />
      </ProtectedRoute>
    ),
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
    path: "/client-panel/:clientId",
    element: (
      <ProtectedRoute allowedRoles={["admin-client"]}>
        <ClientAdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-detail/:clientId/create-user",
    element: (
      <ProtectedRoute allowedRoles={["admin", "admin-client"]}>
        <CreateUserForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-user-panel/:clientId",
    element: (
      <ProtectedRoute allowedRoles={["client"]}>
        <ClientUserDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-user-panel/:clientId/user/:userId/create-advisor",
    element: (
      <ProtectedRoute allowedRoles={["client", "admin", "admin-client"]}>
        <CreateAdvisorForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-detail/:clientId/user/:userId/advisors",
    element: (
      <ProtectedRoute allowedRoles={["client", "admin", "admin-client"]}>
        <UserDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-detail/:clientId/user/:userId/create-advisor",
    element: (
      <ProtectedRoute allowedRoles={["client", "admin", "admin-client"]}>
        <CreateAdvisorForm />
      </ProtectedRoute>
    ),
  },
  /* ------------------------------------------------------------- */
  /* 404: debe ir al FINAL de la configuración (por claridad)       */
  /* ------------------------------------------------------------- */
  {
    path: "*",
    element: <NotFound />,
  },
]);
