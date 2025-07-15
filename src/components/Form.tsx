import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, Button, Divider, Paper } from "@mui/material";
import formSchema from "../utils/validation";
import { formFields } from "../utils/fields";
import CargaFamiliar from "./FamilyInputs";
import AttachFiles from "./AttachFiles";
import { useEffect, useState } from "react";
import { ConfirmForm } from "./ConfirmForm";
import { FormFields } from "./FormFields";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../services/api";
import { useGetAdvisor } from "../features/advisors/hooks/useGetAdvisor";
import { Signature } from "./Signature";

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

export default function Form() {
  const { slug } = useParams();
  const { advisor } = useGetAdvisor(slug || "");
  const [isAdvisorFixed, setIsAdvisorFixed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isConfirmForm, setIsConfirmForm] = useState<boolean | undefined>(
    undefined
  );
  const [deleteSignature, setDeleteSignature] = useState(false);
  const navigate = useNavigate();

  const { control, handleSubmit, reset, setValue } = useForm({
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

  useEffect(() => {
    if (advisor) {
      // Si el asesor tiene un nombre, lo asignamos al campo correspondiente
      setValue("asesor", advisor);
      setIsAdvisorFixed(true);
    }
  }, [advisor, setValue]);

  const onSubmit = async (data: Record<string, any>) => {
    try {
      setLoading(true);
      setDeleteSignature(false);

      const formData = new FormData();

      // 1. Recorrer campos y formatear / agregar al FormData
      Object.entries(data).forEach(([key, value]) => {
        // Verificar si es un archivo antes que cualquier otra cosa
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value instanceof FileList) {
          Array.from(value).forEach((file) => formData.append(key, file));
        } else if (Array.isArray(value)) {
          // Verificar si es array de archivos
          if (value[0] instanceof File) {
            value.forEach((file) => formData.append(key, file));
          } else {
            // Arrays de objetos (ej.: hijos[])
            value.forEach((item, index) => {
              Object.entries(item).forEach(([k, v]) => {
                const formatted =
                  v instanceof Date || isValidDateString(v)
                    ? formatDateToDDMMYYYY(v as string | Date)
                    : v;
                formData.append(
                  `${key}[${index}][${k}]`,
                  String(formatted ?? "")
                );
              });
            });
          }
        } else {
          // Primitivos
          const formatted =
            value instanceof Date || isValidDateString(value)
              ? formatDateToDDMMYYYY(value as string | Date)
              : value;
          formData.append(key, String(formatted ?? ""));
        }
      });

      // 2. Enviar
      const response = await apiService.post(
        `${import.meta.env.VITE_API_URL}/form/${slug}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // 3. Feedback al usuario
      setTimeout(() => {
        setDeleteSignature(true);
        reset();
        setIsConfirmForm(undefined);
        setLoading(false);
        navigate(`/form-submitted/${response.data.referenceNumber}`);
      }, 3000);
    } catch (err) {
      console.error("Error al enviar:", err);
      setLoading(false);
    }
  };

  return (
    <Box p={2} component={Paper}>
      <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
        <Typography variant="h6" pb="20px">
          Datos personales
        </Typography>

        <FormFields
          control={control}
          formFields={formFields}
          advisorFixed={isAdvisorFixed}
        />

        <CargaFamiliar control={control} />

        <Divider sx={{ my: 3 }} />

        <AttachFiles control={control} />

        <Divider sx={{ my: 3 }} />

        <Controller
          name="firma"
          control={control}
          render={({ field, fieldState }) => (
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Firma del solicitante
              </Typography>
              <Signature
                onFirmaChange={(dataUrl: string) => field.onChange(dataUrl)}
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
    </Box>
  );
}
