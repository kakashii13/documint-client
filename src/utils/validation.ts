import dayjs from "dayjs";
import * as yup from "yup";

const schema = yup.object().shape({
  nombre: yup
    .string()
    .required("Campo obligatorio")
    .min(3, "Mínimo 3 caracteres"),
  fechaNac: yup
    .string()
    .required("Campo obligatorio")
    .test("not-in-future", "La fecha no puede ser futura", (value) => {
      if (!value) return true;
      const fecha = dayjs(value, "DD/MM/YYYY", true);
      return fecha.isValid() && fecha.isBefore(dayjs().add(1, "day"), "day");
    }),
  tipoDoc: yup.string().required("Campo obligatorio"),
  sexo: yup.string().required("Campo obligatorio"),
  nacionalidad: yup.string().required("Campo obligatorio"),
  estadoCivil: yup.string().required("Campo obligatorio"),
  dni: yup
    .string()
    .matches(/^[0-9]+$/, "Debe contener solo números")
    .required("Campo obligatorio")
    .min(8, "Mínimo 8 caracteres")
    .max(8, "Máximo 8 caracteres"),
  calle: yup
    .string()
    .required("Campo obligatorio")
    .min(3, "Mínimo 3 caracteres"),
  numero: yup
    .string()
    .matches(/^[0-9]+$/, "Debe contener solo números")
    .required("Campo obligatorio"),
  piso: yup.string(),
  dto: yup.string(),
  entreCalles: yup.string(),
  tel1: yup
    .string()
    .matches(/^[0-9]+$/, "Debe contener solo números")
    .required("Campo obligatorio"),
  tel2: yup
    .string()
    .nullable()
    .notRequired()
    .test(
      "solo-numeros",
      "Debe contener solo números",
      (value) => !value || /^[0-9]+$/.test(value)
    ),
  localidad: yup.string().required("Campo obligatorio"),
  cp: yup
    .string()
    .test(
      "solo-numeros",
      "Debe contener solo números",
      (value) => !value || /^[0-9]+$/.test(value)
    )
    .required("Campo obligatorio"),
  provincia: yup.string().required("Campo obligatorio"),
  claveFiscal: yup.string().required("Campo obligatorio"),
  email: yup
    .string()
    .email("Debe ser un correo electrónico válido")
    .required("Campo obligatorio"),
  empresa: yup.string(),
  cuitEmpresa: yup
    .string()
    .nullable()
    .notRequired()
    .test(
      "solo-numeros",
      "Debe contener solo números",
      (value) => !value || /^[0-9]+$/.test(value)
    ),
  calleEmpresa: yup.string(),
  localidadEmpresa: yup.string(),
  cpEmpresa: yup
    .string()
    .nullable()
    .notRequired()
    .test(
      "solo-numeros",
      "Debe contener solo números",
      (value) => !value || /^[0-9]+$/.test(value)
    ),
  provinciaEmpresa: yup.string(),
  presionAlta: yup.boolean().required("Campo obligatorio"),
  presionAltaDesde: yup.string().when("presionAlta", {
    is: (presionAlta: boolean) => presionAlta === true,
    then: (schema) =>
      schema.required("Campo obligatorio si tiene presión alta"),
    otherwise: (schema) => schema.notRequired(),
  }),
  fuma: yup.boolean().required("Campo obligatorio"),
  cantFuma: yup.string().when("fuma", {
    is: (fuma: boolean) => fuma === true,
    then: (schema) => schema.required("Campo obligatorio si fuma"),
    otherwise: (schema) => schema.notRequired(),
  }),
  diabetes: yup.boolean().required("Campo obligatorio"),
  diabetesDesde: yup
    .string()
    .nullable()
    .when("diabetes", {
      is: (diabetes: boolean) => diabetes === true,
      then: (schema) => schema.required("Campo obligatorio si tiene diabetes"),
      otherwise: (schema) => schema.notRequired(),
    }),
  operaciones: yup.boolean().required("Campo obligatorio"),
  operacionesCuales: yup.string().when("operaciones", {
    is: (operaciones: boolean) => operaciones === true,
    then: (schema) =>
      schema.required("Campo obligatorio si tuvo alguna operación"),
    otherwise: (schema) => schema.notRequired(),
  }),
  medicamentos: yup.boolean().required("Campo obligatorio"),
  alergiasMedicamentos: yup.boolean().required("Campo obligatorio"),
  alergiasMedicamentosCuales: yup.string().when("alergiasMedicamentos", {
    is: (alergiasMedicamentos: boolean) => alergiasMedicamentos === true,
    then: (schema) =>
      schema.required("Campo obligatorio si tiene alergias a medicamentos"),
    otherwise: (schema) => schema.notRequired(),
  }),
  asesor: yup.string().required("Campo obligatorio"),
  observaciones: yup.string().notRequired(),
  firma: yup.string().required("La firma es requerida."),
  familiares: yup.array().of(
    yup.object().shape({
      parentesco: yup.string().nullable().notRequired(),

      nombre: yup
        .string()
        .nullable()
        .notRequired()
        .test(
          "min-caracteres",
          "Mínimo 3 caracteres",
          (value) => !value || value.length >= 3
        ),

      edad: yup
        .string()
        .nullable()
        .notRequired()
        .test(
          "solo-numeros-y-longitud",
          "Debe contener entre 1 y 3 dígitos numéricos",
          (value) =>
            !value ||
            (/^[0-9]+$/.test(value) && value.length >= 1 && value.length <= 3)
        ),

      dni: yup
        .string()
        .nullable()
        .notRequired()
        .test(
          "dni-valido",
          "Debe tener 8 dígitos numéricos",
          (value) => !value || /^[0-9]{8}$/.test(value)
        ),

      fechaNac: yup
        .string()
        .nullable()
        .notRequired()
        .test("not-in-future", "La fecha no puede ser futura", (value) => {
          if (!value) return true;
          const fecha = dayjs(value, "DD/MM/YYYY", true);
          return (
            fecha.isValid() && fecha.isBefore(dayjs().add(1, "day"), "day")
          );
        }),
    })
  ),
});

export default schema;
