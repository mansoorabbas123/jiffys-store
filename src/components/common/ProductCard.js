import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Actions from "../../store/actions";
import "./productCard.css";
import CartQty from "../CartQty";

const ProductCard = ({ product }) => {
  const cartReducer = useSelector((state) => state.cart);
  const { cartItems } = cartReducer;

  const renderButtons = (product) => {
    if (cartItems.find((p) => p.id == product.id)) {
      return <CartQty product={product} styleVariant="productCard" />;
    } else {
      return (
        <a
          className="text-white w-24 rounded mx-auto mb-4 btn"
          onClick={() => dispatch(Actions.addToCartAction(product, 1))}
        >
          ADD
        </a>
      );
    }
  };

  const dispatch = useDispatch();
  return (
    <div
      className=" text-center border my-5 bg-white hover:shadow-md mx-auto w-60"
      key={product.id}
    >
      <NavLink to={`/product/${product.id}`}>
        <div
          className="flex justify-center items-center"
          style={{ minHeight: "10rem" }}
        >
          <img src={product.image} alt="" className="w-24 m-auto" />
        </div>
      </NavLink>
      <div className="flex flex-col justify-between">
        <NavLink to={`/product/${product.id}`}>
          <p className="text-md"> {product.title.slice(0, 20)}....</p>
        </NavLink>

        <p className=" text-slate-600 my-8 font-bold">Rs. {product.price}</p>
        {renderButtons(product)}
      </div>
    </div>
  );
};

export default ProductCard;
