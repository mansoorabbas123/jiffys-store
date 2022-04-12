import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useSearchParams } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import * as Actions from "../store/actions";
import { TailSpin } from "react-loader-spinner";

const ProductScreen = () => {
  const [searchParams] = useSearchParams();
  const category_id = searchParams.get("category_id");
  const dispatch = useDispatch();
  const productReducer = useSelector((state) => state.products);
  const { error, loading, productList } = productReducer;

  useEffect(() => {
    dispatch(Actions.productLoader(true));
    dispatch(Actions.productListAction(category_id, 10));
  }, []);

  if (error) {
    return "error";
  }

  if (productList.count === 0) {
    return <h1 className="py-10 text-xl text-center">No Product To Show</h1>;
  }

  return (
    <div className="bg-white pt-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {loading ? (
          <TailSpin color="#b02e46" height={80} width={80} />
        ) : (
          productList?.count &&
          productList.rows.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductScreen;
