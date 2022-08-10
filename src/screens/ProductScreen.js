import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import {
  useParams,
  useLocation,
  useSearchParams,
  useNavigate,
  Link,
} from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import * as Actions from "../store/actions";
import { TailSpin } from "react-loader-spinner";
import style from "./ProductScreen.module.css";
import { IoIosSearch } from "react-icons/io";

const ProductScreen = () => {
  const sliderStyle = { width: "100%", padding: 5 };
  const marks = {
    1000: "0°C",
    25: "26°C",
    50: "37°C",
    75: "50°C",
    5000: "100°C",
  };

  function log(value) {
    console.log(value); //eslint-disable-line
  }
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category_id = searchParams.get("category_id")
    ? searchParams.get("category_id")
    : "";
  const search = searchParams.get("search") ? searchParams.get("search") : "";
  const price = searchParams.get("price") ? searchParams.get("price") : "";

  const dispatch = useDispatch();
  const productReducer = useSelector((state) => state.products);
  const { error, loading, productList, minPrice, maxPrice } = productReducer;
  const [searchInput, setSearchInput] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [currPage, setCurrPage] = useState(1);

  const [variables, setVariables] = useState({
    search,
    category_id,
    price,
    page: currPage,
  });

  console.log("category id ", variables.category_id);
  const {
    error: menuError,
    menuCategories,
    loading: menuCategoryLoading,
  } = productReducer;

  const searchHandler = (e) => {
    e.preventDefault();
    setVariables({ ...variables, search: searchInput });
  };

  const priceRangeHandler = () => {
    console.log("price", priceRange);
    setVariables({
      ...variables,
      price: priceRange,
    });
  };

  const clearFilterHandler = () => {
    setCurrPage(0);
    setVariables({
      search: "",
      category_id: "",
      price: "",
      page: 0,
    });
  };

  const pageChangeHandler = (pg) => {
    setCurrPage(pg);
  };

  useEffect(() => {
    // const params = new URLSearchParams({[name]: value });
    //  history.replace({ pathname: location.pathname, search: params.toString() });
    dispatch(Actions.productLoader(true));
    dispatch(Actions.productListAction(variables, 10));
  }, [variables, currPage, category_id]);
  if (error) {
    return "error";
  }

  if (productList.count === 0) {
    return <h1 className="py-10 text-xl text-center">No Product To Show</h1>;
  }

  return (
    <div className=" mt-[10.5rem] sm:mt-20">
      <div className="w-full px-14 py-16 font-sans">
        <h1
          className="text-[40px] font-[700] text-[#b02e46] mb-[10px]"
          style={{ lineHeight: "1.3" }}
        >
          Shop
        </h1>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="">Shop</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      {/* <div className="bg-white flex flex-col lg:flex-row lg:content-around lg:items-start pt-10"> */}
      <div className="bg-white flex lg:flex-row content-center flex-col pt-10">
        {/* <div className=" p-2 lg:mr-4 lg:ml-16 lg:w-[22%] md:w-full md:px-0 px-12"> */}
        <div className="basis-[30%] lg:ml-12 lg:mx-0 mx-14 mt-4">
          <form onSubmit={searchHandler} className="relative md:mx-auto">
            <input
              type="text"
              placeholder="Search products ..."
              onChange={(e) => setSearchInput(e.target.value)}
              className={`${style.search} outline-none`}
            />
            <button className="absolute right-0 top-2">
              <IoIosSearch
                className="text-[#ababab] hover:text-[#797878] hover:cursor-pointer"
                style={{ fontSize: "18px" }}
              />{" "}
            </button>
          </form>
          <p className="font-[600] mb-[1rem] font-sans mt-8 text-[#5a6269]">
            Filter By Price
          </p>
          <RangeSlider
            defaultValue={[0, 5000]}
            min={0}
            max={5000}
            // step={5}
            minStepsBetweenThumbs={5}
            onChangeEnd={(val) => setPriceRange(val)}
          >
            <RangeSliderTrack bg="gray.300">
              <RangeSliderFilledTrack bg="brand.100" />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={4} index={0} bg="brand.100" />
            <RangeSliderThumb boxSize={4} index={1} bg="brand.100" />
          </RangeSlider>
          {/* 
          <div style={sliderStyle}>
            <p>
              Range Slider with marks, `step=null`, pushable, draggableTrack
            </p>
            <Slider
              dots
              min={0}
              marks={marks}
              step={5}
              onChange={log}
              defaultValue={20}
            />
          </div> */}

          <div className="flex content-between opacity-40 text-sm">
            <p className="">{priceRange[0]}</p>
            <p className="ml-auto">{priceRange[1]}</p>
          </div>
          {priceRange[0] > 0 || priceRange[1] < 5000 ? (
            <button
              className="text-[#b02e46] bg-white px-2 py-1 pt-2 mt-2 rounded-md transition-all hover:bg-[#b02e46] hover:text-white"
              style={{ border: "1px solid #b02e46" }}
              onClick={priceRangeHandler}
            >
              Apply
            </button>
          ) : (
            ""
          )}

          <Accordion allowToggle mt={"5"}>
            <AccordionItem border={"none"}>
              <p className="font-[600] font-sans">
                <AccordionButton
                  _focus={{ outline: "none" }}
                  _hover={{ backgroundColor: "white" }}
                  sx={{ marginLeft: 0, paddingLeft: 0 }}
                >
                  <Box
                    flex="1"
                    textAlign="left"
                    sx={{
                      fontWeight: "600",
                      color: "#5a6269",
                    }}
                  >
                    Filter By Category
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </p>
              <AccordionPanel
                pb={4}
                sx={{ marginLeft: "0", paddingLeft: "0" }}
                w={{ base: "full", md: null, lg: "72" }}
              >
                <List spacing={3}>
                  {menuCategories &&
                    menuCategories.rows.map((cat) => {
                      return (
                        <ListItem
                          key={cat.id}
                          sx={{
                            fontSize: "14px",
                            cursor: "pointer",
                            fontWeight: "400",
                            color: "#636363",
                          }}
                          _hover={{ color: "#212529" }}
                        >
                          <Link to={`/shop?category_id=${cat.id}`}>
                            {cat.title}
                          </Link>
                        </ListItem>
                      );
                    })}
                </List>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <button
            className="text-[#b02e46] bg-white px-2 py-1 pt-2 mt-4 rounded-md transition-all hover:bg-[#b02e46] hover:text-white"
            style={{ border: "1px solid #b02e46" }}
            onClick={clearFilterHandler}
          >
            Remove Filters
          </button>
        </div>
        {/* <div> */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"> */}
        {/* <div className="flex flex-col basis-[70%] mx-7 content-center">
          <div className="flex content-around flex-wrap sm:content-center">
            {loading ? (
              <div className="flex content-center items-center">
                <TailSpin color="#b02e46" height={80} width={80} />
              </div>
            ) : (
              productList?.count &&
              productList.rows.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant={"small"}
                />
              ))
            )}
          </div>
          <div className="my-4 flex justify-center">
            {loading ? (
              ""
            ) : (
              <Pagination
                current={currPage}
                pageSize={10}
                total={productList.count}
                onChange={(pg) => pageChangeHandler(pg)}
              />
            )}
          </div>
        </div> */}

        <div className={`basis-[70%] mx-7`}>
          <div className={` ${style.cards}`}>
            {loading ? (
              <div className="flex content-center items-center">
                <TailSpin color="#b02e46" height={80} width={80} />
              </div>
            ) : (
              productList?.count &&
              productList.rows.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant={"small"}
                />
              ))
            )}
          </div>
          <div className="my-4 flex justify-center">
            {loading ? (
              ""
            ) : (
              <Pagination
                current={currPage}
                pageSize={10}
                total={productList.count}
                onChange={(pg) => pageChangeHandler(pg)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
