import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, IconButton } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import apiService from "../services/api";
import { useAuthStore } from "../hooks/useAuthStore";
import { ToasterAlert } from "../components/alert";
import { TopBar } from "../components/TopBar";

type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
  role: string;
};

export const UserDetail = () => {
  const [advisors, setAdvisors] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const { state } = useLocation();
  const { user } = state || {};
  const token = useAuthStore((s: any) => s.token);
  const navigate = useNavigate();

  const handleDeleteAdvisor = async (advisorId: number) => {
    try {
      setLoading(true);
      await apiService.delete(`/users/${user?.id}/advisors/${advisorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      setAlert({
        open: true,
        type: "success",
        message: "Asesor eliminado correctamente",
      });

      setAdvisors(advisors.filter((advisor) => advisor.id !== advisorId));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al eliminar asesor";
      setAlert({
        open: true,
        type: "error",
        message: errorMessage,
      });
    }
    setLoading(false);
  };

  // Definir columnas para DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Nombre", flex: 1, maxWidth: 300 },
    { field: "email", headerName: "Email", flex: 1, maxWidth: 300 },
    { field: "slug", headerName: "Link", minWidth: 350 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            onClick={() => handleDeleteAdvisor(params.row.id)}
            loading={loading}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Obtener usuarios del cliente
  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const response = await apiService.get(`/users/${user?.id}/advisors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdvisors(response.data.advisors);
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
    fetchAdvisors();
  }, []);

  const handleCreateAdvisor = () => {
    navigate(`/client-detail/${user?.id}/create-advisor`, {
      state: { user: user, clientId: user?.clientId },
    });
  };

  return (
    <Box>
      <TopBar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5">Asesores</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateAdvisor}
          >
            Crear asesor
          </Button>
        </Box>

        <Box height={400}>
          <DataGrid
            rows={advisors}
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
