import { types } from "../utils/constants/types";
import { getServiceApp } from "../services/serviceApp";
import { endpoints } from "../utils/constants/endpoints";

export const infoStartLoading = () => {
  return async (dispatch) => {
    try {
      const { configuraciones } = await getServiceApp(
        endpoints.configuraciones
      );
      dispatch(infoLoaded(configuraciones[0]));
    } catch (error) {
      console.log(error);
    }
  };
};

const infoLoaded = (info) => ({
  type: types.infoLoaded,
  payload: info,
});

export const infoLogout = () => ({
  type: types.infoLogout,
});
