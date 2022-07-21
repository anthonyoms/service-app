import Swal from "sweetalert2";
const defaultErrorMsg =
  "Por favor comunicarse con el administrador del sistema.";

export const successMsg = (text) => {
  Swal.fire({
    icon: "success",
    title: "Operación completada!",
    text,
  });
};
export const infoMsg = (text) => {
  Swal.fire({
    icon: "info",
    title: "Advertencia!",
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

export const confirmActionMessage = async () => {
  const result = await Swal.fire({
    title: "Seguro que quieres guardar los cambios?",
    showCancelButton: true,
    confirmButtonText: "Guardar",
  });
  return result;
};

export const dataValidation = (data, isSuccessMsg = true) => {
  if (data.ok) {
    if (isSuccessMsg) {
      successMsg(data.msg);
    }
    return data;
  } else {
    errorMsg(data.errorMsg);
    return { data: { ok: false } };
  }
};
