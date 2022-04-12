import React from "react";
import LogoImage from "../assets/img/login-image.png";
import OtpComp from "../components/OtpComp";

const VerifyScreen = () => {
  return (
    <div className="flex flex-col items-center md:flex-row md:justify-center md:items-start m-5 mt-16 pb-16 bg-white">
      <OtpComp />
    </div>
  );
};

export default VerifyScreen;
