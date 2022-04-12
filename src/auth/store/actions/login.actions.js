import { NotificationManager } from "react-notifications";
import jwtService from "services/jwtService";
import { setUserData } from "./user.actions";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";

export function loginAdmin({ email, password }) {
  return (dispatch) =>
    jwtService
      .signInAdmin(email, password)
      .then((user) => {
        console.log(user);
        dispatch(setUserData(user));
        return dispatch({
          type: LOGIN_SUCCESS,
        });
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error(error);
        return dispatch({
          type: LOGIN_ERROR,
          payload: error,
        });
      });
}

export function SetLogin() {
  return (dispatch) => {
    return dispatch({
      type: LOGIN_SUCCESS,
    });
  };
}

export function loginLoading(val) {
  return (dispatch) => {
    return dispatch({
      type: LOGIN_LOADING,
      payload: val,
    });
  };
}
