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
    .number()
    .integer("Por favor escribir un número entero")
    .typeError("Datos incorrectos, por favor escribir un número"),
  cliente: yup.string().required(errorMessage),
});
