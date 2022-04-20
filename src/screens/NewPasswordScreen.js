import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LogoImage from "../assets/img/login-image.png";
import * as Actions from "../store/actions";

const NewPasswordScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: { otp, user },
  } = location;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userReducer = useSelector((state) => state.userInfo);
  const { loading } = userReducer;

  const submitHandler = () => {
    console.log("password", password);
    if (password !== confirmPassword) {
      NotificationManager.error("confirm password is incorrect");
    } else {
      const newPassowrdData = {
        password,
        otp,
      };
      console.log("new password data", newPassowrdData);
      dispatch(Actions.userLoader(true));
      dispatch(
        Actions.forgetPasswordCreateAction(newPassowrdData, user, navigate)
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center pt-10">
        <TailSpin color="#b02e46" height={80} width={80} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center md:flex-row md:justify-center md:items-center m-5 mt-16 pb-16 bg-white">
      {/* side one  */}
      <div className=" flex justify-center flex-col text-center mx-10 mt-5">
        <img src={LogoImage} alt="logo image" className="w-96" />
        <h1 className="text-2xl" style={{ color: "#b02e46" }}>
          Site Name
        </h1>
      </div>
      {/* side two  */}
      <div className="w-96 border p-5 rounded-lg mt-10 mx-10">
        <div className="">
          <div className="my-4">
            <label for="password">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full my-1 p-1"
              style={{ borderBottom: "1px solid #c4c4c4", outline: "none" }}
              placeholder="Enter New Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
              // onFocus={() => setInputError("")}
            />
          </div>{" "}
          <div className="my-4">
            <label for="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="w-full my-1 p-1"
              style={{ borderBottom: "1px solid #c4c4c4", outline: "none" }}
              placeholder="Re-type your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              value={confirmPassword}
              // onFocus={() => setInputError("")}
            />
          </div>
          <button
            className="btn w-[100%] mt-5 text-white p-1 rounded-md px-3 pt-2"
            onClick={submitHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordScreen;
