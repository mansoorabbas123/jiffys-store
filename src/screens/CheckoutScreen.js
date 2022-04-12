import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginCom from "../components/LoginCom";
import OrderConfirmation from "../components/OrderConfirmation";

const CheckoutScreen = () => {
  const navigate = useNavigate();
  const cartReducer = useSelector((state) => state.cart);
  const { cartItems } = cartReducer;
  const userReducer = useSelector((state) => state.userInfo);
  const { user } = userReducer;
  console.log("user", user);

  return (
    <div className="">
      <h1 className="ml-10 py-10 text-3xl">Checkout</h1>
      <div className="flex flex-col items-center md:flex-row md:justify-around md:items-start bg-white mt-10 pb-16">
        <h2 className="ml-10 py-10 text-xl">
          {user.username ? "Order Confirmation" : "Account"}
        </h2>
        {user.username ? <OrderConfirmation /> : <LoginCom variant="bg-grey" />}
        <div
          className="mt-10 p-4 rounded-md"
          style={{ backgroundColor: "rgba(247, 247, 247, 1)", width: "18rem" }}
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
            <p className="font-bold text-slate-700">Rs 0</p>
          </div>
          <div className="flex justify-between my-4">
            <p className="text-slate-700">DISCOUNT</p>
            <p className="font-bold text-slate-700">Rs 0</p>
          </div>
          <div className="flex justify-between my-4">
            <p className="text-slate-700">TOTAL</p>
            <p className="font-bold text-slate-700">
              Rs{" "}
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
              Rs{" "}
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
              <td className="text-slate-500">Normal Delivery (Rs 0) </td>
              <td>
                <input type="radio" name="" id="" />
              </td>
            </tr>
            {/* <tr>
              <td className="text-slate-500">Urgent Delivery (Rs 120)</td>
              <td>
                <input type="radio" name="" id="" />
              </td>
            </tr> */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
