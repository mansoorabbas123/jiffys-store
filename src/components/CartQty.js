import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions";

const CartQty = ({ product, styleVariant }) => {
  const dispatch = useDispatch();
  const cartReducer = useSelector((state) => state.cart);
  const { cartItems } = cartReducer;
  const { qty } = cartItems.find((p) => p.id === product.id);

  if (styleVariant === "productCard") {
    console.log("product....in qty compoennt---", product);
    return (
      <>
        <div className="flex justify-between items-center w-24 ml-2 my-2 mb-4">
          <a
            className="cursor-pointer rounded-2 btn font-bold"
            onClick={() =>
              dispatch(Actions.updateQuantity(product.id, "decrease"))
            }
          >
            -
          </a>
          <p className="mx-3">{qty}</p>
          <a
            className="cursor-pointer rounded-2 btn font-bold"
            onClick={() =>
              dispatch(Actions.updateQuantity(product.id, "increase"))
            }
          >
            +
          </a>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex justify-between items-center w-36 mx-auto">
          <a
            className="cursor-pointer rounded-2 btn font-bold btn"
            onClick={() =>
              dispatch(Actions.updateQuantity(product.id, "decrease"))
            }
          >
            -
          </a>
          <p className="mx-4">{product.qty}</p>
          <a
            className="cursor-pointer rounded-2 btn font-bold btn"
            onClick={() =>
              dispatch(Actions.updateQuantity(product.id, "increase"))
            }
          >
            +
          </a>
        </div>
        <div className="border-b-2 w-36 mx-auto"></div>
      </>
    );
  }
};

export default CartQty;
