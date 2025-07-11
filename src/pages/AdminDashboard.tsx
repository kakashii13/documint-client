import {
  Container,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { TopBar } from "../components/TopBar";
import { useGetClients } from "../features/clients/hooks/useGetClients";
import { CreateButton } from "../components/ui/CreateButton";
import { Welcome } from "../components/Welcome";

type Client = {
  id: number;
  name: string;
  email: string;
};

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { clients } = useGetClients();

  const handleCreateClient = () => {
    navigate("/create-client");
  };

  const handleEnterClient = (client: Client) => {
    navigate(`/client-detail/${client?.id}`, {
      state: { client },
    });
  };

  return (
    <Box>
      <TopBar />
      <Container>
        {/* Página de bienvenida tras login */}
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Welcome />
          <CreateButton
            handleCreate={handleCreateClient}
            text="Crear Cliente"
          />
        </Box>

        {/* Listado de clientes en tabla */}
        <Box my={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            Listado de Clientes
          </Typography>
          {/*
            TODO: Implementar el mismo GRID que users
          */}
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
              {clients.map((client: any) => (
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
      </Container>
    </Box>
  );
};
