import { types } from "../utils/constants/types";

const initialState = {
  configuration: {},
};

export const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.infoUpdated:
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case types.infoLoaded:
      return {
        ...state,
        configuration: action.payload,
      };
    case types.infoLogout:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
