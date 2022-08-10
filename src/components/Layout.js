import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import * as Actions from "../store/actions";
import Footer from "./common/Footer";
import logo from "../assets/logo/logo.svg";
import { FaUserCircle } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineDown } from "react-icons/ai";
import { ImSearch } from "react-icons/im";
import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import style from "./Layout.module.css";
import "./layout.css";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Divider from "@mui/material/Divider";
import { getCategoriesForMenu, productLoader } from "../store/actions";
import { MdSafetyDivider } from "react-icons/md";
import { HiOutlineSortDescending } from "react-icons/hi";
import { IoMdCart } from "react-icons/io";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import CartQty from "./CartQty";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userReducer = useSelector((state) => state.userInfo);
  const cartReducer = useSelector((state) => state.cart);
  const [showCategory, setShowCategory] = useState(false);
  const [search, setSearch] = useState("");
  const { cartItems } = cartReducer;
  const { error, loading, user } = userReducer;
  const productReducer = useSelector((state) => state.products);
  const {
    error: menuError,
    menuCategories,
    loading: menuCategoryLoading,
  } = productReducer;

  console.log("menuCategorie", menuCategories);

  // material ui menu for logout popup
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/shop?search=${search}`);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(Actions.userLogoutAction());
  };

  const style = {
    nav: {
      boxShadow: "-1px 5px 6px 2px rgba(0, 0, 0, 0.10)",
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      zIndex: 5,
      backgroundColor: "white",
    },
  };

  useEffect(() => {
    dispatch(productLoader(true));
    dispatch(getCategoriesForMenu());
  }, []);

  return (
    <div className="" style={{ backgroundColor: "#f2f2f2" }}>
      <div style={style.nav} className="relative">
        <div className="flex justify-between items-center bg-white pb-3 pt-[0.7rem] ">
          {/* item1 logo  */}
          <Link
            to="/"
            className="ml-5 mr-6 md:ml-16 mt-2 w-[80px] md:w-[100px]"
          >
            <img src={logo} alt="logo" className="w-full" />
          </Link>
          {/* item2 search  */}
          <div className="content-center items-center relative hidden sm:flex">
            <div
              className="flex"
              onMouseEnter={() => setShowCategory(true)}
              onMouseLeave={() => setShowCategory(false)}
              onClick={() => setShowCategory(false)}
            >
              <div
                className="py-[7px] pb-[8px] px-2 rounded-sm font-sans"
                style={{
                  backgroundColor: "#b02e46",
                  color: "white",
                  textTransform: "capitalize",
                  fontSize: "1rem",
                }}
              >
                <div className="flex">
                  <p>Categories</p>{" "}
                  <AiOutlineDown
                    style={{
                      display: "block",
                      marginTop: "6px",
                      marginLeft: "5px",
                    }}
                  />
                </div>
              </div>
              {showCategory && (
                <>
                  <div className="absolute left-0 h-16 w-60 "></div>
                  <div className="bg-white shadow-2xl absolute left-0 top-[60px] rounded-sm">
                    {menuCategoryLoading ? (
                      <TailSpin />
                    ) : (
                      menuCategories.rows.map((category) => {
                        return (
                          <>
                            <Link
                              to={`/shop?category_id=${category.id}`}
                              className="flex p-2 px-3 text-md "
                            >
                              {/* <p className="px-2 text-slate-500">icon</p> */}
                              <p className="px-2 text-slate-500 hover:text-slate-800 hover:cursor-pointer">
                                {category.title}
                              </p>
                            </Link>
                            {/* <Divider /> */}
                          </>
                        );
                      })
                    )}
                  </div>
                </>
              )}
            </div>

            <div
              className="ml-2 relative"
              // style={{ paddingRight: 0, marginRight: 0 }}
            >
              <form onSubmit={searchHandler}>
                <input
                  type="text"
                  placeholder="Search"
                  className="placeholder-style browser-default px-2 screen_hidden w-[16rem] lg:w-[30rem]"
                  style={{
                    border: "1px solid #C0C2C9",
                    borderRadius: "4px",
                    paddingTop: "7px",
                    paddingBottom: "6px",
                    outline: "none",
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <button
                  className="bg-[#b02e46] w-12 h-[100%] absolute right-[0] top-0"
                  style={{
                    borderTopRightRadius: "4px",
                    borderBottomRightRadius: "4px",
                  }}
                >
                  <ImSearch
                    style={{
                      color: "white",
                      marginTop: "3px",
                      marginLeft: "13px",
                      fontSize: "20px",
                    }}
                  />
                </button>
              </form>
            </div>
          </div>

          {/* item3 user and cart  */}
          <div className="p-3 mr:8 md:mr-16">
            <div className="flex justify-evenly items-center">
              <div className="mx-3">
                {user.token ? (
                  <div className="hover:cursor-pointer">
                    {/* <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    > */}
                    <FaUserAlt
                      style={{ fontSize: "1.4rem" }}
                      onClick={handleClick}
                    />
                    {/* </Button> */}
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <Link to="/account">
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                      </Link>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <Link to={"/login"}>
                    {" "}
                    <FaUserCircle style={{ fontSize: "1.5rem" }} />
                  </Link>
                )}
              </div>
              <div
                className="mx-3 relative"
                ref={btnRef}
                colorScheme="teal"
                onClick={onOpen}
              >
                <BsCartFill
                  style={{
                    fontSize: "1.5rem",
                    display: "inline",
                    marginRight: "5px",
                  }}
                />
                <Drawer
                  isOpen={isOpen}
                  placement="right"
                  onClose={onClose}
                  finalFocusRef={btnRef}
                >
                  <DrawerOverlay />
                  <DrawerContent maxW={"25rem"}>
                    <DrawerCloseButton />
                    <DrawerHeader
                      fontSize={"18px"}
                      fontWeight={"500"}
                      lineHeight={"28px"}
                      marginBottom={"20px"}
                      color={"#b02e46"}
                      borderBottom={"1px solid #eee"}
                    >
                      Cart
                    </DrawerHeader>

                    <DrawerBody>
                      {cartItems.length < 1 ? (
                        <div className="flex flex-col items-center py-[8rem]">
                          <div>
                            <IoMdCart
                              style={{ margin: "auto", fontSize: "6rem" }}
                            />
                          </div>
                          <p className="py-6 text-[20px] text-[#333333]">
                            No item found in cart
                          </p>
                        </div>
                      ) : (
                        <>
                          {cartItems.map((item) => {
                            return (
                              <div className="my-4">
                                <div
                                  className="flex my-2"
                                  id="container"
                                  key={item.id}
                                >
                                  <div className="px-2 w-14" id="item_1">
                                    <img
                                      src={item.productImages[0].url}
                                      // className="w-full"
                                      style={{ width: "100%" }}
                                    />
                                  </div>
                                  <div className="flex-col px-2" id="item_2">
                                    <h5 className="text-[15px] leading-[17px] mb-[0.5rem] font-[500] font-sans text-[rgba(0,0,0,.85)]">
                                      {item.title}
                                    </h5>
                                    <div className="">
                                      <CartQty
                                        product={item}
                                        styleVariant="productCard"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="m-auto w-[97%]"
                                  style={{
                                    borderBottom: "1px solid #eee",
                                  }}
                                ></div>
                              </div>
                            );
                          })}
                          {cartItems.length < 1 ? (
                            <></>
                          ) : (
                            <div className="w-full relative my-3">
                              <div
                                className="m-auto w-[97%]"
                                style={{
                                  borderBottom: "1px solid #eee",
                                }}
                              ></div>
                              <div className="flex content-between my-2">
                                <div className="text-[16px] font-[600] leading-[25px]">
                                  Subtotal
                                </div>
                                <div className="absolute top-2 right-0 text-[16px] font-[600] leading-[25px]">
                                  ${" "}
                                  {cartItems
                                    .reduce(
                                      (acc, item) =>
                                        acc + item.qty * item.price,
                                      0
                                    )
                                    .toFixed(2)}
                                </div>
                              </div>
                              <div
                                className="m-auto w-[97%]"
                                style={{
                                  borderBottom: "1px solid #eee",
                                }}
                              ></div>
                            </div>
                          )}
                          <button
                            className="btn w-full p-1 rounded-sm pt-2 my-3 text-white"
                            onClick={() => {
                              onClose();
                              navigate("/cart");
                            }}
                          >
                            VIEW CART
                          </button>
                          <button
                            className="btn w-full p-1 rounded-sm pt-2 text-white"
                            onClick={() => {
                              onClose();
                              navigate("/checkout");
                            }}
                          >
                            CHECKOUT
                          </button>
                        </>
                      )}
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
                <div className="absolute right-0 top-0 bg-red-500 text-white rounded-full px-1 text-xs">
                  {cartItems.length}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* item2 search  */}
        <div
          id="search"
          className="content-center items-center relative flex sm:hidden ml-5 pb-5"
        >
          <div
            className="flex w-full"
            id="search_item"
            onMouseEnter={() => setShowCategory(true)}
            onMouseLeave={() => setShowCategory(false)}
            onClick={() => setShowCategory(false)}
          >
            <div
              className="py-[2px] px-[6px] rounded-sm font-sans text-[15px] capitalize text-white bg-[#b02e46]"
              onClick={() => setShowCategory((prv) => !prv)}
            >
              <div className="flex">
                <p>
                  <HiOutlineSortDescending
                    style={{
                      display: "block",
                      marginTop: "6px",
                      marginLeft: "5px",
                      fontSize: "24px",
                    }}
                  />
                </p>{" "}
              </div>
            </div>
            {showCategory && (
              <>
                <div className="absolute left-0 h-16 w-60 "></div>
                <div className="bg-white shadow-2xl absolute left-0 top-[60px] rounded-sm">
                  {menuCategoryLoading ? (
                    <TailSpin />
                  ) : (
                    menuCategories.rows.map((category) => {
                      return (
                        <>
                          <Link
                            to={`/shop?category_id=${category.id}`}
                            className="flex p-2 px-3 text-md "
                          >
                            {/* <p className="px-2 text-slate-500">icon</p> */}
                            <p className="px-2 text-slate-500 hover:text-slate-800 hover:cursor-pointer">
                              {category.title}
                            </p>
                          </Link>
                          {/* <Divider /> */}
                        </>
                      );
                    })
                  )}
                </div>
              </>
            )}
          </div>

          <div
            className="mr-5 relative"
            // style={{ paddingRight: 0, marginRight: 0 }}
          >
            <form onSubmit={searchHandler} className="">
              <input
                type="text"
                placeholder="Search"
                className="placeholder-style-small browser-default py-[3px] pt-[5px] px-[1px] rounded-sm screen_hidden border w-[16rem]"
                style={{
                  // border: "1px solid #C0C2C9",
                  // borderRadius: "4px",
                  // paddingTop: "9px",
                  // paddingBottom: "9px",
                  outline: "none",
                }}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                className="bg-[#b02e46] w-12 h-[100%] absolute right-[0] top-0"
                style={{
                  borderTopRightRadius: "4px",
                  borderBottomRightRadius: "4px",
                }}
              >
                <ImSearch
                  style={{
                    color: "white",
                    marginLeft: "16px",
                    fontSize: "15px",
                  }}
                />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-16" style={{ minHeight: "80vh" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
