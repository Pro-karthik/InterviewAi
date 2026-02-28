import React, { useState } from "react";
import AuthLayout from "./Components/AuthLayout";
import AuthFormWrapper from "./Components/AuthFormWrapper";
import { AiOutlineUser } from "react-icons/ai";
import { GoLock } from "react-icons/go";
import OauthButtons from "./Components/OauthButtons";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

function SignIn() {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useAuth();
  if (accessToken) {
    navigate("/dashboard");
  }

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { data } = await loginUser(formData);

      // Store access token in memory
      setAccessToken(data.accessToken);

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthFormWrapper>
        <h3 className="text-xl font-bold font-fontFamily-heading mb-2 text-center">
          LOGIN
        </h3>
        <p className="text-gray-600 text-center mb-4">
          Enter your credentials to access your account
        </p>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm text-center mb-2">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="text-black w-full placeholder:text-black rounded-xl p-3 pl-10 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="relative">
            <GoLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="text-black w-full placeholder:text-black rounded-xl p-3 pl-10 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-1/2 bg-gradient-to-r from-[#FF7A2F] via-[#FFC7A6] to-[#F4E6DA] text-white p-3 rounded-lg transition justify-center items-center mx-auto block disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="text-center text-sm">
            You don't have an account?
            <Link to="/signup" className="text-blue-500 ml-1">
              Sign Up
            </Link>
          </div>

          <p className="text-center mt-2">Login With others</p>

          <div className="mt-2">
            <OauthButtons />
          </div>
        </form>
      </AuthFormWrapper>
    </AuthLayout>
  );
}

export default SignIn;