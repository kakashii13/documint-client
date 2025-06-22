import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  TextField,
  Typography,
  Grid,
  MenuItem,
  Button,
  Divider,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import schema from "../utils/validation";
import { formFields } from "../utils/fields";
import CargaFamiliar from "./carga-familiar";
import DatePickerCustom from "./date-picker";
import AdjuntarArchivos from "./adjuntar-archivo";
import { useState } from "react";
import { Firma } from "./signature";

const formatDateToDDMMYYYY = (date: string | Date): string => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const isValidDateString = (value: any): boolean => {
  return (
    typeof value === "string" &&
    !isNaN(Date.parse(value)) &&
    /^\d{4}-\d{2}-\d{2}/.test(value)
  );
};

export default function FormularioDocumint() {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      ...Object.fromEntries(
        formFields.map((f) => [f.name, f.type === "checkbox" ? false : ""])
      ),
      familiares: [
        { parentesco: "", nombre: "", edad: "", cuil: "", fechaNac: "" },
      ],
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            Object.entries(item).forEach(([itemKey, itemValue]) => {
              const formatted =
                itemValue instanceof Date || isValidDateString(itemValue)
                  ? formatDateToDDMMYYYY(itemValue)
                  : itemValue;
              formData.append(`${key}[${index}][${itemKey}]`, formatted ?? "");
            });
          });
        } else if (value instanceof FileList || value instanceof File) {
          // Archivos se manejan aparte
        } else {
          const formatted =
            value instanceof Date || isValidDateString(value)
              ? formatDateToDDMMYYYY(value)
              : value;
          formData.append(key, formatted ?? "");
        }
      });

      // Adjuntos
      if (data.adjuntos && Array.isArray(data.adjuntos)) {
        data.adjuntos.forEach((file: File) => {
          formData.append("adjuntos", file);
        });
      }

      const response = await fetch("http://localhost:3000/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al enviar el formulario");

      const result = await response.json();
      console.log("Formulario enviado correctamente", result);
      setLoading(false);
      // control._reset();
    } catch (error) {
      console.error("Error al enviar:", error);
    }
  };

  return (
    <Box p={2} component={Paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" pb="20px">
          Datos personales
        </Typography>

        <Grid container spacing={2} columns={12}>
          {formFields.map(
            ({
              name,
              label,
              type,
              options,
              dependsOn,
              col,
              xs,
              maxLength,
              required,
            }) => {
              const watchValue = dependsOn
                ? useWatch({ control, name: dependsOn })
                : true;
              const isDisabled = dependsOn && !watchValue;

              return (
                <Grid
                  key={name}
                  size={{ xs: xs || 12, sm: col || 6, md: col || 4 }}
                >
                  <Controller
                    name={name}
                    control={control}
                    render={({ field, fieldState }) =>
                      type === "select" ? (
                        <TextField
                          {...field}
                          select
                          label={label}
                          fullWidth
                          disabled={isDisabled}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          required={required || false}
                        >
                          {options?.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      ) : type === "checkbox" ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...field}
                              checked={Boolean(field.value)}
                              required={required || false}
                            />
                          }
                          label={label}
                        />
                      ) : type === "textarea" ? (
                        <TextField
                          {...field}
                          label={label}
                          fullWidth
                          multiline
                          disabled={isDisabled}
                          rows={3}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          inputProps={{ maxLength: maxLength || undefined }}
                          required={required || false}
                        />
                      ) : type === "date" ? (
                        <DatePickerCustom
                          value={field.value}
                          onChange={field.onChange}
                          label={label}
                          disabled={isDisabled}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          required={required || false}
                        />
                      ) : (
                        <TextField
                          {...field}
                          label={label}
                          type={type}
                          disabled={isDisabled}
                          fullWidth
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          inputProps={{ maxLength: maxLength || undefined }}
                          required={required || false}
                        />
                      )
                    }
                  />
                </Grid>
              );
            }
          )}
        </Grid>

        <CargaFamiliar control={control} />

        <AdjuntarArchivos control={control} />

        <Controller
          name="firma"
          control={control}
          render={({ field, fieldState }) => (
            <Box mt={3}>
              <Typography variant="subtitle1" gutterBottom>
                Firma del solicitante
              </Typography>
              <Firma onFirmaChange={(dataUrl) => field.onChange(dataUrl)} />

              {field.value && (
                <Box mt={2}>
                  <Typography variant="caption" display="block">
                    Vista previa:
                  </Typography>
                  <img
                    src={field.value}
                    alt="Firma"
                    style={{ border: "1px solid #ccc", maxWidth: 300 }}
                  />
                </Box>
              )}

              {fieldState.error && (
                <Typography color="error" variant="caption">
                  {fieldState.error.message}
                </Typography>
              )}
            </Box>
          )}
        />

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => control._reset()}
          >
            Limpiar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            loading={loading}
          >
            Enviar
          </Button>
        </Box>
      </form>
    </Box>
  );
}
