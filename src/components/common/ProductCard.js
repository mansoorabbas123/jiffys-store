import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Actions from "../../store/actions";
import "./productCard.css";
import CartQty from "../CartQty";

const ProductCard = ({ product, variant }) => {
  const cartReducer = useSelector((state) => state.cart);
  const { cartItems } = cartReducer;
  const dispatch = useDispatch();

  const renderButtons = (product) => {
    console.log("product in productCard", product);
    console.log("product image in productCard", product.productImages);

    if (cartItems.find((p) => p.id == product.id)) {
      return <CartQty product={product} styleVariant="productCard" />;
    } else {
      return (
        <button
          className="text-white w-28 rounded ml-2 mb-4 btn mt-2 p-[5px] pt-2"
          onClick={() => dispatch(Actions.addToCartAction(product, 1))}
        >
          ADD
        </button>
      );
    }
  };

  return (
    <div
      className={`text-center my-5 bg-white hover:shadow-md mx-auto
       w-40 md:w-40 
       ${variant == "small" ? "lg:w-52" : "lg:w-60"}
       relative`}
      key={product.id}
    >
      {/* jksdlf;aksdfj */}
      <div className="absolute top-1 left-1" style={{ zIndex: 4 }}>
        <div
          className="p-1 rounded text-white text-sm"
          style={{
            background: "#b02e46",
            boxShadow: "1px 2px 5px 0px rgba(0,0,0,0.75)",
          }}
        >
          4% OFF
        </div>
        <div
          className="p-1 rounded mt-2 text-white bg-lime-500 text-sm"
          style={{ boxShadow: "1px 2px 5px 0px rgba(0,0,0,0.75)" }}
        >
          84 pcs
        </div>
      </div>

      <NavLink to={`/product/${product.id}`}>
        <div
          className="flex w-full justify-center items-center bg-slate-100 relative transitImage"
          style={{ minHeight: "16rem" }}
        >
          <img
            src={
              product.productImages[0]
                ? product.productImages[0].url
                : "https://pixabay.com/photos/yellow-carpet-curtain-red-fabric-2847287/"
            }
            alt=""
            className="w-24 m-auto absolute"
          />
        </div>
      </NavLink>
      <div className="flex flex-col justify-between">
        <NavLink to={`/product/${product.id}`}>
          <p className="text-[15px] font-[700] mt-2">
            {" "}
            {product.title.slice(0, 20)}....
          </p>
        </NavLink>
        <p className=" text-[#212529] text-lg font-bold">$ {product.price}</p>
        {renderButtons(product)}
      </div>
    </div>
  );
};

export default ProductCard;
