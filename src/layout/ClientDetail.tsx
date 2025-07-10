import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Stack,
  Button,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DeleteButton } from "../components/DeleteButton";
import apiService from "../services/api";
import { useAuthStore } from "../hooks/useAuthStore";
import { ToasterAlert } from "../components/alert";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { TopBar } from "../components/TopBar";

type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
  role: string;
};

type Client = {
  id: number;
  name: string;
  email: string;
};

export const ClientDetail = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const { state } = useLocation() as { state: { client?: Client } };
  const { client } = state || {};

  const token = useAuthStore((s: any) => s.token);
  const navigate = useNavigate();

  const handleDeleteUser = async (userId: number) => {
    try {
      setLoading(true);
      const response = await apiService.delete(
        `/clients/${client?.id}/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      setLoading(false);
      setAlert({
        open: true,
        type: "success",
        message: "Usuario eliminado correctamente",
      });

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al eliminar el usuario";
      setAlert({
        open: true,
        type: "error",
        message: errorMessage,
      });
      setLoading(false);
    }
  };

  // Definir columnas para DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Nombre", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    {
      field: "active",
      headerName: "Activo",
      width: 100,
      renderCell: (params) => (
        <Box>
          {params.row.active ? (
            <CheckCircleIcon sx={{ color: "green" }} />
          ) : (
            <CancelIcon sx={{ color: "red" }} />
          )}
        </Box>
      ),
    },
    { field: "role", headerName: "Rol", width: 120 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            onClick={() => handleDeleteUser(params.row.id)}
            loading={loading}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() =>
              navigate(`/client-detail/user/${params?.row?.id}/advisors`, {
                state: { user: params.row, clientId: client?.id },
              })
            }
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Obtener usuarios del cliente
  useEffect(() => {
    if (!client) return;
    const fetchUsers = async () => {
      try {
        const response = await apiService.get(`/clients/${client.id}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data.users);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Error al cargar usuarios";
        setAlert({
          open: true,
          type: "error",
          message: errorMessage,
        });
      }
    };
    fetchUsers();
  }, [client, token]);

  const handleCreateUser = () => {
    navigate("/client-detail/create-user", {
      state: { client },
    });
  };

  const handleDeleteClient = async () => {
    try {
      setLoading(true);
      if (!client) return;

      const response = await apiService.delete(`/clients/${client.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAlert({
        open: true,
        type: "success",
        message: response.data.message || "Cliente eliminado correctamente",
      });
      setLoading(false);
      setTimeout(() => {
        navigate("/admin-panel");
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al eliminar el cliente";
      setAlert({
        open: true,
        type: "error",
        message: errorMessage,
      });
      setLoading(false);
    }
  };

  return (
    <Box>
      <TopBar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Card elevation={2} sx={{ mb: 4 }}>
          <CardHeader
            title={`Cliente: ${client?.name}` || "Cliente no encontrado"}
            subheader={client ? `ID: ${client.id}` : ""}
          />
          <Divider />
          <CardContent>
            {client ? (
              <Stack spacing={1}>
                <Typography variant="body1">
                  <strong>Email:</strong> {client.email}
                </Typography>
              </Stack>
            ) : (
              <Typography>No se encontraron detalles del cliente.</Typography>
            )}
          </CardContent>
          {client && (
            <CardActions>
              <DeleteButton onConfirm={handleDeleteClient} loading={loading} />
            </CardActions>
          )}
        </Card>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5">Usuarios</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateUser}
          >
            Crear usuario
          </Button>
        </Box>

        <Box height={400}>
          <DataGrid
            rows={users}
            columns={columns}
            //   pageSize={5}
            //   rowsPerPageOptions={[5, 10]}
            //   disableSelectionOnClick
            autoHeight
          />
        </Box>
        <ToasterAlert
          open={alert.open}
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ ...alert, open: false })}
        />
      </Container>
    </Box>
  );
};
