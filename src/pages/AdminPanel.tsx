import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api";
import { useAuthStore } from "../hooks/useAuthStore";
import { ToasterAlert } from "../components/alert";
import { TopBar } from "../components/TopBar";

type Client = {
  id: number;
  name: string;
  email: string;
};

export const AdminPanel = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const token = useAuthStore((state: any) => state.token);
  const user = useAuthStore((state: any) => state.user);
  const navigate = useNavigate();

  const handleCreateClient = () => {
    navigate("/create-client");
  };

  const handleEnterClient = (client: Client) => {
    navigate(`/client-detail/${client?.id}`, {
      state: { client },
    });
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await apiService.get("/clients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { userId: user?.id },
        });
        setClients(response.data.clients);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Error al obtener clientes";
        setAlert({
          open: true,
          type: "error",
          message: errorMessage,
        });
      }
    };

    fetchClients();
  }, []);

  return (
    <Box>
      <TopBar />
      <Container>
        {/* Página de bienvenida tras login */}
        <Box
          my={4}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          <Typography variant="h5" component="h1" gutterBottom>
            {`Bienvenido, ${user?.name || "Usuario"}`}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateClient}
            sx={{ mt: 4 }}
          >
            Crear Cliente
          </Button>
        </Box>

        {/* Listado de clientes en tabla */}
        <Box my={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            Listado de Clientes
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id} hover>
                  <TableCell>{client.id}</TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEnterClient(client)}>
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
