import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../store/actions";
import { Link, useLocation } from "react-router-dom";
import ProductCard from "../common/ProductCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { TailSpin } from "react-loader-spinner";

const Products = ({ category_id, list }) => {
  console.log("category_id", category_id);
  const location = useLocation();
  const dispatch = useDispatch();
  const productsReducer = useSelector((state) => state.products);
  const { error, loading } = productsReducer;
  let [productList, setProductList] = useState(null);

  const { homepageProductList_I, homepageProductList_II } = productsReducer;

  console.log("productList", productList);

  useEffect(() => {
    if (productsReducer) {
      if (list == 1 && !productList) {
        console.log("list 1");
        setProductList(homepageProductList_I);
      } else if (list == 2 && !productList) {
        console.log("list 2");
        setProductList(homepageProductList_II);
      }
    }
    if (!homepageProductList_I && list == 1) {
      dispatch(Actions.productLoader(true));
      dispatch(Actions.homePageProductsByCategory_I(category_id, 4));
    }

    if (!homepageProductList_II && list == 2) {
      dispatch(Actions.productLoader(true));
      dispatch(Actions.homePageProductsByCategory_II(category_id, 4));
    }
  }, [homepageProductList_I, homepageProductList_II]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className="carousel-button-group">
        {" "}
        <button
          className={currentSlide === 0 ? "disable" : ""}
          onClick={() => previous()}
          style={{ position: "absolute", left: "0", top: "40%" }}
          className="rounded-full p-3"
        >
          <AiOutlineArrowLeft style={{ fontSize: "1.5rem" }} />
        </button>
        <button
          onClick={() => next()}
          style={{ position: "absolute", right: "0", top: "40%" }}
          className="rounded-full p-3"
        >
          <AiOutlineArrowRight style={{ fontSize: "1.5rem" }} />
        </button>
      </div>
    );
  };

  if (error) {
    return <h2>error</h2>;
  }
  let renderProducts = () => {
    if (productList?.count > 0) {
      return productList.rows.map((product) => {
        return (
          <div key={product.id} className="my-16">
            <ProductCard product={product} />
          </div>
        );
      });
    } else {
      return <h4>No Products</h4>;
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center">
          <TailSpin color="#b02e46" height={80} width={80} />
        </div>
      ) : (
        <>
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-2 py-5"> */}
          <div className="bg-white">
            <Link
              to={`/shop?category_id=${category_id}`}
              className="flex justify-end p-2"
            >
              {/* <h2 className="font-bold ml-4">{category.toUpperCase()}</h2> */}
              <p className="text-uderline mr-4">View All</p>
            </Link>
            <div className="border-b-2 m-auto" style={{ width: "91vw" }}></div>
            <Carousel
              responsive={responsive}
              arrows={false}
              customButtonGroup={<ButtonGroup />}
            >
              {renderProducts()}
            </Carousel>
            {/* </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
