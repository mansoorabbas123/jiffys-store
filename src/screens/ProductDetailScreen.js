import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as Actions from "../store/actions";
import { TailSpin } from "react-loader-spinner";
import { AiOutlineArrowLeft } from "react-icons/ai";
import CartQty from "../components/CartQty";

const ProductDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetailReducer = useSelector((state) => state.products);
  const { productDetail, loading, error } = productDetailReducer;
  const cartReducer = useSelector((state) => state.cart);
  const { cartItems } = cartReducer;

  useEffect(() => {
    dispatch(Actions.productLoader(true));
    dispatch(Actions.productDetailAction(id));
  }, []);

  // const addToCardHandler = (productDetail) => {
  //   // navigate(`/cart/${id}?qty=${qty}`, { state: productDetail });
  //   dispatch(Actions.addToCartAction(productDetail, qty));
  // };

  if (error) {
    return <h3>No Product</h3>;
  }

  const renderButtons = (product) => {
    console.log("product in productCard", product);
    console.log("product image in productCard", product.productImages);

    if (cartItems.find((p) => p.id == product.id)) {
      return (
        <div className="my-6">
          <CartQty product={product} styleVariant="productCard" />
          <Link to="/checkout">
            <button className="bg-gray-600 my-2 rounded-sm text-white ml-2 px-[0.9rem] p-2 pt-3 hover:bg-[#b02e46] transition-all">
              Checkout
            </button>
          </Link>
        </div>
      );
    } else {
      return (
        <button
          className="text-white w-28 rounded mb-4 btn mt-2 p-[4px] pt-2"
          onClick={() => dispatch(Actions.addToCartAction(product, 1))}
        >
          ADD
        </button>
      );
    }
  };
  let renderProduct = () => {
    if (productDetail && productDetail.title) {
      return (
        <div className="lg:flex md:flex md:flex-col md:items-center lg:flex-row lg:content-start lg:p-10 md:p-2 lg:mx-10 bg-white my-5">
          {/* side one  */}
          <div className=" p-4 m-2 bg-slate-100" style={{ maxWidth: "25rem" }}>
            <img
              src={productDetail.productImages[0].url}
              alt={productDetail.title}
              className="w-full"
            />
          </div>

          {/* side two  */}
          <div className=" m-2">
            <div className="md:text-md lg:text-2xl text my-4">
              {productDetail.title}
            </div>
            <div className="text-lg md:text-2xl" style={{ color: "#b02e46" }}>
              Price: $ {productDetail.price}
            </div>
            <p className="md:text-sm lg:text-md my-3 text-slate-600">
              {productDetail.description}
            </p>
            {/* Quantity{" "} */}
            {/* <select
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="p-2 mr-2 rounded-sm"
            >
              {[...Array(countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select> */}
            {/* <button
              className="my-5 bg-slate-500 text-white p-2 rounded"
              onClick={() => addToCardHandler(productDetail)}
              style={{ backgroundColor: "#b02e46" }}
            >
              Add to Card
            </button> */}
            {renderButtons(productDetail)}
          </div>
        </div>
      );
    } else {
      return <h4>No Product</h4>;
    }
  };

  return (
    <div className="my-10">
      <button
        onClick={() => navigate(-1)}
        className="ml-10 rounded-md mt-8 p-2 px-4 bg-white text-[#b02e46] hover:bg-[#b02e46] transition-all hover:text-white"
      >
        <AiOutlineArrowLeft style={{ display: "inline" }} />
      </button>
      {loading ? (
        <TailSpin color="#b02e46" height={80} width={80} />
      ) : (
        renderProduct()
      )}
    </div>
  );
};

export default ProductDetailScreen;
