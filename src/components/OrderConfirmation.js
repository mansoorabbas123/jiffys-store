import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "./UI/Modal";
// import successImg from "../assets/img/success.jpg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Actions from "../store/actions";
import { useDispatch } from "react-redux";

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  // state for modal
  // const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const cartReducer = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cartReducer;
  const productReducer = useSelector((state) => state.products);
  const { loading } = productReducer;

  // react hook form
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
    const orderDetail = {
      address: data.address,
      city: data.city,
      items: cartItems.map((item) => ({
        quantity: item.qty,
        productId: item.id,
      })),
    };
    if (data) {
      // console.log("orderDetail", orderDetail);
      dispatch(Actions.productLoader(true));
      dispatch(
        Actions.addShippingAddress(
          { city: data.city, address: data.address },
          navigate
        )
      );
      // dispatch(Actions.clearCartAction());
      // setOpen(true);
    }
  };

  useEffect(() => {
    if (shippingAddress.city) {
      setValue("address", shippingAddress.address);
      setValue("city", shippingAddress.city);
    }
  }, [shippingAddress]);

  const userReducer = useSelector((state) => state.userInfo);
  const { user } = userReducer;

  //   {
  //     "address": "Ghazi, Haripur, Pakistan",
  //     "city": "Islamabad",
  //     "items": [{
  //         "quantity": 1,
  //         "productId": 1
  //     },
  //     {
  //         "quantity": 2,
  //         "productId": 1
  //     }]
  // }

  return (
    <div className="w-96 mt-10 relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-2 mb-5">
          <div className="flex justify-between">
            <h2 className="text-lg p-3 font-bold">Your Information</h2>
            {/* <a href="" className="text-lg p-3" style={{ color: "#b02e46" }}>
              Edit
            </a> */}
          </div>
          <div className="border-b-2"></div>

          <p className="text-slate-700 px-3 py-1">{user && user.username}</p>
          {/* <p className="text-slate-700 px-3 py-1">dummy@gmail.com</p> */}
        </div>
        <div className="p-2 mb-5">
          <div className="flex justify-start">
            <h2 className="text-lg p-3 font-bold">Shipping Address</h2>
          </div>
          <div className="border-b-2 mb-3"></div>

          {/* <p className="text-slate-700 px-3 py-1">Address</p>
        <p className="text-slate-700 px-3 py-1"> City</p>
        <p className="text-slate-700 px-3 py-1">Postal Code</p>
        <p className="text-slate-700 px-3 py-1">Country</p> */}

          {/*conditional*/}

          <label for="address">Address</label>
          <input
            type="text"
            id="address"
            {...register("address", {
              required: { value: true, message: "address is required" },
            })}
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
          <label for="city">City</label>
          <input
            type="text"
            id="city"
            {...register("city", {
              required: { value: true, message: "city is required" },
            })}
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}

          {/* <label for="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            {...register("postalCode", {
              required: { value: true, message: "Postal Code is required" },
            })}
          />
          {errors.postalCode && (
            <p className="text-red-500">{errors.postalCode.message}</p>
          )} */}
          {/* 
          <label for="country">Country</label>
          <input
            type="text"
            id="country"
            {...register("country", {
              required: { value: true, message: "country is required" },
            })}
          />
          {errors.country && (
            <p className="text-red-500">{errors.country.message}</p>
          )} */}
        </div>
        {/* <div className="p-2">
        <div className="flex justify-between">
          <h2 className="text-lg p-3">Billing Address</h2>
          <a href="" className="text-lg p-3" style={{ color: "#b02e46" }}>
            Edit
          </a>
        </div>
        <div className="border-b-2"></div>

        <p className="text-slate-700 px-3 py-1">Address</p>
        <p className="text-slate-700 px-3 py-1"> City</p>
        <p className="text-slate-700 px-3 py-1">Postal Code</p>
        <p className="text-slate-700 px-3 py-1">Country</p>
      </div> */}
        <div className="flex justify-center">
          <button className="btn">Confrim Shipping Address </button>
        </div>
        {/* <Modal open={open} onClose={() => setOpen(false)}>
          <div className="flex items-center flex-col ">
            <img src={successImg} className="text-center mb-5" alt="" />
            <h1 className="text-center text-2xl">Your Order is Complete</h1>
            <a onClick={() => navigate("/")} className="btn mt-5">
              Continue Shopping
            </a>
          </div>
        </Modal> */}
      </form>
    </div>
  );
};

export default OrderConfirmation;
