import React, { useState, useCallback, useEffect } from "react";
import AuthLayout from "./Components/AuthLayout";
import AuthFormWrapper from "./Components/AuthFormWrapper";
import { AiOutlineUser } from "react-icons/ai";
import { GoLock } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, getProfile } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const { accessToken, setAccessToken, setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard", { replace: true });
    }
  }, [accessToken, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleToast = useCallback((message, type = "error") => {
    if (!message) return;

    const options = {
      className: "rounded-lg shadow-lg",
      progressClassName: "bg-white",
    };

    type === "success"
      ? toast.success(message, options)
      : toast.error(message, options);
  }, []);

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      return "All fields are required";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      handleToast(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 1️⃣ Register user
      const { data } = await registerUser({
        email: formData.email,
        password: formData.password,
      });

      // 2️⃣ Store access token
      setAccessToken(data.accessToken);

      // 3️⃣ Fetch user profile
      const profileRes = await getProfile();
      setUser(profileRes.data);

      handleToast("Account created successfully", "success");

      navigate("/dashboard", { replace: true });
    } catch (err) {
      let message =
        err?.response?.data?.message ||
        "Registration failed. Please try again.";

      if (Array.isArray(message)) {
        message = message[0];
      }

      setError(message);
      handleToast(message);
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
              className="rounded-xl p-3 w-full pl-10 bg-orange-50 placeholder:text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
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
              className="rounded-xl p-3 pl-10 w-full bg-orange-50 placeholder:text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white p-3 rounded-xl bg-gradient-to-r from-[#FF7A2F] via-[#FFC7A6] to-[#F4E6DA] disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <div className="text-center text-sm">
            Already have an account?
            <Link to="/signin" className="text-blue-500 ml-1">
              Sign In
            </Link>
          </div>
        </form>
      </AuthFormWrapper>
    </AuthLayout>
  );
}

export default Signup;