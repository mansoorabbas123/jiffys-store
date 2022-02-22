import * as Constants from "../constants";
import axios from "axios";
import { PRODUCT_CATEGORIES_FAIL } from "../constants";

export const productLoader = (value) => {
  return (dispatch) => {
    return dispatch({
      type: Constants.PRODUCT_LOADER,
      payload: value,
    });
  };
};

export const productListAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    dispatch({
      type: Constants.PRODUCT_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: Constants.PRODUCT_LIST_FAIL,
      payload: error,
    });
  }
};

export const productDetailAction = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
    dispatch({
      type: Constants.PRODUCT_DETAIL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: Constants.PRODUCT_DETAIL_FAIL,
      payload: error,
    });
  }
};

export const productCatgoriesAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    dispatch({
      type: Constants.PRODUCT_CATEGORIES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CATEGORIES_FAIL,
      payload: error,
    });
  }
};

export const productListByCategoryAction = (category) => async (dispatch) => {
  try {
    console.log("Calling product list === ", category);
    const { data } = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );
    dispatch({
      type: Constants.PRODUCT_LIST_BY_CATEGORY,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: Constants.PRODUCT_CATEGORIES_FAIL,
      payload: error,
    });
  }
};

export const productListWithMultiCategoryAction =
  (category, limit) => async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/category/${category}?${limit}`
      );
      dispatch({
        type: Constants.PRODUCT_LIST_WITH_MULTI_CATEGORY,
        payload: { category, data },
      });
    } catch (error) {
      dispatch({
        type: Constants.PRODUCT_LIST_WITH_MULTI_CATEGORY_FAIL,
        payload: error,
      });
    }
  };
