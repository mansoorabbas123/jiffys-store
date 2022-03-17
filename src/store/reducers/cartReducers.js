import * as Constants from "../constants/cartConstants";

let cartItems = localStorage.getItem("cartItems");
if (cartItems) {
  cartItems = JSON.parse(localStorage.getItem("cartItems"));
} else {
  cartItems = [];
}

const initialState = {
  cartItems: [...cartItems],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.ADD_TO_CART_SUCCESS:
      const item = action.payload;
      console.log("item..", item);
      const existItem = state.cartItems.find(
        (product) => product.id === item.id
      );
      console.log("EXist items --- >", existItem);
      if (existItem) {
        console.log("exist -> true");
        const updatedCartItem = state.cartItems.map((product) =>
          product.id === existItem.id ? item : product
        );
        return {
          ...state,
          cartItems: updatedCartItem,
        };
      } else {
        console.log("exist -> false");

        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case Constants.DELETE_FROM_CART:
      const filteredCartItems = state.cartItems.filter(
        (product) => product.id != action.payload
      );
      console.log("filteredCartItems...", filteredCartItems);
      return {
        ...state,
        cartItems: filteredCartItems,
      };

    case Constants.PRODUCT_QUANTITY_INCREASE:
      const increaseProduct = state.cartItems.find(
        (product) => product.id == action.payload
      );
      increaseProduct.qty++;
      const updatedItemInc = state.cartItems.map((product) =>
        product.id == increaseProduct.id ? increaseProduct : product
      );
      return {
        ...state,
        cartItems: updatedItemInc,
      };

    case Constants.PRODUCT_QUANTITY_DECREASE:
      const decreaseProduct = state.cartItems.find(
        (product) => product.id == action.payload
      );
      if (decreaseProduct.qty === 1) {
        const updatedCartItems = state.cartItems.filter(
          (product) => product.id != action.payload
        );
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else if (decreaseProduct.qty > 1) {
        decreaseProduct.qty--;
      }
      const updatedItemDec = state.cartItems.map((product) =>
        product.id == decreaseProduct.id ? decreaseProduct : product
      );
      return {
        ...state,
        cartItems: updatedItemDec,
      };

    case Constants.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
