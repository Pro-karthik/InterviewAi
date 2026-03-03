import React, { useEffect, useState,useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
    // Minimum 8 chars, 1 uppercase, 1 lowercase, 1 number
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      return handleToast(
        "Password must be 8+ chars with uppercase, lowercase & number"
      ,"failure");
    }

    if (password !== confirmPassword) {
      return handleToast("Passwords do not match","failure");
    }

    try {
      setLoading(true);

      await resetPasswordApi({
        email,
        newPassword: password,
      });

     handleToast("Password reset successful","success");
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
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

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