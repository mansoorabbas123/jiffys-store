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
        <div className="flex justify-between items-center bg-white pb-3 pt-2 ">
          {/* item1 logo  */}
          <Link to="/" className="p-3 ml-8 md:ml-16 mt-2 w-[90px] md:w-[100px]">
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
                className="py-2 px-3 rounded-sm font-sans"
                style={{
                  backgroundColor: "#b02e46",
                  color: "white",
                  textTransform: "capitalize",
                  fontSize: "1.1rem",
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
                  className="placeholder-style browser-default px-5 screen_hidden w-[16rem] lg:w-[24rem]"
                  style={{
                    border: "1px solid #C0C2C9",
                    borderRadius: "4px",
                    paddingTop: "9px",
                    paddingBottom: "9px",
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
                      marginTop: "5px",
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
              <div className="mx-3 relative">
                <Link to="/cart">
                  <BsCartFill
                    style={{
                      fontSize: "1.5rem",
                      display: "inline",
                      marginRight: "5px",
                    }}
                  />
                  <div className="absolute right-0 top-0 bg-red-500 text-white rounded-full px-1 text-xs">
                    {cartItems.length}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* item2 search  */}
        <div className="content-center items-center relative flex sm:hidden ml-[10px] pb-5">
          <div
            className="flex"
            onMouseEnter={() => setShowCategory(true)}
            onMouseLeave={() => setShowCategory(false)}
            onClick={() => setShowCategory(false)}
          >
            <div
              className="py-[4px] px-[6px] rounded-sm font-sans text-[15px] capitalize text-white bg-[#b02e46]"
              onClick={() => setShowCategory((prv) => !prv)}
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
                className="placeholder-style-small browser-default py-[3px] px-[1px] rounded-sm screen_hidden border w-[15rem]"
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

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

// export default function TemporaryDrawer() {
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <Box
//       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <div>
//       {['left', 'right', 'top', 'bottom'].map((anchor) => (
//         <React.Fragment key={anchor}>
//           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//           <Drawer
//             anchor={anchor}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//           >
//             {list(anchor)}
//           </Drawer>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }
