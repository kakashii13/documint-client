// src/components/CargaFamiliar.tsx
import { Controller, useFieldArray } from "react-hook-form";
import {
  Grid,
  MenuItem,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import DatePickerCustom from "./date-picker";

const familiarFields = [
  {
    name: "parentesco",
    label: "Parentesco",
    type: "select",
    options: [
      "Cónyuge",
      "Concubina/o",
      "Hijo/a",
      "Familiar a cargo",
      "Menor bajo guarda",
    ],
    xs: 12,
  },
  { name: "dni", label: "DNI", type: "text", xs: 12, maxLength: 8 },
  {
    name: "nombre",
    label: "Apellido y Nombre",
    type: "text",
    xs: 12,
    maxLength: 100,
  },
  {
    name: "edad",
    label: "Edad",
    type: "text",
    xs: 5,
    maxLength: 3,
  }, // Solo números
  { name: "fechaNac", label: "Fecha Nac.", type: "date", xs: 7 },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CargaFamiliar({ control }: { control: any }) {
  const { fields, append } = useFieldArray({
    control,
    name: "familiares",
  });

  return (
    <>
      <Typography variant="h6" mt={2} mb={2}>
        Carga familiar
      </Typography>

      {fields.map((item, index) => (
        <Box
          key={item.id}
          mb={3}
          p={2}
          sx={{
            border: "1px solid #ddd",
            borderRadius: 2,
            backgroundColor: "#fafafa",
          }}
        >
          <Grid container spacing={2}>
            {familiarFields.map(
              ({ name, label, type, options, xs, maxLength }) => (
                <Grid key={`${name}-${index}`} size={{ xs }}>
                  <Controller
                    name={`familiares.${index}.${name}`}
                    control={control}
                    render={({ field, fieldState }) =>
                      type === "select" ? (
                        <TextField
                          {...field}
                          select
                          label={label}
                          fullWidth
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        >
                          {options?.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                              {opt}
                            </MenuItem>
                          ))}
                        </TextField>
                      ) : type === "date" ? (
                        <DatePickerCustom
                          value={field.value}
                          onChange={field.onChange}
                          label={label}
                          disabled={field.disabled}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          required={undefined}
                        />
                      ) : (
                        <TextField
                          {...field}
                          label={label}
                          fullWidth
                          type={type}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          inputProps={{ maxLength: maxLength || undefined }}
                        />
                      )
                    }
                  />
                </Grid>
              )
            )}
          </Grid>
        </Box>
      ))}

      <Button
        sx={{ mt: 1 }}
        onClick={() =>
          append({
            parentesco: "",
            nombre: "",
            edad: "",
            dni: "",
            fechaNac: "",
          })
        }
      >
        Agregar familiar
      </Button>
    </>
  );
}
