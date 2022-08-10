import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Actions from "../store/actions";
import { ImGoogle3 } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { Controller, useForm } from "react-hook-form";
import { NotificationManager } from "react-notifications";
import OtpInput from "react-otp-input";
import TimerComp from "../components/TimerComp";

const OtpComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: { email },
  } = location;

  console.log("email from uselocation ", email);
  const [isOtpExpire, setIsOtpExpire] = useState(false);
  console.log("isOtpExpire", isOtpExpire);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  console.log("form errors", errors);

  const userReducer = useSelector((state) => state.userInfo);
  const { loading, user } = userReducer;

  console.log(errors.otp?.message);

  const submit = (data) => {
    const otpData = {
      email,
      otp: data.otp,
    };
    if (errors.otp) {
      NotificationManager.error(errors.otp?.message);
    } else if (location.state.type === "forgetPasword") {
      dispatch(Actions.userLoader(true));
      dispatch(Actions.verifyForgetPassword(otpData, navigate));
    } else {
      dispatch(Actions.userLoader(true));
      dispatch(Actions.verifyOtpAction(otpData, navigate));
    }
  };

  const expireOtpHandler = (value) => {
    setIsOtpExpire(value);
  };

  const resendOtpHandler = () => {
    dispatch(Actions.userLoader(true));
    dispatch(Actions.resendOtpAction(email, navigate));
  };

  useEffect(() => {
    if (user.email) {
      navigate("/");
    }
  }, [user]);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 300); // 5 minutes timer

  return (
    <div className="border-2 p-5 rounded-lg mt-10 mx-10">
      {loading ? (
        <div className="flex justify-center">
          <TailSpin color="#b02e46" height={80} width={80} />
        </div>
      ) : (
        <div>
          <TimerComp expiryTimestamp={time} otpExpire={expireOtpHandler} />
          {isOtpExpire ? (
            <div className="w-96 flex flex-col items-center">
              <h1 className="text-center my-5 text-slate-700">OTP expired</h1>{" "}
              <button
                className="bg-slate-400 text-white p-1 rounded-md px-3 my-4 w-40"
                onClick={resendOtpHandler}
              >
                resend otp
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(submit)}>
              <div className="">
                <Controller
                  control={control}
                  name="otp"
                  rules={{
                    required: true,
                    minLength: {
                      value: 6,
                      message: "min length should be six characters",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <OtpInput
                      value={value}
                      onChange={onChange}
                      numInputs={6}
                      separator={<span>-</span>}
                      isInputNum={true}
                      containerStyle={{ width: "100%" }}
                      inputStyle={{
                        width: "4rem",
                        borderBottom: "2px solid black",
                        borderBottom: "1px solid #c4c4c4",
                        outline: "none",
                      }}
                      inputRef={ref}
                    />
                  )}
                />
                <span className="text-[red] text-xs font-thin">
                  {errors.otp && errors.otp.message}
                </span>

                {/* <input
                    type="number"
                    name="otp"
                    id=""
                    className="w-full my-1 border-2 p-1"
                    placeholder="OTP"
                    min="1"
                    {...register("otp", {
                      required: "otp is required",
                      maxLength: {
                        value: 20,
                        message: "max length should be 20",
                      },
                    })}
                  />
                  <span className="text-red-500 text-sm">
                    {errors.otp && errors.otp.message}
                  </span> */}
              </div>
              {/* {inputError ? (
                <p className="text-red-500 text-sm">user not found</p>
              ) : (
                ""
              )} */}
              <div className="flex justify-center">
                <button
                  className="bg-sky-600 text-white p-1 rounded-md px-3 my-4 w-40"
                  style={{ backgroundColor: "#b02e46" }}
                >
                  Verify
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default OtpComp;
