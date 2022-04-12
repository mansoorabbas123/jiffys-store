import * as Constants from "../constants";
import axios from "axios";
import { Domain } from "../../config";
import * as Actions from "../actions";

export const placeOrderAction =
  (orderDetail, navigate) => async (dispatch, getState) => {
    const { userInfo } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.user.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${Domain}/api/order/add`,
        orderDetail,
        config
      );
      if (data.statusCode === 200) {
        dispatch(Actions.productLoader(false));
        console.log("place order success response", data);
        console.log("order id", data.result.orderId);
        navigate("/payment", {
          state: {
            client_secret: data.result.client_secret,
            orderId: data.result.orderId,
          },
        });
      }
    } catch (error) {
      console.log("placeOrderAction error:", error);
      dispatch(Actions.productLoader(false));
      console.log("placeOrderACtion error response", error.response);
    }
  };

export const confirmPayment = (orderId) => async (dispatch, getState) => {
  console.log("orderId", orderId);
  try {
    const { userInfo } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.user.token}`,
      },
    };
    const { data } = await axios.post(
      `${Domain}/api/order/confirmPayment`,
      {
        orderId,
      },
      config
    );
  } catch (error) {
    console.log("error", error);
    console.log("confirmPayment error response", error.response);
  }
};

export const getOrderHistory = (variables) => async (dispatch, getState) => {
  console.log("getOrderHistory varibles", variables);
  const { userInfo } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.user.token}`,
    },
  };
  try {
    const { data } = await axios.post(
      `${Domain}/api/order/history`,
      variables,
      config
    );
    console.log("getOrderHistory success response", data.result);
    dispatch({
      type: Constants.GET_ORDER_HISTORY,
      payload: data.result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const orderLoading = (value) => async (dispatch) => {
  try {
    dispatch({
      type: Constants.ORDER_LOADING,
      payload: value,
    });
  } catch (error) {
    console.log(error);
  }
};
