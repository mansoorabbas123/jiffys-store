import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginCom from "../components/LoginCom";
import OrderConfirmation from "../components/OrderConfirmation";
import OrderSummaryComp from "../components/OrderSummaryComp";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";

const OrderScreen = () => {
  const navigate = useNavigate();
  const cartReducer = useSelector((state) => state.cart);
  const { cartItems } = cartReducer;
  const userReducer = useSelector((state) => state.userInfo);
  const { user } = userReducer;
  console.log("user", user);

  return (
    <div className="">
      <h1 className="ml-4 pt-[8rem] md2:pt-20 text-[40px] leading-[1.3] font-[700] mb-[10px] text-[#b02e46] pt-[5.5rem]l">
        Order Summary
      </h1>
      <Breadcrumb sx={{ marginLeft: "1.2rem", marginBottom: "4rem" }}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink>Order</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="flex flex-col items-center md2:flex-row md2:justify-around md2:items-start bg-white mt-10 pb-16">
        <div>
          {/* <h2 className="ml-5 py-10 text-xl">
            {user.username ? "Order Confirmation" : "Account"}
          </h2> */}
          {user.username ? (
            <OrderSummaryComp />
          ) : (
            <LoginCom variant="bg-grey" />
          )}
        </div>

        <div
          className="mt-10 p-4 w-full md2:w-[18rem] rounded-md "
          style={{ backgroundColor: "rgba(247, 247, 247, 1)" }}
        >
          <h2 className="font-semibold text-md">Cart Total</h2>
          <div className="flex justify-between my-4">
            <p className="text-slate-700">TOTAL ITEMS</p>
            <p className="font-bold text-slate-700">
              {cartItems &&
                cartItems.reduce((accu, item) => accu + item.qty, 0)}
            </p>
          </div>
          <div className="flex justify-between my-4">
            <p className="text-slate-700">DELIVERY CHARGES</p>
            <p className="font-bold text-slate-700">$0</p>
          </div>
          <div className="flex justify-between my-4">
            <p className="text-slate-700">DISCOUNT</p>
            <p className="font-bold text-slate-700">$0</p>
          </div>
          <div className="flex justify-between my-4">
            <p className="text-slate-700">TOTAL</p>
            <p className="font-bold text-slate-700">
              $
              {cartItems &&
                cartItems.reduce(
                  (accu, item) => accu + item.qty * item.price,
                  0
                )}
            </p>
          </div>
          <div className="flex justify-between my-5 mt-8">
            <p className="text-slate-700">GRAND TOTAL</p>
            <p className="font-bold text-slate-700">
              $
              {cartItems &&
                cartItems.reduce(
                  (accu, item) => accu + item.qty * item.price,
                  0
                )}
            </p>
          </div>
          <div style={{ borderBottom: "1px solid grey" }}></div>
          <h2 className="font-semibold text-md mt-5">Shipping Mode</h2>
          <table>
            <tr>
              <td className="text-slate-500">Normal Delivery ($0) </td>
              <td>
                <input type="radio" name="shippingMode" id="" />
              </td>
            </tr>
            <tr>
              <td className="text-slate-500">Urgent Delivery ($120)</td>
              <td>
                <input type="radio" name="shippingMode" id="" disabled />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
