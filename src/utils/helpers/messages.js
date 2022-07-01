import Swal from "sweetalert2";

export const successMsg = (text) => {
  Swal.fire({
    icon: "success",
    title: "Operación completada!",
    text,
  });
};

export const errorMsg = (text) => {
  Swal.fire({
    icon: "error",
    title: "Algo salio mal.",
    text,
  });
};
