import React from "react";
import AuthLayout from "./Components/AuthLayout";
import AuthFormWrapper from "./Components/AuthFormWrapper";
import { AiOutlineUser } from "react-icons/ai";
import { GoLock } from "react-icons/go";
import OauthButtons from "./Components/OauthButtons";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <AuthLayout>
      <AuthFormWrapper>
        <h3 className="text-xl font-bold font-fontFamily-heading mb-2 text-center">
          LOGIN
        </h3>
        <p className="text-gray-600  font-heading  text-center mb-4">
          Enter your credentials to access your account
        </p>

        {/* Form */}
        <form className="space-y-4">
          <div className="relative">
            <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
           <input type="email"
            name="email"
            placeholder="Email"
             className=" text-black-500 placeholder:text-black  rounded-xl p-3 pl-10 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400 "
            />
          </div>
          <div className="relative">
            <GoLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className=" text-black-500 placeholder:text-black  rounded-md p-3 pl-10 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-1/2 bg-accent-light text-white p-3 rounded-lg hover:bg-accent-dark transition justify-center items-center mx-auto block "
            style={{background: "linear-gradient(90deg, #FF7A2F 0%, #FFC7A6 55%, #F4E6DA 100%)"}}
          >
            Sign In
          </button>
          <a href="/signup" className="block text-center text-sm  ">
            You don't have an account?
            <span className="text-blue-500"> Sign Up</span>
          </a>
          <p className="text-center mt-2">Login With others</p>
          {/* Oauth Buttons */}
          <div className="mt-2">
            <OauthButtons />
          </div>
        </form>
      </AuthFormWrapper>
    </AuthLayout>
  );
}

export default SignIn;
