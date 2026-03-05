import React, { useState, useCallback, useEffect } from "react";
import AuthLayout from "./Components/AuthLayout";
import AuthFormWrapper from "./Components/AuthFormWrapper";
import { AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GoLock } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, getProfile } from "../../api/auth.api";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

function SignIn() {
  const navigate = useNavigate();
  const { accessToken, setAccessToken, setUser, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && accessToken) {
      navigate("/dashboard", { replace: true });
    }
  }, [authLoading, accessToken, navigate]);

  const handleToast = useCallback((message, type) => {
    if (!message) return;

    const options = {
      className: "bg-green-600 text-white rounded-lg shadow-lg",
      progressClassName: "bg-green-300",
    };

    type === "success"
      ? toast.success(message, options)
      : toast.error(message, options);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!formData.email || !formData.password) {
      handleToast("Please fill all fields", "error");
      return;
    }

    try {
      setLoading(true);

      const { data } = await loginUser(formData);

      const token = data.accessToken;

      // 🔑 set axios header immediately
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // store token in context
      setAccessToken(token);

      // fetch profile
      const profileRes = await getProfile();

      setUser(profileRes.data);

      handleToast("Login Successful", "success");

      navigate("/dashboard", { replace: true });

    } catch (err) {
      const message =
        err?.response?.data?.message || "Login failed. Please try again.";

      handleToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthFormWrapper>
        <h3 className="text-xl font-bold mb-2 text-center">LOGIN</h3>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <div className="relative">
            <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="text-black w-full rounded-xl p-3 pl-10 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="relative">
            <GoLock className="absolute left-3 top-1/2 -translate-y-1/2" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="text-black w-full rounded-xl p-3 pl-10 pr-10 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#FF7A2F] via-[#FFC7A6] to-[#F4E6DA] text-white p-3 rounded-lg disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="text-center text-sm">
            Don't have an account?
            <Link to="/signup" className="text-blue-500 ml-1">
              Sign Up
            </Link>
          </div>

          <div className="text-center text-sm text-blue-500">
            <Link to="/forgot">Forgot Password?</Link>
          </div>

        </form>
      </AuthFormWrapper>
    </AuthLayout>
  );
}

export default SignIn;