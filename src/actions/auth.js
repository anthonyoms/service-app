import Swal from "sweetalert2";
import { types } from "../utils/constants/types";
import { Login, revalidarToken } from "../services/auth";
import { infoLogout, infoStartLoading } from "./info";

export const StartLogin = (correo, password) => {
  return async (dispatch) => {
    const body = await Login(correo, password);
    if (!body?.ok) {
      Swal.fire("Error", body, "error");
      return;
    }

    localStorage.setItem("token", body.token);
    localStorage.setItem("token-init-date", new Date().getTime());
    dispatch(
      login({
        uid: body.uid,
        nombre: body.nombre,
        rol: body.rol,
        img: body.img,
        correo: body.correo
      })
    );
    dispatch(infoStartLoading());
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const body = await revalidarToken();
    if (!!body?.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        login({
          uid: body.uid,
          nombre: body.nombre,
          rol: body.rol,
          img: body.img,
          correo: body.correo
        })
      );
      dispatch(infoStartLoading());
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

export const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(infoLogout());
    dispatch(logout());
  };
};

const logout = () => ({ type: types.authLogout });
