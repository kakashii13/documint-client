import { Box, IconButton, Typography, Button, Chip } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import { ConfirmAction } from "../../../components/ConfirmAction";
import { useState } from "react";

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
  onNavigateAdvisors: (userId: number) => void;
}) => {
  const [selectedUser, setSelectedUser] = useState<null | User>(null);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nombre", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    {
      field: "active",
      headerName: "Estado",
      width: 110,
      renderCell: (params) =>
        params.row.active ? (
          <Chip
            icon={<CheckCircleOutlineIcon />}
            label="Activo"
            size="small"
            color="success"
            variant="outlined"
          />
        ) : (
          <Chip
            icon={<CancelOutlinedIcon />}
            label="Inactivo"
            size="small"
            color="default"
            variant="outlined"
          />
        ),
    },
    {
      field: "role",
      headerName: "Rol",
      width: 130,
      renderCell: (params) => (
        <Chip label={params.value} size="small" variant="outlined" />
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 90,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={0.5}>
          <IconButton
            size="small"
            onClick={() => setSelectedUser(params.row)}
            disabled={loading}
            sx={{ color: "text.secondary", "&:hover": { color: "error.main" } }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onNavigateAdvisors(params.row.id)}
            sx={{ color: "text.secondary" }}
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
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight={600}>
          Usuarios
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
          Crear usuario
        </Button>
      </Box>

      <Box sx={{ height: 420 }}>
        <DataGrid
          rows={users}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          localeText={{
            noRowsLabel: "No hay usuarios registrados.",
            noResultsOverlayLabel: "Resultados no encontrados.",
            paginationRowsPerPage: "Filas por página:",
            footerTotalRows: "Filas totales:",
          }}
        />
      </Box>

      {selectedUser && (
        <ConfirmAction
          open={!!selectedUser}
          setOpen={(open) => {
            if (!open) setSelectedUser(null);
          }}
          textConfirmation={`¿Estás seguro de que deseas eliminar a ${selectedUser.name}?`}
          onConfirm={() => {
            onDelete(selectedUser.id);
            setSelectedUser(null);
          }}
        />
      )}
    </Box>
  );
};
