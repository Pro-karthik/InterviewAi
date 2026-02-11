import React from "react";
import AuthLayout from "./Components/AuthLayout";
import AuthFormWrapper from "./Components/AuthFormWrapper";
import { AiOutlineUser } from "react-icons/ai";
import { GoLock } from "react-icons/go";

function Signup() {
  return (
    <AuthLayout>
      <AuthFormWrapper>
        <h2 className="text-2xl font-bold text-center mb-4">SIGN UP</h2>
        <p className="text-gray-600 text-sm text-center mb-5">
          Create your account to get started
        </p>
        <form className="space-y-4">
          <div className="relative">
            <AiOutlineUser className="absolute left-3 top-6 transform -translate-y-1/2 text-black-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className=" text-black-500 mb-3 placeholder:text-black rounded-md p-3 pl-10 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400 "
            />
          </div>
          <div className="relative">
            <GoLock className="absolute left-3 top-6 transform -translate-y-1/2 text-black-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className=" text-black-500 mb-4 placeholder:text-black  rounded-md p-3 pl-10 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="relative">
            <GoLock className="absolute left-3 top-6 transform -translate-y-1/2 text-black-400" />
            <input
              type="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              className=" text-black-500 mb-3 placeholder:text-black  rounded-md p-3 pl-10 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-1/2 bg-accent-light text-white font-bold p-3 rounded-xl hover:bg-accent-dark transition justify-center items-center mx-auto block"
            style={{
              background:
                "linear-gradient(90deg, #FF7A2F 0%, #FFC7A6 55%, #F4E6DA 100%)",
            }}
          >
            Sign Up
          </button>
          <a href="/login" className="block text-center text-sm  ">
            Already have account? Please
            <span className="text-blue-500"> Login</span>
          </a>
          <p className="text-center mt-2">Login With others</p>
        </form>
      </AuthFormWrapper>
    </AuthLayout>
  );
}

export default Signup;
