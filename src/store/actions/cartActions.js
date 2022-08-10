import axios from "axios";
import * as Constants from "../constants";
import * as Actions from "../actions";
import { NotificationManager } from "react-notifications";

export const addToCartAction = (product, qty) => async (dispatch, getState) => {
  try {
    // const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
    // console.log("data ..", data);
    dispatch({
      type: Constants.ADD_TO_CART_SUCCESS,
      payload: {
        ...product,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
    NotificationManager.success("Added to cart", "", 500);
  } catch (error) {
    console.log(error);
  }
};

export const deleteFromCartAction = (id) => async (dispatch) => {
  console.log("id in actions...", id);
  try {
    dispatch({
      type: Constants.DELETE_FROM_CART,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateQuantity = (id, IncDec) => async (dispatch, getState) => {
  try {
    if (IncDec === "increase") {
      dispatch({
        type: Constants.PRODUCT_QUANTITY_INCREASE,
        payload: id,
      });
    } else {
      dispatch({
        type: Constants.PRODUCT_QUANTITY_DECREASE,
        payload: id,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const clearCartAction = () => async (dispatch) => {
  try {
    console.log("clear cart action....");
    dispatch({
      type: Constants.CLEAR_CART,
    });
    localStorage.removeItem("cartItems");
  } catch (error) {
    console.log(error);
  }
};

export const addShippingAddress =
  (ShippingAddress, navigate) => async (dispatch) => {
    console.log(ShippingAddress);
    try {
      dispatch({
        type: Constants.ADD_SHIPPING_ADDRESS,
        payload: ShippingAddress,
      });
      localStorage.setItem("shippingAddress", JSON.stringify(ShippingAddress));
      dispatch(Actions.productLoader(false));
      navigate("/order");
    } catch (error) {
      dispatch(Actions.productLoader(false));
      console.log(error);
    }
  };
