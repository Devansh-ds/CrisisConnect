import { BASE_URL } from "../config.js";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType.js";

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const resData = await res.json();

    if (!res.ok) {
      dispatch({ type: REGISTER_FAILURE, payload: { error: resData } });
      return;
    }

    localStorage.setItem("accessToken", resData.accessToken);
    localStorage.setItem("refreshToken", resData.refreshToken);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        accessToken: resData.accessToken,
        refreshToken: resData.refreshToken,
      },
    });
  } catch (error) {
    console.log("Register (error): ", error);
    dispatch({ type: REGISTER_FAILURE, payload: "Something went wrong!" });
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const res = await fetch(`${BASE_URL}/auth/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const resData = await res.json();

    if (!res.ok) {
      dispatch({ type: LOGIN_FAILURE, payload: { error: resData } });
      return;
    }

    localStorage.setItem("accessToken", resData.accessToken);
    localStorage.setItem("refreshToken", resData.refreshToken);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        accessToken: resData.accessToken,
        refreshToken: resData.refreshToken,
      },
    });
  } catch (error) {
    console.log("Login (error): ", error);
    dispatch({ type: LOGIN_FAILURE, payload: "Something went wrong!" });
  }
};
