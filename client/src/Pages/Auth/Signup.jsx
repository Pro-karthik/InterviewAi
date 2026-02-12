import React from "react";
import AuthLayout from "./Components/AuthLayout";
import AuthFormWrapper from "./Components/AuthFormWrapper";
import OauthButtons from "./Components/OauthButtons";
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
            <AiOutlineUser className="absolute left-3 top-6 -translate-y-1/2" />
            <input
              type="email"
              placeholder="Email"
              className="rounded-md p-3 pl-10 placeholder:text-black bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="relative">
            <GoLock className="absolute left-3 top-6 -translate-y-1/2" />
            <input
              type="password"
              placeholder="Password"
              className="rounded-md p-3 pl-10 placeholder:text-black bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="relative">
            <GoLock className="absolute left-3 top-6 -translate-y-1/2" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="rounded-md p-3 pl-10 placeholder:text-black bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-1/2 mx-auto block text-white p-3 rounded-xl"
            style={{
              background:
                "linear-gradient(90deg,#FF7A2F 0%,#FFC7A6 55%,#F4E6DA 100%)",
            }}
          >
            Sign Up
          </button>
            <a href="/signin" className="block text-center text-sm  ">
            Already have an account?
            <span className="text-blue-500"> Sign In</span>
          </a>
          <p className="text-center mt-2">Sign Up With others</p>
           {/* Oauth Buttons */}
          <OauthButtons />
        </form>
      </AuthFormWrapper>
    </AuthLayout>
  );
}

export default Signup;
