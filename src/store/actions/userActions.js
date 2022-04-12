import axios from "axios";
import * as Constants from "../constants";
import { Domain } from "../../config";
import { NotificationManager } from "react-notifications";

export const userLoader = (value) => {
  return (dispatch) => {
    return dispatch({
      type: Constants.USER_LOADER,
      payload: value,
    });
  };
};

export const userRegisterAction = (userData, navigate) => async (dispatch) => {
  console.log("userData in userRegisterAction", userData);
  try {
    const { data } = await axios.post(`${Domain}/api/client/signup`, userData);
    console.log("userRegisterAction success response", data);
    if (data.statusCode === 200) {
      navigate("/verify", { state: { email: userData.email } });
      dispatch(userLoader(false));
    }
  } catch (error) {
    dispatch(userLoader(false));
    if (error?.response?.data.message.includes("Exist")) {
      navigate("/login", { state: { email: userData.email } });
    }
    console.log("userRegisterAction error response", error.response);
    error.response && NotificationManager.error(error.response.data.message);
  }
};

export const verifyOtpAction = (otpData, navigate) => async (dispatch) => {
  console.log("otpData in verifyOtpAction", otpData);
  try {
    const { data } = await axios.post(`${Domain}/api/client/verify`, otpData);
    console.log("verifyOtpAction success response", data);
    if (data.statusCode === 200) {
      navigate("/");
      dispatch(userLoader(false));
    }
  } catch (error) {
    dispatch(userLoader(false));
    console.log("verifyOtpAction error response", error.response);
    error.response && NotificationManager.error(error.response.data.message);
  }
};

export const resendOtpAction = (email, navigate) => async (dispatch) => {
  console.log("email in verifyOtpAction", email);
  try {
    const { data } = await axios.post(`${Domain}/api/client/resend-email`, {
      email,
    });
    console.log("resendOtpAction success response", data);
    if (data.statusCode === 200) {
      navigate("/verify");
      dispatch(userLoader(false));
    }
  } catch (error) {
    dispatch(userLoader(false));
    console.log("resendOtpAction error response", error.response);
    error.response && NotificationManager.error(error.response.data.message);
  }
};

export const userLoginAction = (loginInfo, navigate) => async (dispatch) => {
  console.log("loginInfo in userLoginAction: ", loginInfo);

  try {
    const { data } = await axios.post(
      `${Domain}/api/client/login`,
      JSON.stringify({
        email: loginInfo.email,
        password: loginInfo.password,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("data", data);

    const user = {
      username: data.result.clientInfo.name,
      token: data.result.tokenInfo,
      role: "user",
    };

    console.log("user", user);

    localStorage.setItem("user", JSON.stringify(user));

    dispatch({
      type: Constants.USER_LOGIN_SUCCESS,
      payload: user,
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log("error response in loginAction", error.response);
      if (error.response.data.message.includes("not verified")) {
        navigate("/verify", { state: { email: loginInfo.email } });
      }
    }

    dispatch({
      type: Constants.USER_LOGIN_FAIL,
      payload: error.response,
    });
  }
};

export const userLogoutAction = () => async (dispatch) => {
  try {
    localStorage.removeItem("user");
    dispatch({
      type: Constants.USER_LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getClientProfile = () => async (dispatch, getState) => {
  const { userInfo } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.user.token}`,
    },
  };
  try {
    const { data } = await axios.get(`${Domain}/api/client/profile`, config);
    dispatch({
      type: Constants.GET_CLIENT_PROFILE,
      payload: data.result,
    });
  } catch (error) {
    console.log(error);
    console.log("getClientProfile error response", error.response);

    dispatch(userLoader(false));
  }
};

export const forgetPasswordAction = (email, navigate) => async (dispatch) => {
  console.log("email in forgetPasswordAction", email);
  try {
    const { data } = await axios.post(`${Domain}/api/client/forget-password`, {
      email,
    });
    console.log("forgetPasswordAction success response", data);
    if (data.statusCode === 200) {
      navigate("/verify", { state: { email, type: "forgetPasword" } });
      dispatch(userLoader(false));
    }
  } catch (error) {
    dispatch(userLoader(false));
    console.log("forgetPasswordAction error response", error.response);
    error.response && NotificationManager.error(error.response.data.message);
  }
};

export const verifyForgetPassword = (otpData, navigate) => async (dispatch) => {
  console.log("otpData in verifyForgetPassword", otpData);
  try {
    const { data } = await axios.post(
      `${Domain}/api/client/verify-forget-password`,
      otpData
    );
    console.log("verifyForgetPassword success response", data);
    if (data.statusCode === 200) {
      navigate("/newPassword", {
        state: { otp: otpData.otp, user: data.result },
      });
      dispatch(userLoader(false));
    }
  } catch (error) {
    dispatch(userLoader(false));
    console.log("verifyForgetPassword error response", error.response);
    error.response && NotificationManager.error(error.response.data.message);
  }
};

export const forgetPasswordCreateAction =
  (newPasswordData, user, navigate) => async (dispatch, getState) => {
    console.log("otpData in forgetPasswordCreateAction", newPasswordData);

    const updateUserInfo = {
      user: user.clientInfo,
      token: user.tokenInfo,
      role: "user",
    };

    const config = {
      headers: {
        Authorization: `Bearer ${updateUserInfo.token}`,
      },
    };

    localStorage.setItem("user", JSON.stringify(updateUserInfo));

    try {
      const { data } = await axios.post(
        `${Domain}/api/client/change-forget-password`,
        newPasswordData,
        config
      );
      console.log("forgetPasswordCreate success response", data);
      if (data.statusCode === 200) {
        NotificationManager.success("password changed successfully");
        navigate("/login");
        dispatch(userLoader(false));
      }
    } catch (error) {
      dispatch(userLoader(false));
      console.log("forgetPasswordCreateAction error response", error.response);
      error.response && NotificationManager.error(error.response.data.message);
    }
  };

export const updateClientProfileById =
  (id, newProfile) => async (dispatch, getState) => {
    console.log("id and data in updateClientProfileById action", newProfile);
    const { userInfo } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.user.token}`,
      },
    };
    const newData = {
      name: newProfile.name,
      phone: newProfile.phone,
      address: newProfile.address,
    };
    try {
      const { data } = await axios.put(
        `${Domain}/api/client/update`,
        newData,
        config
      );
      if (data.statusCode === 200) {
        NotificationManager.success("Profile Update Successfully");
        dispatch(userLoader(false));
      }
    } catch (error) {
      // console.log(error);
      dispatch(userLoader(false));
      console.log(
        "updateClientProfileById action error response",
        error.response
      );
      error.response && NotificationManager.error(error.response.data.message);
    }
  };

export const visitUser = () => async (dispatch) => {
  let user = getCookie("visit_token");
  if (user == "") {
    try {
      const { data } = await axios.post(`${Domain}/api/visitor/add`);
      console.log("visitUser success response data", data.result.token);
      const token = data.result.token;
      setCookie("visit_token", token, 365);
    } catch (error) {
      console.log(error);
      console.log("visitUser error response", error.response);
      // error.response && NotificationManager.error(error.response.data.message);
    }
  }
};

// cookies
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
