import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Actions from "../store/actions";
import { ImGoogle3 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { useForm } from "react-hook-form";

const LoginCom = ({ variant }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  console.log("form errors", errors);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState("");

  const userInfoReducer = useSelector((state) => state.userInfo);
  const { error, user, loading } = userInfoReducer;

  const sumbitHandler = (data) => {
    console.log("data", data);
    const loginInfo = {
      email: data.email,
      password: data.password,
    };
    // console.log("loginInfo in loginComp: ", loginInfo);
    dispatch(Actions.userLoader(true));
    dispatch(Actions.userLoginAction(loginInfo, navigate));
    // setEmail("");
    // setPassword("");
  };

  useEffect(() => {
    if (user.token) {
      navigate("/");
    }
    // } else if (error) {
    //   setInputError(error);
    //   // console.log(error.response);
    // }
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
            <h2 className="text-xl mb-3 text-[1.75rem]">Login</h2>
            <p className="mt-1 ">
              <span className="text-slate-400">or </span>
              <Link
                to="/register"
                className="text-slate-500 hover:text-slate-700"
              >
                Create an Account
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
          <p className="text-center my-5">OR</p>
          <div className="my-4">
            <label
              htmlFor="email"
              className="text-black font-[700] uppercase text-[0.9rem]"
            >
              Email*
            </label>
            <input
              type="email"
              name="email"
              id="email"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
                  message: "email format is incorrect",
                },
              })}
              className="w-full my-1 bg-white p-1 appearance-none outline-none"
              style={{
                borderBottom: "1px solid #c4c4c4",
              }}
              placeholder="enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="my-4">
            <label
              htmlFor="password"
              className="text-black font-[700] uppercase text-[0.9rem]"
            >
              Password*
            </label>
            <input
              type="password"
              name=""
              id="password"
              {...register("password", {
                required: "password is required",
                maxLength: {
                  value: 20,
                  message: "max length should be 20",
                },
                minLength: {
                  value: 6,
                  message: "min length should be 6",
                },
              })}
              className="w-full my-1 p-1 appearance-none outline-none"
              style={{
                borderBottom: "1px solid #c4c4c4",
              }}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          {/* {error && (
            <p className="text-red-600 text-sm">{error.response.message}</p>
          )} */}
          <p>
            <Link
              to="/forgetPassword"
              className="text-slate-500 hover:text-slate-700 mt-5"
            >
              Forget Password
            </Link>
          </p>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit(sumbitHandler)}
              className="bg-sky-600 text-white p-1 rounded-md px-3 pt-2 my-4 btn"
            >
              Sign in
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginCom;
