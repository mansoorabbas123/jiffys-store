import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Actions from "../store/actions";
import { ImGoogle3 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { NotificationManager } from "react-notifications";

const RegisterComp = ({ variant }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log("form errors", errors);

  const userReducer = useSelector((state) => state.userInfo);
  const { loading, user } = userReducer;

  const submit = (data) => {
    if (data.password !== data.confirmPassword) {
      NotificationManager.error(
        "Confirm password is wrong",
        "Confirm Password",
        3000
      );
    } else {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      };
      dispatch(Actions.userLoader(true));
      dispatch(Actions.userRegisterAction(userInfo, navigate));
    }
  };

  useEffect(() => {
    if (user.email) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="w-96 border-2 p-5 rounded-lg mt-10 mx-10 bg-white">
      {loading ? (
        <div className="flex justify-center">
          <TailSpin color="#b02e46" height={80} width={80} />
        </div>
      ) : (
        <div>
          <div className="flex justify-between my-5">
            <h2 className="text-xl mb-3">Sign up</h2>
            <p className="mt-1 ">
              or{" "}
              <Link to="/login" className="text-sky-700 ">
                Already Have an account
              </Link>
            </p>
          </div>
          <div className="my-5">
            <button
              className="bg-sky-600 p-2 rounded-md text-white my-2 w-full text-sm"
              style={{ backgroundColor: "#b02e46" }}
            >
              <ImGoogle3 style={{ display: "inline", marginRight: "1rem" }} />
              Sign in with Google
            </button>
          </div>
          <p className="text-center">Or</p>
          <form onSubmit={handleSubmit(submit)}>
            <div className="my-2">
              <input
                type="text"
                name="name"
                id=""
                className="w-full my-1 p-1"
                style={{ borderBottom: "1px solid #c4c4c4", outline: "none" }}
                placeholder="Name"
                {...register("name", {
                  required: "name is required",
                  maxLength: {
                    value: 20,
                    message: "max length should be 20",
                  },
                })}
              />
              <span className="text-red-500 text-sm">
                {errors.name && errors.name.message}
              </span>
            </div>
            <div className="my-2">
              <input
                type="email"
                name="email"
                id=""
                className="w-full my-1 p-1"
                style={{ borderBottom: "1px solid #c4c4c4", outline: "none" }}
                placeholder="Email"
                {...register("email", {
                  required: "email is requird",
                  minLength: {
                    value: 5,
                    message: "minimum length should be 5",
                  },
                  maxLength: {
                    value: 250,
                    message: "maximum length should be 250",
                  },
                })}
              />
              <span className="text-red-500 text-sm">
                {errors.email && errors.email.message}
              </span>
            </div>
            <div className="my-2">
              <input
                type="password"
                name="password"
                id=""
                className="w-full my-1 p-1"
                style={{ borderBottom: "1px solid #c4c4c4", outline: "none" }}
                placeholder="Password"
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message: "minimum length should be 6",
                  },
                  maxLength: {
                    value: 20,
                    message: "maximum length should be 6",
                  },
                })}
              />
              <span className="text-red-500 text-sm">
                {errors.password && errors.password.message}
              </span>
            </div>
            <div className="my-2">
              <input
                type="password"
                name="confirmPassword"
                id=""
                className="w-full my-1  p-1"
                style={{ borderBottom: "1px solid #c4c4c4", outline: "none" }}
                placeholder="Confrim Password"
                {...register("confirmPassword", {
                  required: "confirm password is required",
                  minLength: {
                    value: 6,
                    message: "minimum length should be 6",
                  },
                  maxLength: {
                    value: 20,
                    message: "maximum length should be 6",
                  },
                })}
              />
              <span className="text-red-500 text-sm">
                {errors.confirmPassword && errors.confirmPassword.message}
              </span>
            </div>
            <div className="my-2">
              <input
                type="number"
                name="phone"
                id=""
                className="w-full my-1 p-1"
                placeholder="Phone"
                style={{ borderBottom: "1px solid #c4c4c4", outline: "none" }}
                {...register("phone", {
                  required: "phone number is required",
                  minLength: {
                    value: 6,
                    message: "minimum length should be 11",
                  },
                  maxLength: {
                    value: 20,
                    message: "maximum length should be 11",
                  },
                })}
              />
              <span className="text-red-500 text-sm">
                {errors.phone && errors.phone.message}
              </span>
            </div>
            {/* {inputError ? (
            <p className="text-red-500 text-sm">user not found</p>
          ) : (
            ""
          )} */}
            <div className="flex justify-end">
              <button
                className="bg-sky-600 text-white p-1 rounded-md px-3 my-4"
                style={{ backgroundColor: "#b02e46" }}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterComp;
