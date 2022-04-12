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

  // const {register, handleSubmit, formState: { errors }} = useForm();

  // console.log("form errors",errors);

  // const submit = (data) => {
  //   console.log("form data", data);
  // }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState("");

  const userInfoReducer = useSelector((state) => state.userInfo);
  const { error, user, loading } = userInfoReducer;

  const sumbitHandler = () => {
    const loginInfo = {
      email,
      password,
    };
    console.log("loginInfo in loginComp: ", loginInfo);
    dispatch(Actions.userLoader(true));
    dispatch(Actions.userLoginAction(loginInfo, navigate));
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (user.token) {
      navigate("/");
    } else if (error) {
      setInputError(error);
      // console.log(error.response);
    }
  }, [user, error]);

  return (
    <div className="w-96 border-2 p-5 rounded-lg mt-10 mx-10">
      {loading ? (
        <div className="flex justify-center">
          <TailSpin color="#b02e46" height={80} width={80} />
        </div>
      ) : (
        <div>
          <div className="flex justify-between my-5">
            <h2 className="text-xl mb-3">Sign in</h2>
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
          <div className="">
            <label htmlFor="email" className="text-black">
              Email
            </label>
            <input
              type="email"
              name="email"
              id=""
              className="w-full my-1 border-2 p-1"
              placeholder="enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email}
              onFocus={() => setInputError("")}
            />
          </div>
          <div className="">
            <label htmlFor="password" className="text-black">
              Password
            </label>
            <input
              type="password"
              name=""
              id=""
              className="w-full my-1 border-2 p-1"
              placeholder="enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
              onFocus={() => setInputError("")}
            />
          </div>
          <p>
            <Link
              to="/forgetPassword"
              className="text-slate-500 hover:text-slate-700 mt-5"
            >
              Forget Password
            </Link>
          </p>
          {inputError ? (
            <p className="text-red-500 text-sm">{error.data.message}</p>
          ) : (
            ""
          )}
          <div className="flex justify-end">
            <button
              onClick={sumbitHandler}
              className="bg-sky-600 text-white p-1 rounded-md px-3 my-4"
              style={{ backgroundColor: "#b02e46" }}
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
