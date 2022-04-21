import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { IoMdCall } from "react-icons/io";
import { BiCurrentLocation } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseSquare } from "react-icons/ai";
import moment from "moment";
import { Input } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

// mui modal imports
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
// import Button from "@mui/material/Button";
import { set, useForm } from "react-hook-form";
import { NotificationManager } from "react-notifications";
import CircularProgress from "@mui/material/CircularProgress"; // mui style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  // border: "1px solid #000 !important",
  outline: "none",
  // boxShadow: 5,
  pt: 2,
  px: 4,
  pb: 3,
};

const UserAccountScreen = () => {
  const variables = {
    // orderId: 49,
    limit: 5,
    page: 0,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const userInfoReducer = useSelector((state) => state.userInfo);
  const { clientProfile, loading, user } = userInfoReducer;
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:870px)");
  const orderReducer = useSelector((state) => state.order);
  const {
    error: orderError,
    loading: orderLoading,
    order_history,
  } = orderReducer;

  // console.log(order_history);

  // mui modal snippet
  //---------------------------------------------------------------------
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //---------------------------------------------------------------------------

  console.log("errors", errors);

  const updateProfileHandler = (data) => {
    console.log("newProfile data", data);
    dispatch(Actions.userLoader(true));
    dispatch(Actions.updateClientProfileById(clientProfile.id, data));
    handleClose();
  };

  useEffect(() => {
    if (!user.token) {
      navigate("/login");
    } else {
      if (clientProfile.id) {
        setValue("name", clientProfile.name);
        setValue("phone", clientProfile.phone);
        setValue("address", clientProfile.address);
      } else {
        dispatch(Actions.userLoader(true));
        dispatch(Actions.getClientProfile());
        dispatch(Actions.orderLoading(true));
        dispatch(Actions.getOrderHistory(variables));
      }
    }
  }, [user, clientProfile]);

  if (loading) {
    return (
      <div className="flex justify-center mt-24">
        <TailSpin color="#b02e46" height={80} width={80} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="ml-10 py-14 text-3xl">My Account</h1>
      <div className="flex items-center flex-col">
        {/* account detail box/wrapper  */}
        <div className="w-[92%] bg-white p-5 boxShadow-3xl">
          <div className="flex justify-between">
            {/* mui modal ui --------------------------------------------------- */}
            <Modal
              hideBackdrop
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box
                sx={{
                  ...style,
                  boxShadow: "0px 1px 9px -3px rgba(0,0,0,0.58) !important",
                  // top: matches ? "50%" : "50%",
                  width: matches ? "91vw" : "auto",
                }}
              >
                <form className="relative pt-5">
                  <a
                    className="absolute top-0 right-0 cursor-pointer"
                    onClick={handleClose}
                  >
                    <AiOutlineCloseSquare style={{ fontSize: "2rem" }} />
                  </a>
                  <div className="my-4">
                    <label for="name" className="text-slate-400">
                      Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      {...register("name", {
                        required: "name is required",
                      })}
                    />
                    <span className="text-[red] text-xs font-thin">
                      {errors.name && errors.name.message}
                    </span>
                  </div>

                  <div className="my-4">
                    <label for="phone" className="text-slate-400">
                      Phone
                    </label>
                    <Input
                      type="number"
                      id="phone"
                      {...register("phone", {
                        required: "phone number is required",
                      })}
                    />
                    <span className="text-[red] text-xs font-thin">
                      {errors.phone && errors.phone.message}
                    </span>
                  </div>

                  <div className="my-4">
                    <label for="address" className="text-slate-400">
                      Address
                    </label>
                    <Input
                      type="text"
                      id="address"
                      {...register("address", {
                        required: "address is required",
                      })}
                    />
                    <span className="text-[red] text-xs font-thin">
                      {errors.address && errors.address.message}
                    </span>
                  </div>

                  <div className="my-2">
                    <button
                      className="btn my-3 text-white rounded-sm py-2 px-3 pt-3 hover:cursor-pointer"
                      onClick={handleSubmit(updateProfileHandler)}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </Box>
            </Modal>
            {/* ------------------------------------------------------------------- */}
            <h1 className="text-xl mt-2">Account Details</h1>
            <button
              className="btn w-30 btn ml-auto text-white rounded-sm px-3 pt-1"
              onClick={() => dispatch(Actions.userLogoutAction())}
            >
              Log Out
            </button>
          </div>
          <div className="bg-slate-300 w-[100%] h-[1px] m-5 mx-auto "></div>
          {/* content  */}
          <div>
            {/* each item  */}
            {clientProfile.name && (
              <div className="flex my-3">
                <FaUser
                  style={{ marginTop: "6.4px" }}
                  className="text-xs text-slate-600"
                />{" "}
                <span className="ml-2 text-slate-600">
                  {" "}
                  {clientProfile.name}
                </span>
              </div>
            )}

            {clientProfile.email && (
              <div className="flex my-3">
                <GrMail
                  style={{ marginTop: "6.4px" }}
                  className="text-xs text-slate-600"
                />{" "}
                <span className="ml-2 text-slate-600">
                  {clientProfile.email}
                </span>
              </div>
            )}

            {clientProfile?.phone && (
              <div className="flex my-3">
                <IoMdCall
                  style={{ marginTop: "6.4px" }}
                  className="text-xs text-slate-600"
                />{" "}
                <span className="ml-2 text-slate-600">
                  {" "}
                  {clientProfile?.phone}
                </span>
              </div>
            )}

            {clientProfile?.address && (
              <div className="flex my-3">
                <BiCurrentLocation
                  style={{ marginTop: "6.4px" }}
                  className="text-xs text-slate-600"
                />{" "}
                <span className="ml-2 text-slate-600">
                  {clientProfile.address ? clientProfile.address : "none"}
                </span>
              </div>
            )}

            {/* edit button  */}
            <div className="flex my-5">
              <MdEdit
                style={{ marginTop: "6.4px" }}
                className="text-xs font-bold text-[#b02e46] hover:text-[#ce465f] hover:cursor-pointer"
              />{" "}
              {/* <span className="ml-2 font-bold text-[#b02e46] hover:text-[#ce465f] hover:cursor-pointer">
                {" "}
                Edit Account{" "}
              </span> */}
              <a
                className="ml-2 font-bold text-[#b02e46] hover:text-[#ce465f] hover:cursor-pointer"
                onClick={handleOpen}
              >
                Edit Account
              </a>
            </div>
          </div>
        </div>

        {orderLoading ? (
          <TailSpin />
        ) : orderError ? (
          "not found"
        ) : (
          <div className="w-[91vw] bg-white p-5 boxShadow-3xl mt-10">
            <h1 className="text-xl mt-2">My Orders</h1>
            <div className="bg-slate-300 w-[100%] h-[1px] m-5 mx-auto "></div>
            {/* content  */}
            <TableContainer maxWidth={"100%"} overflowX={"auto"}>
              <Table variant="simple">
                <Thead className="bg-slate-100">
                  <Tr className="text-center">
                    <Th className="text-center">ORDER #</Th>
                    <Th className="text-center">DATE</Th>
                    <Th className="text-center">TIME</Th>
                    <Th className="text-center">TOTAL</Th>
                    <Th className="text-center">STATUS</Th>
                    <Th className="text-center">ACTION</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {order_history &&
                    order_history.rows.map((order) => {
                      return (
                        <Tr className="hover:bg-slate-100 text-center">
                          <Td className="text-[#333333c5] text-center">
                            {order.id}
                          </Td>
                          <Td className="text-center font-thin text-[#00000071]">
                            {moment(order.dateOrderPlaced).format("MMM Do YY")}
                            {/* 03/28/2022 */}
                          </Td>
                          <Td className="text-center font-thin text-[#00000071]">
                            {moment(order.dateOrderPlaced).format("hh:mm a")}
                            {/* 03:53 PM */}
                          </Td>
                          <Td className="text-center text-[#343a40be] text-[15px] font-[600] font-sans">
                            $ {order.amount}
                          </Td>
                          <Td className="text-center font-bold text-[#b02e46]">
                            {order.status}
                          </Td>
                          <Td className="text-center">
                            <button className="btn text-white rounded-sm p-2 pt-3">
                              View
                            </button>
                          </Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAccountScreen;
