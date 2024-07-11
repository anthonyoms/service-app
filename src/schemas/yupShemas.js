import * as yup from "yup";
const errorMessage = "Este campo es requerido";

export const refundsSchema = yup.object().shape({
  refundsType: yup.string().required(errorMessage),
  refundsReason: yup.string().required(errorMessage),
  factura: yup
    .number()
    .integer("Por favor escribir un número entero")
    .typeError("Datos incorrectos, por favor escribir un número")
    .required(errorMessage),
  cantidad: yup
    .string()
    .matches(/^\d+$/, "Datos incorrectos, por favor escribir un número"),
  cliente: yup.string().required(errorMessage),
});

export const addressForm = yup.object().shape({
  customer: yup.object().required(errorMessage),
  province: yup.string().required(errorMessage),
  municipality: yup.string().required(errorMessage),
  sector: yup.string().required(errorMessage),
  avenidaNumero: yup.string().required(errorMessage),
  referencia: yup.string().required(errorMessage),
  name: yup.string(),
  cedula: yup.string(),
});
export const serviceForm = yup.object().shape({
  service: yup.object().required(errorMessage),
  description: yup.string(),
  installingPrice: yup.string(),
  price: yup.string(),
  billing: yup.string(),
});

export const ticketGeneratorForm = yup.object().shape({
  customer: yup
    .string()
    .required(errorMessage)
    .min(11, "Este campo debe tener como minimo 11 caracteres"),
});
