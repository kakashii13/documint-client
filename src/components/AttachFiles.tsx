import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import { Controller } from "react-hook-form";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  control: any;
  name?: string;
}

export default function AttachFiles({ control, name = "adjuntos" }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field: { onChange, value }, fieldState }) => {
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (!e.target.files) return;

          const nuevosArchivos = Array.from(e.target.files).filter((file) =>
            ["application/pdf", "image/jpeg"].includes(file.type)
          );

          onChange([...(value || []), ...nuevosArchivos]);
        };

        const eliminarArchivo = (index: number) => {
          const actualizados = [...value];
          actualizados.splice(index, 1);
          onChange(actualizados);
        };

        return (
          <Box mt={3}>
            <Typography fontWeight="bold" gutterBottom>
              Adjuntar archivos (PDF o JPG)
            </Typography>

            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFileIcon />}
            >
              Seleccionar archivos
              <input
                type="file"
                hidden
                multiple
                accept=".pdf,.jpg,.jpeg"
                onChange={handleFileChange}
              />
            </Button>

            {value?.length > 0 && (
              <List dense sx={{ mt: 2, maxHeight: 200, overflowY: "auto" }}>
                {value.map((file: File, i: number) => (
                  <ListItem
                    key={i}
                    sx={{
                      borderBottom: "1px solid #ccc",
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 1,
                    }}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => eliminarArchivo(i)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    {file.name}
                  </ListItem>
                ))}
              </List>
            )}

            {fieldState.error && (
              <Typography color="error" variant="body2">
                {fieldState.error.message}
              </Typography>
            )}
          </Box>
        );
      }}
    />
  );
}
