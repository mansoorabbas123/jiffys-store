import * as Constants from "../constants";
import axios from "axios";
import { Domain } from "../../config";

export const productLoader = (value) => {
  return (dispatch) => {
    return dispatch({
      type: Constants.PRODUCT_LOADER,
      payload: value,
    });
  };
};

// export const productListAction = () => async (dispatch) => {
//   try {
//     const { data } = await axios.get("https://fakestoreapi.com/products");
//     dispatch({
//       type: Constants.PRODUCT_LIST,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: Constants.PRODUCT_LIST_FAIL,
//       payload: error,
//     });
//   }
// };

export const productListAction = (variables, limit) => async (dispatch) => {
  console.log("price", variables.price);
  if (variables.page == 0) {
    variables.page = 0;
  } else {
    --variables.page;
  }
  console.log("param", {
    page: variables.page,
    limit,
    category_id: variables.category_id ? variables.category_id : "",
    title: variables.search ? variables.search : "",
    price: variables.price
      ? {
          lowerLimit: variables.price[0],
          upperLimit: variables.price[1],
        }
      : {},
  });
  try {
    const { data } = await axios.post(`${Domain}/api/product/view`, {
      page: variables.page,
      limit,
      category_id: variables.category_id ? variables.category_id : "",
      title: variables.search ? variables.search : "",
      price: variables.price
        ? {
            lowerLimit: variables.price[0],
            upperLimit: variables.price[1],
          }
        : {},
    });
    console.log("data", data);
    dispatch({
      type: Constants.PRODUCT_LIST,
      payload: data.result,
    });
  } catch (error) {
    console.log(error.message);
    console.log("productListAction error response", error.response);
    dispatch({
      type: Constants.PRODUCT_LIST_FAIL,
      payload: error,
    });
  }
};

export const productDetailAction = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${Domain}/api/product/view/${id}`);
    console.log(data.result);
    dispatch({
      type: Constants.PRODUCT_DETAIL,
      payload: data.result,
    });
  } catch (error) {
    console.log("product detail error", error);
    console.log("product detail error response", error.response);
    dispatch({
      type: Constants.PRODUCT_DETAIL_FAIL,
      payload: error,
    });
  }
};

export const productCatgoriesAction = () => async (dispatch) => {
  try {
    const { data } = await axios.post(`${Domain}/api/product/category/view`, {
      page: 0,
      limit: 4,
    });
    console.log(data);
    dispatch({
      type: Constants.PRODUCT_CATEGORIES,
      payload: data.result,
    });
  } catch (error) {
    console.log("error in category action", error);
    console.log("errors response ", error.response);
    dispatch({
      type: Constants.PRODUCT_CATEGORIES_FAIL,
      payload: error.response,
    });
  }
};

export const getCategoriesForMenu = () => async (dispatch) => {
  try {
    const { data } = await axios.post(`${Domain}/api/product/category/view`);
    dispatch({
      type: Constants.MENU_CATEGORIES,
      payload: data.result,
    });
  } catch (error) {
    console.log("error in getCategoriesForMenu action", error);
    console.log("getCategoriesForMenu errors response ", error.response);
    dispatch({
      type: Constants.PRODUCT_CATEGORIES_FAIL,
      payload: error.response,
    });
  }
};

export const productListByIdAction = (category) => async (dispatch) => {
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

export const homePageProductsByCategory_I =
  (category_id, limit) => async (dispatch) => {
    try {
      const { data } = await axios.post(`${Domain}/api/product/view`, {
        page: 0,
        limit,
        category_id,
      });
      console.log("homePageProductsByCategory_I data", data);
      dispatch({
        type: Constants.HOME_PAGE_PRODUCTS_BY_CATEGORY_I,
        payload: data.result,
      });
    } catch (error) {
      dispatch({
        type: Constants.HOME_PAGE_PRODUCTS_BY_CATEGORY_I_ERROR,
        payload: error.response,
      });
    }
  };

export const homePageProductsByCategory_II =
  (category_id, limit) => async (dispatch) => {
    try {
      const { data } = await axios.post(`${Domain}/api/product/view`, {
        page: 0,
        limit,
        category_id,
      });
      console.log("homePageProductsByCategory_II data", data);
      dispatch({
        type: Constants.HOME_PAGE_PRODUCTS_BY_CATEGORY_II,
        payload: data.result,
      });
    } catch (error) {
      dispatch({
        type: Constants.HOME_PAGE_PRODUCTS_BY_CATEGORY_II_ERROR,
        payload: error.response,
      });
    }
  };
