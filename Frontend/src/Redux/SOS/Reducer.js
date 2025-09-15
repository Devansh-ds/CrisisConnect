import { GET_ALL_SOS_FAILURE, GET_ALL_SOS_REQUEST, GET_ALL_SOS_SUCCESS } from "./ActionType";

const initialState = {
  allSos: null,
  allSosLoading: null,
  allSosError: null,
};

export const sosReducer = (store = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_SOS_REQUEST:
      return { ...store, allSosLoading: true, allSosError: null };
    case GET_ALL_SOS_SUCCESS:
      return { ...store, allSos: payload, allSosLoading: false, allSosError: null };
    case GET_ALL_SOS_SUCCESS:
      return { ...store, allSosLoading: false, allSosError: payload };
    default:
      return store;
  }
};
