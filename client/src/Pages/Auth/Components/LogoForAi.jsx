import React from "react";
import logo from "../../../assets/logo.png";

function LogoForAi({ size = "md" }) {

  const sizes = {
    sm: "h-8 text-lg",
    md: "h-10 text-xl",
    lg: "h-12 text-2xl",
  };

  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt="InterviewAI" className={`${sizes[size].split(" ")[0]} w-auto`} />
      <h1 className={`font-bold ${sizes[size].split(" ")[1]}`}>
        Interview<span className="text-purple-600">AI</span>
      </h1>
    </div>
  );
}

export default LogoForAi;