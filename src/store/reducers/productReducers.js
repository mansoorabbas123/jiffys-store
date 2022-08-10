import * as Constants from "../constants";
const initialStateForProducts = {
  loading: false,
  productList: [],
  productDetail: null,
  productCategories: [],
  menuCategories: null,
  productListByCategory: null,
  // productListWithMultiCategory: {},
  homepageProductList_I: null,
  homepageProductList_II: null,
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
        productList: null,
        error: action.payload,
      };
    case Constants.PRODUCT_CATEGORIES:
      const { rows } = action.payload;
      console.log("rows ", rows);
      return {
        ...state,
        loading: false,
        productCategories: rows,
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

    // case Constants.PRODUCT_LIST_WITH_MULTI_CATEGORY:
    //   return {
    //     ...state,
    //     loading: false,
    //     productListWithMultiCategory: {
    //       ...state.productListWithMultiCategory,
    //       [action.payload.category]: action.payload.data,
    //     },
    //   };
    case Constants.HOME_PAGE_PRODUCTS_BY_CATEGORY_I:
      console.log("action.HOME_PAGE_PRODUCTS_BY_CATEGORY_I", action.payload);
      return {
        ...state,
        loading: false,
        homepageProductList_I: action.payload,
      };

    // case Constants.PRODUCT_LIST_WITH_MULTI_CATEGORY_FAIL:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload,
    //   };
    case Constants.HOME_PAGE_PRODUCTS_BY_CATEGORY_I_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Constants.HOME_PAGE_PRODUCTS_BY_CATEGORY_II:
      console.log("action.HOME_PAGE_PRODUCTS_BY_CATEGORY_II", action.payload);
      return {
        ...state,
        loading: false,
        homepageProductList_II: action.payload,
      };
    case Constants.HOME_PAGE_PRODUCTS_BY_CATEGORY_II_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Constants.MENU_CATEGORIES:
      return {
        ...state,
        loading: false,
        menuCategories: action.payload,
      };
    default:
      return state;
  }
};
