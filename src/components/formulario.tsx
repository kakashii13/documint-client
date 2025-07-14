import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, Button, Divider, Paper } from "@mui/material";
import formSchema from "../utils/validation";
import { formFields } from "../utils/fields";
import CargaFamiliar from "./carga-familiar";
import AdjuntarArchivos from "./adjuntar-archivo";
import { useState } from "react";
import { Firma } from "./signature";
import { ConfirmForm } from "./confirm-form";
import { FormFields } from "./form-fields";
import { Success } from "./success";
import { useParams } from "react-router-dom";
import apiService from "../services/api";

const formatDateToDDMMYYYY = (date: string | Date): string => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const isValidDateString = (value: unknown): boolean => {
  return (
    typeof value === "string" &&
    !isNaN(Date.parse(value)) &&
    /^\d{4}-\d{2}-\d{2}/.test(value)
  );
};

export default function FormularioDocumint() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [isConfirmForm, setIsConfirmForm] = useState<boolean | undefined>(
    undefined
  );
  const [deleteSignature, setDeleteSignature] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      ...Object.fromEntries(
        formFields.map((f) => [f.name, f.type === "checkbox" ? null : ""])
      ),
      familiares: [
        { parentesco: "", nombre: "", edad: "", dni: "", fechaNac: "" },
      ],
    },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      setLoading(true);
      setSuccess(false);
      setDeleteSignature(false);
      const formData = new FormData();

      // Formatear fechas y agregar datos al FormData
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            Object.entries(item).forEach(([itemKey, itemValue]) => {
              const formatted =
                itemValue instanceof Date || isValidDateString(itemValue)
                  ? formatDateToDDMMYYYY(itemValue as string | Date)
                  : itemValue;
              formData.append(
                `${key}[${index}][${itemKey}]`,
                String(formatted ?? "")
              );
            });
          });
        } else if (value instanceof FileList || value instanceof File) {
          // Archivos se manejan aparte
        } else {
          const formatted =
            value instanceof Date || isValidDateString(value)
              ? formatDateToDDMMYYYY(value as string | Date)
              : value;
          formData.append(key, String(formatted ?? ""));
        }
      });

      // Adjuntos
      if (data.adjuntos && Array.isArray(data.adjuntos)) {
        data.adjuntos.forEach((file: File) => {
          formData.append("adjuntos", file);
        });
      }

      const response = await apiService.post(
        `${import.meta.env.VITE_API_URL}/form/${slug}`,
        formData
      );

      setMessage(response.data.message || "Formulario enviado con éxito");

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        setDeleteSignature(true);
        reset();
        setSuccess(false);
        setIsConfirmForm(undefined);
      }, 3000);
    } catch (error) {
      console.error("Error al enviar:", error);
      setLoading(false);
    }
  };

  return (
    <Box p={2} component={Paper}>
      <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
        <Typography variant="h6" pb="20px">
          Datos personales
        </Typography>

        <FormFields control={control} formFields={formFields} />

        <CargaFamiliar control={control} />

        <Divider sx={{ my: 3 }} />

        <AdjuntarArchivos control={control} />

        <Divider sx={{ my: 3 }} />

        <Controller
          name="firma"
          control={control}
          render={({ field, fieldState }) => (
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Firma del solicitante
              </Typography>
              <Firma
                onFirmaChange={(dataUrl) => field.onChange(dataUrl)}
                removeOnClick={deleteSignature}
              />

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

        <ConfirmForm
          isConfirm={isConfirmForm}
          setIsConfirm={setIsConfirmForm}
        />

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              reset();
              setIsConfirmForm(undefined);
            }}
          >
            Limpiar formulario
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || !isConfirmForm}
            loading={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </Box>
      </form>
      <Success success={success} text={message} />
    </Box>
  );
}
