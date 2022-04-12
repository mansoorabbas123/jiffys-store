import React from "react";
import LogoImage from "../assets/img/login-image.png";
import RegisterComp from "../components/RegisterComp";

const RegisterScreen = () => {
  return (
    <div className="flex flex-col items-center md:flex-row md:justify-center md:items-start m-5 mt-16 pb-16 bg-white">
      {/* side one  */}
      <div className=" flex justify-center flex-col text-center mx-10 mt-5">
        <img src={LogoImage} alt="logo image" className="w-96" />
        <h1 className="text-2xl" style={{ color: "#b02e46" }}>
          Site Name
        </h1>
      </div>
      {/* side two  */}
      <RegisterComp />
    </div>
  );
};

export default RegisterScreen;
