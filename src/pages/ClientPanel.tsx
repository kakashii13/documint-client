import {
  Box,
  Button,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAuthStore } from "../hooks/useAuthStore";
import { TopBar } from "../components/TopBar";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api";
import hand from "../assets/hand.png";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ToasterAlert } from "../components/alert";

export const PanelClient = () => {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state: any) => state.user);
  const token = useAuthStore((state: any) => state.token);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "name", headerName: "Nombre", flex: 1, minWidth: 100 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 100 },
    {
      field: "slug",
      headerName: "Link",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        const handleCopy = () => {
          navigator.clipboard.writeText(params.value);
          setAlert({
            open: true,
            type: "success",
            message: "Link copiado al portapapeles.",
          });
        };

        return (
          <Box display="flex" alignItems="center" gap={1}>
            <Tooltip title="Copiar al portapapeles">
              <IconButton size="small" onClick={handleCopy}>
                <ContentCopyIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Box
              sx={{
                cursor: "pointer",
                color: "#0061b0",
                textDecoration: "underline",
              }}
              onClick={handleCopy}
            >
              {params.value}
            </Box>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={() => {
            handleDelete(params.row.id);
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        setLoading(true);
        const response = await apiService.get(`/users/${user?.id}/advisors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdvisors(response?.data?.advisors || []);
        setLoading(false);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Error al obtener los asesores.";
        setAlert({ open: true, type: "error", message: errorMessage });
        setLoading(false);
      }
    };
    fetchAdvisors();
  }, []);

  const handleDelete = async (advisorId: number) => {
    try {
      setLoading(true);
      await apiService.delete(`/users/${user?.id}/advisors/${advisorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdvisors(advisors.filter((advisor: any) => advisor.id !== advisorId));
      setAlert({
        open: true,
        type: "success",
        message: "Asesor eliminado correctamente.",
      });
      setLoading(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al eliminar el asesor.";
      setAlert({ open: true, type: "error", message: errorMessage });
      setLoading(false);
    }
  };

  return (
    <Box>
      <TopBar />
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          my={2}
          width={"100%"}
        >
          <Typography variant="h5">{`Hola ${user?.name}`}</Typography>

          <img
            src={hand}
            alt="Hand icon"
            style={{ height: 25, marginLeft: 8 }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={5}
        >
          <Typography variant="h5">Asesores</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              navigate(`/client-panel/${user?.id}/create-advisor`, {
                state: { user: user, clientId: user?.clientId },
              });
            }}
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
      </Container>
      <ToasterAlert
        open={alert.open}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ ...alert, open: false })}
      />
    </Box>
  );
};
