import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { toast } from "react-toastify";
import AuthLayout from "./Components/AuthLayout";
import AuthFormWrapper from "./Components/AuthFormWrapper";
import { forgotPassword } from "../../api/auth.api";

function Forgot() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleToast = useCallback((message, type = "error") => {
    if (!message) return;

    const options = {
      className: "rounded-lg shadow-lg",
      progressClassName: "bg-white",
    };

    if (type === "success") {
      toast.success(message, options);
    } else {
      toast.error(message, options);
    }
  }, []);

  const extractHtmlError = (htmlString) => {
    if (!htmlString) return "Something went wrong";

    const match = htmlString.match(/Error:\s*(.*?)<br>/);
    return match ? match[1] : "Something went wrong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return handleToast("Email is required");
    }

    try {
      setLoading(true);

      await forgotPassword({ email });

      handleToast("OTP sent to your email", "success");

      navigate("/verifyotp", { state: { email } });

    } catch (err) {
      let message = "Failed to send OTP";

      if (err?.response?.data) {
        if (typeof err.response.data === "string") {
          // Backend returning HTML error
          message = extractHtmlError(err.response.data);
        } else if (err.response.data.message) {
          message = err.response.data.message;
        }
      }

      handleToast(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthFormWrapper
        title="Forgot Password"
        subtitle="Enter your registered email to receive OTP"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <AiOutlineMail className="absolute left-3 top-3.5 text-black text-lg" />
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-md w-full p-3 pl-10 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white p-3 rounded-xl bg-gradient-to-r from-[#FF7A2F] via-[#FFC7A6] to-[#F4E6DA] disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </AuthFormWrapper>
    </AuthLayout>
  );
}

export default Forgot;