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
        <div className="flex justify-between items-center w-24 mx-auto my-2">
          <a
            className="cursor-pointer p-2 px-3 block rounded-2 text-xl btn"
            onClick={() =>
              dispatch(Actions.updateQuantity(product.id, "decrease"))
            }
          >
            -
          </a>
          <p>{qty}</p>
          <a
            className="cursor-pointer p-2 px-3 block rounded-2 text-xl btn"
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
        <div className="flex justify-between items-center w-24 mx-auto">
          <a
            className="cursor-pointer p-2 block rounded-2 text-xl btn"
            onClick={() =>
              dispatch(Actions.updateQuantity(product.id, "decrease"))
            }
          >
            -
          </a>
          <p>{product.qty}</p>
          <a
            className="cursor-pointer p-2 block rounded-2 text-xl btn"
            onClick={() =>
              dispatch(Actions.updateQuantity(product.id, "increase"))
            }
          >
            +
          </a>
        </div>
        <div className="h-1 w-24 mx-auto lg:w-full bg-slate-200"></div>
      </>
    );
  }
};

export default CartQty;
