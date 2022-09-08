import { types } from "../utils/constants/types";
import { getServiceApp, updateServiceApp } from "../services/serviceApp";
import { endpoints } from "../utils/constants/endpoints";
import { dataValidation } from "../utils/helpers/messages";

export const infoStartLoading = () => {
  return async (dispatch) => {
    try {
      const dataResponse = await getServiceApp(endpoints.configuraciones);
      const { ok, configuraciones } = dataValidation(dataResponse, false);
      if (ok) {
        dispatch(infoLoaded(configuraciones[0]));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const infoStartUpdate = (info) => {
  return async (dispatch) => {
    try {
      const dataResponse = await updateServiceApp(
        info,
        endpoints.configuraciones,
        info.uid
      );
      const { ok } = dataValidation(dataResponse);
      if (ok) {
        dispatch(infoUpdated(info));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const infoUpdated = (info) => ({
  type: types.infoUpdated,
  payload: info,
});

const infoLoaded = (info) => ({
  type: types.infoLoaded,
  payload: info,
});

export const infoLogout = () => ({
  type: types.infoLogout,
});
