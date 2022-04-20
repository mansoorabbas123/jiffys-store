import LogoImage from "../assets/img/login-image.png";
import LoginCom from "../components/LoginCom";

const LoginScreen = () => {
  return (
    <div className="flex flex-col items-center md:flex-row md:justify-center md:items-center m-5 mt-24 md:mt-16 pb-16 bg-[#f2f2f2]">
      {/* side one  */}

      <div className="  justify-center flex-col text-center mx-10 mt-10 py-5 px-4 hidden md:flex rounded-lg shadow-sm">
        <img src={LogoImage} alt="logo image" className="w-96" />
        <h1 className="text-2xl" style={{ color: "#b02e46" }}>
          Site Name
        </h1>
      </div>
      {/* side two  */}
      <LoginCom />
    </div>
  );
};

export default LoginScreen;
