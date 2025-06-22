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
  cuil: yup
    .string()
    .matches(/^[0-9]+$/, "Debe contener solo números")
    .required("Campo obligatorio")
    .min(11, "Mínimo 11 caracteres")
    .max(11, "Máximo 11 caracteres"),
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
  medicamentos: yup.boolean().required("Campo obligatorio"),
  alergiasMedicamentos: yup.boolean().required("Campo obligatorio"),
  alergiasMedicamentosCuales: yup.string().when("alergiasMedicamentos", {
    is: (alergiasMedicamentos: boolean) => alergiasMedicamentos === true,
    then: (schema) =>
      schema.required("Campo obligatorio si tiene alergias a medicamentos"),
    otherwise: (schema) => schema.notRequired(),
  }),
  observaciones: yup.string().notRequired(),
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

      cuil: yup
        .string()
        .nullable()
        .notRequired()
        .test(
          "cuil-valido",
          "Debe tener 11 dígitos numéricos",
          (value) => !value || /^[0-9]{11}$/.test(value)
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
