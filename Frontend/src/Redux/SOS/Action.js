import { BASE_URL } from "../config.js";
import { GET_ALL_SOS_FAILURE, GET_ALL_SOS_REQUEST, GET_ALL_SOS_SUCCESS } from "./ActionType.js";

export const getEveryoneSos = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SOS_REQUEST });

    const res = await fetch(`${BASE_URL}/sos/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const resData = await res.json();

    if (!res.ok) {
      dispatch({ type: GET_ALL_SOS_FAILURE, payload: resData });
      return;
    }

    dispatch({
      type: GET_ALL_SOS_SUCCESS,
      payload: resData,
    });
  } catch (error) {
    console.log("Get everyone's sos (error): ", error);
    dispatch({ type: GET_ALL_SOS_FAILURE, payload: "Something went wrong!" });
  }
};
