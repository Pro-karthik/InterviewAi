import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "./Components/AuthLayout";
import AuthFormWrapper from "./Components/AuthFormWrapper";
import { verifyOtp as verifyOtpApi, resendOtp as resendOtpApi } from "../../api/auth.api";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [verified, setVerified] = useState(false);

  const inputsRef = useRef([]);

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

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").trim();

    if (!/^\d{6}$/.test(pasteData)) return;

    const pastedOtp = pasteData.split("");
    setOtp(pastedOtp);

    inputsRef.current[5]?.focus();
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (verified || loading) return;

  const finalOtp = otp.join("");

  if (finalOtp.length !== 6) {
    return handleToast("Enter complete OTP");
  }

  try {
    setLoading(true);

    const res = await verifyOtpApi({ email, otp: finalOtp });

    console.log("verify response:", res);

    if (res.success) {
      setVerified(true);

      handleToast(res.message, "success");

      navigate("/resetpassword", { state: { email } });
    }

  } catch (err) {
    console.log("verify error:", err);

    setOtp(["", "", "", "", "", ""]);
    inputsRef.current[0]?.focus();

    handleToast(err?.response?.data?.message || "Invalid OTP");
  } finally {
    setLoading(false);
  }
};
  const handleResendOtp = async () => {
    try {
      await resendOtpApi({ email });

      handleToast("New OTP sent", "success");

      setOtp(["", "", "", "", "", ""]);
      setTimer(60);
      inputsRef.current[0]?.focus();

    } catch (err) {
      handleToast(err?.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <AuthLayout>
      <AuthFormWrapper
        title="Verify OTP"
        subtitle={`Enter the 6-digit OTP sent to ${email}`}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-3" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl font-semibold rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || verified}
            className="w-full text-white p-3 rounded-xl bg-gradient-to-r from-[#FF7A2F] via-[#FFC7A6] to-[#F4E6DA] disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={handleResendOtp}
            disabled={timer > 0}
            className="text-orange-500 text-sm"
          >
            {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
          </button>
        </form>
      </AuthFormWrapper>
    </AuthLayout>
  );
}

export default VerifyOtp;