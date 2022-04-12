import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LogoImage from "../assets/img/login-image.png";
import * as Actions from "../store/actions";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const userReducer = useSelector((state) => state.userInfo);
  const { loading } = userReducer;

  const submitHandler = () => {
    console.log("email", email);
    if (!email) {
      NotificationManager.error("Email Not Found");
    } else {
      dispatch(Actions.userLoader(true));
      dispatch(Actions.forgetPasswordAction(email, navigate));
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
      <div className="w-96 border-2 p-5 rounded-lg mt-10 mx-10">
        <div className="">
          <input
            type="email"
            name="email"
            id=""
            className="w-full my-1 border-2 p-1"
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
            // onFocus={() => setInputError("")}
          />
          <a className="btn w-[100%] mt-5" onClick={submitHandler}>
            Submit
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
