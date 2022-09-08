import { types } from "../utils/constants/types";

const initialState = {
  cedula_rnc: "",
  nombre: "",
  telefono: "",
  correo: "",
  direccion: "",
  itbis: 0,
  uid: "",
};

export const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.infoUpdated:
      return {
        ...state,
        ...action.payload,
        itbisPercentage: action.payload.itbis / 100,
      };
    case types.infoLoaded:
      return {
        ...state,
        ...action.payload,
        itbisPercentage: action.payload.itbis / 100,
      };
    case types.infoLogout:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
