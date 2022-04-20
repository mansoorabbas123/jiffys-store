import React, { useEffect, useState } from "react";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import successImg from "../assets/img/success.jpg";
import Modal from "../components/UI/Modal";
import * as Actions from "../store/actions";
import { TailSpin } from "react-loader-spinner";

const PaymentComp = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const [loader, setLoader] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const navigate = useNavigate();
  const client_secret = location.state.client_secret;
  const orderId = location.state.orderId;

  // for modal
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    console.log("error message", event);

    if (elements == null) {
      setLoader(false);
      return;
    }
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: elements.getElement(CardElement),
    // });
    stripe
      .confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),

          // billing_details: {
          //   name: 'Jenny Rosen',
          // },
        },
      })
      .then(function (result) {
        // Handle result.error or result.paymentIntent
        // console.log("payment result ", result.paymentIntent.id);
        if (result) {
          dispatch(Actions.confirmPayment(orderId));
          setLoader(false);
          dispatch(Actions.clearCartAction());
          setOpen(true);
        }
      })
      .catch((error) => {
        if (error) {
          setPaymentError(error);
          setLoader(false);
        }
      });
  };

  const userReducer = useSelector((state) => state.userInfo);
  const { user } = userReducer;
  const cartReducer = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cartReducer;

  useEffect(() => {
    if (!user.token) {
      navigate("/login");
    } else if (!shippingAddress.city) {
      navigate("/checkout");
    }
  }, [shippingAddress, cartItems, user]);

  return (
    <div className="w-96 mt-10 relative">
      <div className="p-2 mb-5">
        <div className="flex justify-between">
          <h2 className="text-lg p-3">Payment Method</h2>
        </div>
        <div className="border-b-2"></div>
        <form onSubmit={handleSubmit} className="my-10">
          <CardElement />
          <p className="text-red-700 text-sm my-5">
            {paymentError && paymentError}
          </p>
          {loader ? (
            <TailSpin />
          ) : (
            <button
              type="submit"
              disabled={!stripe || !elements}
              className="rounded-sm py-2  pt-3 px-5 my-4 btn text-white"
            >
              Pay
            </button>
          )}
        </form>
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="flex items-center flex-col ">
            <img src={successImg} className="text-center mb-5" alt="" />
            <h1 className="text-center text-2xl">Your Order is Complete</h1>
            <button
              onClick={() => navigate("/")}
              className="btn mt-5 px-3 py-2 pt-2 text-white rounded-sm"
            >
              Continue Shopping
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PaymentComp;
