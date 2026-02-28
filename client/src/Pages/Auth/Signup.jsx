import React, { useState } from "react";
import AuthLayout from "./Components/AuthLayout";
import AuthFormWrapper from "./Components/AuthFormWrapper";
import OauthButtons from "./Components/OauthButtons";
import { AiOutlineUser } from "react-icons/ai";
import { GoLock } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
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

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { data } = await registerUser({
        email: formData.email,
        password: formData.password
      });

      // Store access token in memory
      setAccessToken(data.accessToken);

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthFormWrapper>
        <h2 className="text-2xl font-bold text-center mb-4">SIGN UP</h2>
        <p className="text-gray-600 text-sm text-center mb-5">
          Create your account to get started
        </p>

        {error && (
          <div className="text-red-500 text-sm text-center mb-2">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-md w-full p-3 pl-10 placeholder:text-black bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="relative">
            <GoLock className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="rounded-xl p-3 w-full pl-10 placeholder:text-black bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="relative">
            <GoLock className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="rounded-xl p-3 pl-10 w-full placeholder:text-black bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-1/2 mx-auto block text-white p-3 rounded-xl bg-gradient-to-r from-[#FF7A2F] via-[#FFC7A6] to-[#F4E6DA] disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <div className="block text-center text-sm">
            Already have an account?
            <Link to="/signin" className="text-blue-500 ml-1">
              Sign In
            </Link>
          </div>

          <p className="text-center mt-2">Sign Up With others</p>

          <OauthButtons />
        </form>
      </AuthFormWrapper>
    </AuthLayout>
  );
}

export default Signup;