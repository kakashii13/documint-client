import {
  Card,
  Typography,
  CardHeader,
  CardContent,
  CardActions,
  Stack,
} from "@mui/material";
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
  return (
    <Card
      elevation={0}
      sx={{
        mb: 4,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <CardHeader
        title={
          <Typography variant="h6" fontWeight="bold">
            {client?.name || "Cliente no encontrado"}
          </Typography>
        }
        subheader={client && `ID: ${client.id}`}
        sx={{
          pb: 0,
        }}
      />
      <CardContent sx={{ pt: 1 }}>
        {client ? (
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              <strong>Email:</strong> {client.email}
            </Typography>
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No se encontraron detalles del cliente.
          </Typography>
        )}
      </CardContent>
      {client && (
        <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
          <DeleteButton onConfirm={onDelete} loading={loading} />
        </CardActions>
      )}
    </Card>
  );
};
