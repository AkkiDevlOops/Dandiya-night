"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // =========================
  // SEND OTP
  // =========================
  const handleSendOTP = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const cleanNumber = number.replace(/\D/g, "");

    if (cleanNumber.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          number: cleanNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || data.error || "Could not send OTP.");
      }

      setOtpSent(true);
      setMessage(
        data.message || "OTP sent successfully to your mobile number."
      );
    } catch (err) {
      console.error("SEND OTP ERROR:", err);

      setError(
        err?.message || "Something went wrong while sending OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // VERIFY OTP
  // =========================
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const cleanNumber = number.replace(/\D/g, "");

      const response = await fetch("/api/auth/signup/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          number: cleanNumber,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || data.error || "Invalid OTP."
        );
      }

      setMessage("Mobile number verified successfully!");

      // Change this route according to your profile setup flow
      setTimeout(() => {
        router.push("/profile");
      }, 800);
    } catch (err) {
      console.error("VERIFY OTP ERROR:", err);

      setError(
        err?.message || "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CHANGE NUMBER
  // =========================
  const handleChangeNumber = () => {
    setOtpSent(false);
    setOtp("");
    setError("");
    setMessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#fffaf5]">
      <div className="w-full max-w-md">

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#741337]">
              Create Account
            </h1>

            <p className="text-gray-500 mt-2">
              {otpSent
                ? "Verify your mobile number"
                : "Enter your mobile number to continue"}
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {message && (
            <div className="mb-5 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600">
              {message}
            </div>
          )}

          {/* ========================= */}
          {/* MOBILE NUMBER */}
          {/* ========================= */}

          {!otpSent ? (
            <form onSubmit={handleSendOTP}>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>

              <div className="flex border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-orange-400">

                <div className="flex items-center px-4 bg-gray-50 border-r text-gray-600">
                  +91
                </div>

                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="9876543210"
                  value={number}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setNumber(value);
                  }}
                  className="flex-1 px-4 py-3 outline-none text-gray-900"
                  disabled={loading}
                />

              </div>

              <p className="text-xs text-gray-500 mt-2">
                We'll send a verification OTP to this number.
              </p>

              <button
                type="submit"
                disabled={loading || number.length !== 10}
                className="w-full mt-6 py-3.5 rounded-xl bg-[#741337] text-white font-semibold hover:bg-[#6b1233] cursor-not-allowed"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>

            </form>
          ) : (

            /* ========================= */
            /* OTP */
            /* ========================= */

            <form onSubmit={handleVerifyOTP}>

              <div className="text-center mb-6">

                <p className="text-sm text-gray-500">
                  OTP sent to
                </p>

                <p className="font-semibold text-gray-900 mt-1">
                  +91 {number}
                </p>

                <button
                  type="button"
                  onClick={handleChangeNumber}
                  className="text-sm text-orange-500 hover:underline mt-2"
                >
                  Change number
                </button>

              </div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setOtp(value);
                }}
                className="w-full border border-gray-300 rounded-xl px-4 py-4 text-center text-2xl tracking-[0.5em] font-semibold outline-none focus:ring-2 focus:ring-orange-400"
                disabled={loading}
                autoFocus
              />

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full mt-6 py-3.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full mt-4 text-sm text-gray-500 hover:text-orange-500"
              >
                Resend OTP
              </button>

            </form>
          )}

          {/* LOGIN */}
          <div className="text-center mt-8 pt-6 border-t">
            <p className="text-sm text-gray-500">
              
            </p>

            <button
              type="button"
              onClick={() => router.push("/login")}
              className="mt-1 text-[#741337] font-semibold hover:underline"
            >
              Login with email
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}