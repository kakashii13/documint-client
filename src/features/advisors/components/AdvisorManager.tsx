import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useAlertStore } from "../../../hooks/useAlertStore";

export const AdvisorManager = ({
  advisors,
  onCreate,
}: {
  advisors: any;
  onCreate: () => void;
}) => {
  const showAlert = useAlertStore((state) => state.showAlert);
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
          showAlert("success", "Link copiado");
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

  // TODO: Implement delete logic
  const handleDelete = (id: number) => {
    // Implement delete logic here
    console.log(`Delete advisor with ID: ${id}`);
  };
  return (
    <Box height={400}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Asesores</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
          Crear asesor
        </Button>
      </Box>
      <DataGrid
        rows={advisors}
        columns={columns}
        //   pageSize={5}
        //   rowsPerPageOptions={[5, 10]}
        //   disableSelectionOnClick
        autoHeight
      />
    </Box>
  );
};
