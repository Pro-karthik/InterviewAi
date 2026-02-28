import React from "react";
import logo from "../../../assets/logo.png";
import bgroundImage from "../../../assets/illustrations/bg_ground.png";
import sideImage from "../../../assets/illustrations/side_image.png"
import ellipse from "../../../assets/illustrations/Ellipse.png"
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="w-full mt-4 font-body">
      {/* Navbar */}
      <div className="w-full flex justify-between items-center">
        <div>
          <img src={logo} alt="logo" className="h-[70px]" />
        </div>

        <div>
          <Link to="/signup">
            <button className="bg-primary-dark text-text-white px-5 py-2 text-lg rounded-3xl font-body border-none">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Body */}
      <div
        className="w-full min-h-[80vh] flex bg-cover bg-center relative">


        <img
          src={bgroundImage}
          alt="bg"
          className="absolute  left-[55%] top-[38%] -translate-x-1/2 w-[90%] h-[80%] pointer-events-none overflow-hidden"
        />

        <div className="w-1/2 flex justify-center items-start flex-col gap-5 z-10">
          <h1 className="text-6xl font-bold">
            Crack <span className="text-accent-light"> Interviews</span> 
          </h1>
          <h1 className="text-6xl font-bold ">with  an <span className="text-accent-light" >AI</span></h1>
          <div className="w-full">

            <p className="text-text-secondary font-semibold font-body text-sm ">Practice role-specific interviews with an AI that asks follow-ups,
            </p>
            <p className="text-text-secondary font-semibold font-body text-sm ">watches your behavior, and gives brutally honest feedback—just
            </p>
            <p className="text-text-secondary font-semibold font-body text-sm ">like a real interviewer.
            </p>
          </div>
        </div>
        <div className="w-1/2 relative z-10">
          <img className="absolute right-0 top-12 w-[300px]" src={ellipse} alt="ellipse" />
          <img src={sideImage} alt="sideImage" className="absolute top-24" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
