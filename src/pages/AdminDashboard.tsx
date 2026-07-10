import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useGetClients } from "../features/clients/hooks/useGetClients";
import { MainLayout } from "../layout/MainLayout";
import { useClientStore } from "../hooks/useClientStore";

type Client = {
  id: number;
  name: string;
  email: string;
};

export const AdminDashboard = () => {
  const navigate = useNavigate();
  useGetClients();
  const clients = useClientStore((state) => state.clients);

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page header */}
        <Box
          display="flex"
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
          mb={4}
        >
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Panel de administración
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Gestioná los clientes de la plataforma.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/create-client")}
          >
            Crear cliente
          </Button>
        </Box>

        {/* Clients table */}
        <Paper
          elevation={0}
          sx={{ border: "1px solid", borderColor: "divider", overflow: "hidden" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary" variant="body2">
                      No hay clientes registrados todavía.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                clients.map((client: Client) => (
                  <TableRow
                    key={client.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/client-detail/${client.id}`)}
                  >
                    <TableCell sx={{ color: "text.secondary", width: 60 }}>
                      {client.id}
                    </TableCell>
                    <TableCell fontWeight={500}>{client.name}</TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>
                      {client.email}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <ArrowForwardIosIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </MainLayout>
  );
};
