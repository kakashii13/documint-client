import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CreateButton } from "../../../components/ui/CreateButton";

type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
  role: string;
};

export const UsersTable = ({
  users,
  loading,
  onCreate,
  onDelete,
  onNavigateAdvisors,
}: {
  users: User[];
  loading: boolean;
  onCreate: () => void;
  onDelete: (id: number) => void;
  onNavigateAdvisors: (params: any, userId: number) => void;
}) => {
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
            onClick={() => onDelete(params.row.id)}
            loading={loading}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onNavigateAdvisors(params, params.row.id)}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];
  return (
    <Box>
      <Box
        my="10px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5">Usuarios</Typography>
        <CreateButton handleCreate={onCreate} text="Crear Usuario" />
      </Box>
      <Box height={400}>
        <DataGrid rows={users} columns={columns} autoHeight />
      </Box>
    </Box>
  );
};
