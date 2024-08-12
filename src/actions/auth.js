import Swal from "sweetalert2";
import { types } from "../utils/constants/types";
import { Login, revalidarToken } from "../services/auth";
import { infoLogout, infoStartLoading } from "./info";
import { getServiceApp } from "../services/serviceApp";
import { endpoints } from "../utils/constants/endpoints";
import { dataValidation } from "../utils/helpers/messages";

export const StartLogin = (correo, password) => {
  return async (dispatch) => {
    const body = await Login(correo, password);
    if (!body?.ok) {
      Swal.fire("Error", body, "error");
      return;
    }

    localStorage.setItem("token", body.token);
    localStorage.setItem("token-init-date", new Date().getTime());

    const dataResponse = await getServiceApp(
      `${endpoints.message}?correo=${body.correo}`
    );
    const validData = dataValidation(dataResponse, false);
    if (!!validData?.ok) {
      body.msgCount = validData.total;
    }
    dispatch(
      login({
        uid: body.uid,
        nombre: body.nombre,
        rol: body.rol,
        img: body.img,
        correo: body.correo,
        msg: body.msgCount,
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
      const dataResponse = await getServiceApp(
        `${endpoints.message}?correo=${body.correo}`
      );
      const validData = dataValidation(dataResponse, false);
      if (!!validData?.ok) {
        body.msgCount = validData.total;
      }
      dispatch(
        login({
          uid: body.uid,
          nombre: body.nombre,
          rol: body.rol,
          img: body.img,
          correo: body.correo,
          msg: body.msgCount,
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
