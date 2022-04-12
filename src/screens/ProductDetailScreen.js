import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as Actions from "../store/actions";
import { TailSpin } from "react-loader-spinner";

const ProductDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetailReducer = useSelector((state) => state.products);
  const { productDetail, loading, error } = productDetailReducer;

  let countInStock = 5;
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(Actions.productLoader(true));
    dispatch(Actions.productDetailAction(id));
  }, []);

  const addToCardHandler = (productDetail) => {
    // navigate(`/cart/${id}?qty=${qty}`, { state: productDetail });
    dispatch(Actions.addToCartAction(productDetail, qty));
  };

  if (error) {
    return <h3>No Product</h3>;
  }
  let renderProduct = () => {
    if (productDetail && productDetail.title) {
      return (
        <div className="flex justify-between flex-col items-center md:flex-row p-5 md:mx-10 bg-white my-5">
          {/* side one  */}
          <div className="border-2 p-4 w-1/2 m-2" style={{ maxWidth: "25rem" }}>
            <img
              src={productDetail.productImages[0].url}
              alt={productDetail.title}
              className="w-full"
            />
          </div>

          {/* side two  */}
          <div className="w-2/3 m-2">
            <div className="text-lg md:text-2xl text my-4">
              {productDetail.title}
            </div>
            <div className="text-lg md:text-2xl" style={{ color: "#b02e46" }}>
              Price: $ {productDetail.price}
            </div>
            <p className="text-sm md:text-md my-3 text-slate-600">
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
            <button
              className="my-5 bg-slate-500 text-white p-2 rounded"
              onClick={() => addToCardHandler(productDetail)}
              style={{ backgroundColor: "#b02e46" }}
            >
              Add to Card
            </button>
          </div>
        </div>
      );
    } else {
      return <h4>No Product</h4>;
    }
  };

  return (
    <div className="my-5">
      <button onClick={() => navigate(-1)} className="ml-20 mt-8">
        Go Back
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
