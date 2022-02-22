import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import * as Actions from "../store/actions";
import { TailSpin } from "react-loader-spinner";

const ProductScreen = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const productReducer = useSelector((state) => state.products);
  const { error, loading, productListByCategory } = productReducer;

  useEffect(() => {
    dispatch(Actions.productLoader(true));
    dispatch(Actions.productListByCategoryAction(category));
  }, []);

  if (error) {
    return "error";
  }

  return (
    <div className="bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {loading ? (
          <TailSpin color="#b02e46" height={80} width={80} />
        ) : (
          productListByCategory &&
          productListByCategory.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductScreen;
