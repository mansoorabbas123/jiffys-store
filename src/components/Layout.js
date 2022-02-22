import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Footer from "./common/Footer";
import logo from "../assets/logo/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import React from "react";
// import "./layout.css";

const Layout = () => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userInfo);
  const cartReducer = useSelector((state) => state.cart);
  const { cartItems } = cartReducer;
  const { error, loading, user } = userReducer;

  // material ui drawer
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const style = {
    nav: {
      boxShadow: "-1px 5px 6px 2px rgba(0, 0, 0, 0.10)",
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      zIndex: 1,
    },
  };

  return (
    <div className="" style={{ backgroundColor: "#f2f2f2" }}>
      <div style={style.nav} className="relative">
        <div className="flex justify-between bg-white">
          <Link to="/">
            <div className="p-3 ml-8 md:ml-16 text-2xl">
              <img
                src={logo}
                alt="logo"
                className="w-20"
                style={{ width: "4rem" }}
              />
            </div>
          </Link>
          <div className="p-3 mr:8 md:mr-16 mt-3">
            <div className="flex">
              <div className="mx-3">
                {user.token ? (
                  user.username
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
