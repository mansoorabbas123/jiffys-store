import React from "react";
import { useDispatch } from "react-redux";
import * as Actions from "../store/actions";

const CartQty = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex justify-between items-center w-24 mx-auto">
        <a
          className="cursor-pointer p-2 block rounded-2 text-xl"
          onClick={() =>
            dispatch(Actions.updateQuantity(product.id, "decrease"))
          }
        >
          -
        </a>
        <p>{product.qty}</p>
        <a
          className="cursor-pointer p-2 block rounded-2 text-xl"
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
};

export default CartQty;
