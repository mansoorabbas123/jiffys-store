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

// mui modal imports
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { set, useForm } from "react-hook-form";
import { NotificationManager } from "react-notifications";
import { CircularProgress } from "@mui/material";
// mui style
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
      <h1 className="ml-10 py-10 text-3xl">My Account</h1>
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
                }}
              >
                <form className="relative">
                  <a
                    className="absolute top-1 right-0 cursor-pointer"
                    onClick={handleClose}
                  >
                    <AiOutlineCloseSquare style={{ fontSize: "2rem" }} />
                  </a>
                  <div>
                    <label for="name">Name</label>
                    <input
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

                  <div>
                    <label for="phone">Phone</label>
                    <input
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

                  <div>
                    <label for="address">Address</label>
                    <input
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

                  <div>
                    <a
                      className="btn my-5"
                      onClick={handleSubmit(updateProfileHandler)}
                    >
                      Update
                    </a>
                  </div>
                </form>
              </Box>
            </Modal>
            {/* ------------------------------------------------------------------- */}
            <h1 className="text-xl mt-2">Account Details</h1>
            <a
              className="btn w-30 btn ml-auto"
              onClick={() => dispatch(Actions.userLogoutAction())}
            >
              logout
            </a>
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
                <span className="ml-2 text-slate-600"></span>
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
          <CircularProgress />
        ) : orderError ? (
          "not found"
        ) : (
          <div className="w-[92%] bg-white p-5 boxShadow-3xl mt-10">
            <h1 className="text-xl mt-2">My Orders</h1>
            <div className="bg-slate-300 w-[100%] h-[1px] m-5 mx-auto "></div>
            {/* content  */}
            <div>
              <table class="table-auto">
                <thead className="bg-slate-100">
                  <tr className="text-center">
                    <th className="text-center">ORDER #</th>
                    <th className="text-center">DATE</th>
                    <th className="text-center">TIME</th>
                    <th className="text-center">TOTAL</th>
                    <th className="text-center">STATUS</th>
                    <th className="text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {order_history &&
                    order_history.rows.map((order) => {
                      return (
                        <tr className="hover:bg-slate-100 text-center">
                          <td className="text-[#333333c5] text-center">
                            {order.id}
                          </td>
                          <td className="text-center font-thin text-[#00000071]">
                            {moment(order.dateOrderPlaced).format("MMM Do YY")}
                            {/* 03/28/2022 */}
                          </td>
                          <td className="text-center font-thin text-[#00000071]">
                            {moment(order.dateOrderPlaced).format("hh:mm a")}
                            {/* 03:53 PM */}
                          </td>
                          <td className="text-center font-bold text-[#b02e46]">
                            Rs {order.amount}
                          </td>
                          <td className="text-center font-bold text-[#b02e46]">
                            {order.status}
                          </td>
                          <td className="text-center">
                            <a className="btn">View</a>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAccountScreen;
