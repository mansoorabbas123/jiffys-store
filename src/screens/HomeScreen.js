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
    return <h2>error</h2>;
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
        {/* <div className="flex flex-col justify-around m-5 mx-10 md:flex-row text-center bg-white py-5"> */}
        {/* <div
          className="grid  grid-col-3 md:grid-cols-4 text-center bg-white py-10"
          style={{ justifyItems: "center" }}
        > */}
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
        {/* </div> */}

        {/* Products by Categories  */}
        <div className="p-4 mt-10">
          <Products category={"electronics"} />
        </div>
        <div className="p-4 mt-10">
          <Products category={"jewelery"} />
        </div>
      </div>
    </div>
  );
};
export default Home;
