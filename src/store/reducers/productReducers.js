import * as Constants from "../constants";
const initialStateForProducts = {
  loading: false,
  productList: [],
  productDetail: null,
  productCategories: [],
  productListByCategory: [],
  productListWithMultiCategory: {},
  error: "",
};

export const products = (state = initialStateForProducts, action) => {
  switch (action.type) {
    case Constants.PRODUCT_LOADER:
      return { ...state, loading: action.payload };
    case Constants.PRODUCT_LIST:
      return {
        ...state,
        loading: false,
        productList: action.payload,
      };
    case Constants.PRODUCT_DETAIL:
      return {
        ...state,
        loading: false,
        productDetail: action.payload,
      };
    case Constants.PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        productList: [],
        error: action.payload,
      };
    case Constants.PRODUCT_CATEGORIES:
      return {
        ...state,
        loading: false,
        productCategories: action.payload,
      };
    case Constants.PRODUCT_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Constants.PRODUCT_LIST_BY_CATEGORY:
      return {
        ...state,
        loading: false,
        productListByCategory: action.payload,
      };
    case Constants.PRODUCT_LIST_BY_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Constants.PRODUCT_LIST_WITH_MULTI_CATEGORY:
      return {
        ...state,
        loading: false,
        productListWithMultiCategory: {
          ...state.productListWithMultiCategory,
          [action.payload.category]: action.payload.data,
        },
      };
    case Constants.PRODUCT_LIST_WITH_MULTI_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
