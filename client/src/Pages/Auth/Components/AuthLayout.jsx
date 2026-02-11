import React from "react";
import loginImg from "../../../assets/illustrations/auth-login.png";
import loginBg from "../../../assets/illustrations/auth-bg.png";
import bulb from "../../../assets/icons/bulb-icon.png";
import scale from "../../../assets/icons/scale-icon.png";
import pcicon from "../../../assets/icons/pc-icon.png";
import reacts from "../../../assets/icons/react-icon.png";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex ">
      <div className="absolute bottom-4 left-4 flex items-center space-x-2">
        <img src={bulb} alt="Bulb Icon" />
      </div>
      <div className="absolute top-4 left-4">
        <img src={scale} alt="Scale Icon" />
      </div>
      <div className="absolute top-4 left-[40%]">
        <img src={pcicon} alt="" className="rotate-12 pointer-events-none" />
      </div>
      <div className="absolute bottom-4 left-[40%]">
        <img src={reacts} alt="React Icon" className="pointer-events-none" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 ">
        <div className="w-1/2 bg-background-default">{children}</div>
      </div>

      <div
        className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src={loginImg}
          alt="Login Illustration"
          className="w-2/3 h-auto relative z-10"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
