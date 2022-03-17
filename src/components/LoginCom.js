import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Actions from "../store/actions";
import { ImGoogle3 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";

const LoginCom = ({ variant }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      )}
    </div>
  );
};

export default LoginCom;
