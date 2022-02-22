import * as Constants from "../constants";

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  loading: false,
  user: { ...user },
  error: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.USER_LOADER:
      return {
        ...state,
        loading: true,
      };
    case Constants.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case Constants.USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
