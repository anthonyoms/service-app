import Swal from "sweetalert2";
const defaultErrorMsg =
  "Por favor comunicarse con el administrador del sistema";

export const successMsg = (text) => {
  Swal.fire({
    icon: "success",
    title: "Operación completada!",
    text,
  });
};

export const errorMsg = (text = defaultErrorMsg) => {
  Swal.fire({
    icon: "error",
    title: "Algo salio mal.",
    text,
  });
};
