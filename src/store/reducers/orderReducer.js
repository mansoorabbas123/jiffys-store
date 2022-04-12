import * as Constants from "../constants";

const initialState = {
  order_history: null,
  loading: false,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.ORDER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case Constants.GET_ORDER_HISTORY:
      console.log("order history reducer", action.payload);
      return {
        ...state,
        order_history: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
