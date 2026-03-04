import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AuthLayout from "./Components/AuthLayout";
import AuthFormWrapper from "./Components/AuthFormWrapper";
import { ResetPassword as resetPasswordApi } from "../../api/auth.api";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  useEffect(() => {
    if (!email) {
      navigate("/forgot", { replace: true });
    }
  }, [email, navigate]);

  const validatePassword = (pwd) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pwd);
  };

  const getPasswordStrength = () => {
    if (password.length === 0) return "";

    if (password.length < 6) return "Weak";
    if (password.length < 10) return "Medium";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      return handleToast(
        "Password must be 8+ chars with uppercase, lowercase & number"
      );
    }

    if (password !== confirmPassword) {
      return handleToast("Passwords do not match");
    }

    try {
      setLoading(true);

      await resetPasswordApi({
        email,
        newPassword: password,
      });

      handleToast("Password reset successful", "success");

      navigate("/signin", { replace: true });

    } catch (err) {
      handleToast(
        err?.response?.data?.message || "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthFormWrapper
        title="Reset Password"
        subtitle={`Create a new password for ${email}`}
      >
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* New Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Enter your new password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Must contain at least 8 characters, including uppercase,
              lowercase and a number.
            </p>

            {password && (
              <p className="text-xs font-medium">
                Strength: {getPasswordStrength()}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm your new password
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-3 text-gray-500"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>

            {/* {confirmPassword && (
              <p
                className={`text-xs ${
                  password === confirmPassword
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {password === confirmPassword
                  ? "Passwords match"
                  : "Passwords do not match"}
              </p>
            )} */}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white p-3 rounded-xl bg-gradient-to-r from-[#FF7A2F] via-[#FFC7A6] to-[#F4E6DA] disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

        </form>
      </AuthFormWrapper>
    </AuthLayout>
  );
}

export default ResetPassword;