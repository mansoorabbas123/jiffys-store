import axios from "axios";
import * as Constants from "../constants";

export const userLoader = (value) => {
  return (dispatch) => {
    return dispatch({
      type: Constants.USER_LOADER,
      payload: value,
    });
  };
};

export const userLoginAction = (username, password) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "https://fakestoreapi.com/auth/login",
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const user = {
      username,
      token: data.token,
      role: "user",
    };

    localStorage.setItem("user", JSON.stringify(user));

    dispatch({
      type: Constants.USER_LOGIN_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: Constants.USER_LOGIN_FAIL,
      payload: error,
    });
  }
};
