import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useAlertStore } from "../../../hooks/useAlertStore";
import { useState } from "react";
import { ConfirmAction } from "../../../components/ConfirmAction";
import advisorApi from "../services/advisorApi";
import { useGetAdvisors } from "../hooks/useGetAdvisors";

export const AdvisorManager = ({
  onCreate,
  userId,
}: {
  onCreate: () => void;
  userId: number;
}) => {
  const [selectedAdvisor, setSelectedAdvisor] = useState<null | {
    id: number;
    name: string;
  }>(null);

  const { advisors, fetchAdvisors } = useGetAdvisors(userId);
  const showAlert = useAlertStore((state) => state.showAlert);
  const token = useAlertStore((state: any) => state.token);

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
        <Box>
          <IconButton
            size="small"
            onClick={() =>
              setSelectedAdvisor({ id: params.row.id, name: params.row.name })
            }
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleDelete = async (advisorId: number) => {
    try {
      await advisorApi.deleteAdvisor(Number(userId), advisorId, token);

      showAlert("success", "Asesor eliminado correctamente");
      fetchAdvisors();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al eliminar el asesor";
      showAlert("error", errorMessage);
    }
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
      {selectedAdvisor && (
        <ConfirmAction
          open={!!selectedAdvisor}
          setOpen={(open) => {
            if (!open) setSelectedAdvisor(null);
          }}
          textConfirmation={`¿Estás seguro de que deseas eliminar al asesor ${selectedAdvisor.name}?`}
          onConfirm={() => {
            handleDelete(selectedAdvisor.id);
            setSelectedAdvisor(null);
          }}
        />
      )}
    </Box>
  );
};
