import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Actions from "../store/actions";
import { ImGoogle3 } from "react-icons/im";
import LogoImage from "../assets/img/login-image.png";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState("");

  const userInfoReducer = useSelector((state) => state.userInfo);
  const { error, user, loading } = userInfoReducer;

  const sumbitHandler = () => {
    dispatch(Actions.userLoader(true));
    dispatch(Actions.userLoginAction(userName, password));
    setUserName("");
    setPassword("");
  };

  useEffect(() => {
    if (user.token) {
      navigate("/");
    } else if (error.message) {
      setInputError("error");
    }
  }, [user, error]);

  return (
    <div className="flex flex-col items-center md:flex-row md:justify-center md:items-start m-5 mt-16">
      {/* side one  */}
      <div className=" flex justify-center flex-col text-center mx-10 mt-20">
        <img src={LogoImage} alt="logo image" className="w-96" />
        <h1 className="text-2xl" style={{ color: "#b02e46" }}>
          Site Name
        </h1>
      </div>
      {/* side two  */}
      <div className="w-96 border-2 p-5 rounded-lg bg-white mt-24 mx-10">
        <div>
          <div className="flex justify-between my-5">
            <h2 className="text-xl mb-3">Sign in</h2>
            <p className="mt-1 ">
              or{" "}
              <Link to="/register" className="text-sky-700 ">
                create an account
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
          <div className="">
            <input
              type="text"
              name=""
              id=""
              className="w-full my-1 border-2 p-1"
              placeholder="User Name"
              onChange={(e) => setUserName(e.target.value)}
              required
              value={userName}
              onFocus={() => setInputError("")}
            />
          </div>
          <div className="">
            <input
              type="password"
              name=""
              id=""
              className="w-full my-1 border-2 p-1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
              onFocus={() => setInputError("")}
            />
          </div>
          {inputError ? (
            <p className="text-red-500 text-sm">user not found</p>
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
      </div>
    </div>
  );
};

export default LoginScreen;
