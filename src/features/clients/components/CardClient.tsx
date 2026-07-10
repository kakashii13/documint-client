import { Box, Typography, Chip } from "@mui/material";
import { DeleteButton } from "../../../components/DeleteButton";

export const CardClient = ({
  client,
  onDelete,
  loading,
}: {
  client?: { id: number; name: string; email: string };
  onDelete: () => void;
  loading: boolean;
}) => {
  if (!client) return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        p: 3,
        mb: 4,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <Box>
        <Box display="flex" alignItems="center" gap={1.5} mb={0.5}>
          <Typography variant="h6" fontWeight={700}>
            {client.name}
          </Typography>
          <Chip label={`ID ${client.id}`} size="small" variant="outlined" />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {client.email}
        </Typography>
      </Box>
      <DeleteButton onConfirm={onDelete} loading={loading} />
    </Box>
  );
};
