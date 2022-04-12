import React, { useEffect } from "react";
import CarouselComp from "../components/HomeComponents/CarouselCom";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions";
import Categories from "../components/HomeComponents/Categories";
import Products from "../components//HomeComponents/Products";
import { TailSpin } from "react-loader-spinner";

const Home = () => {
  const dispatch = useDispatch();
  const productsReducer = useSelector((state) => state.products);
  const { loading, error, productCategories } = productsReducer;

  useEffect(() => {
    dispatch(Actions.productLoader(true));
    dispatch(Actions.productCatgoriesAction());
  }, []);

  // to capitalize word

  if (error) {
    return (
      <div className="flex justify-center items-center pt-24">
        <h1 className="text-3xl">Server is Down</h1>
      </div>
    );
  }

  return (
    // HomeScreen
    <div>
      {/* carousel component  */}
      <CarouselComp />
      {/* categories  */}

      <div className="">
        <h2 className="my-10 text-2xl text-slate-700 font-bold text-center">
          {"Categories".toUpperCase()}
        </h2>
        {loading ? (
          <div className="flex justify-center">
            <TailSpin color="#b02e46" height={80} width={80} />
          </div>
        ) : (
          <div
            className="grid  grid-col-3 md:grid-cols-4 text-center bg-white py-10"
            style={{ justifyItems: "center" }}
          >
            {productCategories &&
              productCategories.map((category, idx) => (
                <Categories category={category} idx={idx} key={idx} />
              ))}
          </div>
        )}

        {productCategories && productCategories.length > 1
          ? productCategories.slice(0, 2).map((category, idx) => {
              return (
                <div className="p-4 mt-10" key={category.id}>
                  <Products category_id={category.id} list={idx + 1} />
                </div>
              );
            })
          : "categories not found"}

        {/* Products by Categories  */}
        {/* <div className="p-4 mt-10">
          <Products category_id={1} list={1} />
        </div>
        <div className="p-4 mt-10">
          <Products category_id={3} list={2} />
        </div> */}
      </div>
    </div>
  );
};
export default Home;
