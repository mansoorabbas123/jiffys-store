import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "./UI/Modal";
import successImg from "../assets/img/success.jpg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Actions from "../store/actions";
import { useDispatch } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
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

const OrderSummaryComp = () => {
  const dispatch = useDispatch();

  // state for modal
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const userReducer = useSelector((state) => state.userInfo);
  const { user } = userReducer;
  const cartReducer = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cartReducer;
  const productReducer = useSelector((state) => state.products);
  const { loading } = productReducer;

  const proceedToPayHandler = () => {
    if (shippingAddress && cartItems.length > 0) {
      const orderDetail = {
        address: shippingAddress.address,
        city: shippingAddress.city,
        phone: shippingAddress.phone,
        items: cartItems.map((item) => ({
          quantity: item.qty,
          productId: item.id,
        })),
      };
      console.log("order detail in ui screen");
      dispatch(Actions.productLoader(true));
      dispatch(Actions.placeOrderAction(orderDetail, navigate));
    }
  };

  useEffect(() => {
    if (!shippingAddress.city) {
      navigate("/checkout");
    }
  }, [shippingAddress]);

  return (
    <div className="md:w-[40rem] mt-10 mr-4 relative">
      <div className="p-2 mb-5">
        <div className="flex justify-between">
          <h2 className="text-lg p-3 font-bold">Your Information</h2>
          <Link
            to="/account"
            className="text-lg p-3"
            style={{ color: "#b02e46" }}
          >
            Edit
          </Link>
        </div>
        <div className="border-b-2"></div>

        <p className="text-slate-700 px-3 py-1">{user && user.username}</p>
        {/* <p className="text-slate-700 px-3 py-1">dummy@gmail.com</p> */}
      </div>
      <div className="p-2 mb-5">
        <div className="flex justify-between">
          <h2 className="text-lg p-3 font-bold">Shipping Address</h2>
          <Link
            to="/checkout"
            className="text-lg p-3"
            style={{ color: "#b02e46" }}
          >
            Edit
          </Link>
        </div>
        <div className="border-b-2 mb-3"></div>
        <p className="text-slate-700 ">
          {shippingAddress?.city}, {shippingAddress?.address}
        </p>
      </div>
      <div className="p-2 mb-5">
        <div className="flex justify-between">
          <h2 className="text-lg p-3">Summary</h2>
          {/* <a href="" className="text-lg p-3" style={{ color: "#b02e46" }}>
            Edit
          </a> */}
        </div>
        <div className="border-b-2 mb-3"></div>
      </div>
      <div>
        <TableContainer maxWidth={"100%"} overflowX={"auto"}>
          <Table variant="simple">
            <Thead className="bg-slate-100">
              <Tr className="text-center">
                <Th className="text-center">NO</Th>
                <Th className="text-center">PRODUCT</Th>
                <Th className="text-center">NAME</Th>
                <Th className="text-center">QUANTITY</Th>
                <Th className="text-center">PRICE</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cartItems.length > 0 &&
                cartItems.map((item) => {
                  return (
                    <Tr
                      className="hover:bg-slate-100 text-center"
                      key={item.id}
                    >
                      <Td className="text-[#333333c5] text-center">
                        {item.id}
                      </Td>
                      <Td className="text-center font-thin text-[#00000071]">
                        <img src={item.productImages[0].url} className="w-10" />
                      </Td>
                      <Td className="text-center font-thin text-[#00000071]">
                        {item.title.slice(0, 20)}...
                      </Td>
                      <Td className="text-center font-bold text-[#b02e46]">
                        {item.qty}
                      </Td>
                      <Td className="text-center font-bold text-[#b02e46]">
                        Rs {item.price}
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <div className="flex justify-center my-10">
        {loading ? (
          <TailSpin />
        ) : (
          <>
            {cartItems.length < 1 ? (
              <div className="flex justify-between items-center">
                <button className="btn" onClick={proceedToPayHandler} disabled>
                  Proceed to pay{" "}
                </button>
                <p className="ml-5">please add product into cart first</p>
              </div>
            ) : (
              <button
                className="btn text-white rounded-sm p-2 px-3 pt-3"
                onClick={proceedToPayHandler}
              >
                Proceed to pay{" "}
              </button>
            )}
          </>
        )}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex items-center flex-col ">
          <img src={successImg} className="text-center mb-5" alt="" />
          <h1 className="text-center text-2xl">Your Order is Complete</h1>
          <button onClick={() => navigate("/")} className="btn mt-5">
            Continue Shopping
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderSummaryComp;
