import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";

export const AdvisorManager = ({ advisors }: { advisors: any }) => {
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
          // setAlert({
          //   open: true,
          //   type: "success",
          //   message: "Link copiado al portapapeles.",
          // });
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

  const handleDelete = (id: number) => {
    // Implement delete logic here
    console.log(`Delete advisor with ID: ${id}`);
  };
  return (
    <Box>
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
    </Box>
  );
};
