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
  const [error, setError] = useState(null);

  const userReducer = useSelector((state) => state.userInfo);
  const { loading } = userReducer;

  const submitHandler = () => {
    console.log("email", email);
    if (!email) {
      setError("email not found");
    } else if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setError("email format is incorrect");
    } else {
      dispatch(Actions.userLoader(true));
      dispatch(Actions.forgetPasswordAction(email, navigate));
      setError(null);
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
        <form className="">
          <input
            type="email"
            name="email"
            id=""
            className="w-full my-1 p-1"
            style={{ borderBottom: "1px solid #c4c4c4", outline: "none" }}
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
            // onFocus={() => setInputError("")}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            className="btn w-[100%] mt-5 text-white p-1 rounded-md px-3 pt-2"
            onClick={submitHandler}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
