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
          <button
            className="cursor-pointer rounded-sm btn font-bold w-60 py-[5px] text-white"
            onClick={() =>
              dispatch(Actions.updateQuantity(product.id, "decrease"))
            }
          >
            -
          </button>
          <p className="mx-3">{qty}</p>
          <button
            className="cursor-pointer rounded-sm btn font-bold w-60 py-[5px] text-white"
            onClick={() => {
              dispatch(Actions.updateQuantity(product.id, "increase"));
            }}
          >
            +
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex justify-between items-center w-36 mx-auto">
          <button
            className="cursor-pointer rounded-sm btn font-bold px-[1.1rem] py-[5px] text-white"
            onClick={() =>
              dispatch(Actions.updateQuantity(product.id, "decrease"))
            }
          >
            -
          </button>
          <p className="mx-4">{product.qty}</p>
          <button
            className="cursor-pointer rounded-sm btn font-bold px-[1rem] py-[5px] text-white"
            onClick={() =>
              dispatch(Actions.updateQuantity(product.id, "increase"))
            }
          >
            +
          </button>
        </div>
        <div className="border-b-2 w-36 mx-auto"></div>
      </>
    );
  }
};

export default CartQty;
