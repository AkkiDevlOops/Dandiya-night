"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Googlelogin from "@/components/googlelogin";
import { useAuth } from "@/lib/gettoken";

export default function LoginForm() {
  const router = useRouter();
  const { user } = useAuth();

  // =========================
  // FORM STATES
  // =========================

  const [identifier, setIdentifier] = useState("");
  const [number, setnumber] = useState("");
  const [otpInput, setOtpInput] = useState("");

  // 1 = enter email/number
  // 2 = enter OTP
  const [step, setStep] = useState(1);

  // =========================
  // UI STATES
  // =========================

  const [loading, setLoading] = useState(false);
  const [loadinglog, setLoadinglog] = useState(false);

  const [isDisabled, setisDisabled] = useState(false);

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // =========================
  // AUTH
  // =========================

  useEffect(() => {
    if (user) {
      // Keep your existing behavior here if required.
      // Example:
      // router.push("/testroute");
    }
  }, [user]);

  // =========================
  // EMAIL VALIDATION
  // =========================

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // =========================
  // MOBILE VALIDATION
  // =========================

  const isValidMobile = (mobile) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  // =========================
  // SEND OTP
  // =========================

  const handlesubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccessMsg("");

    const cleanEmail = identifier.trim().toLowerCase();
    const cleanNumber = number.replace(/\D/g, "");

    // =========================
    // VALIDATION
    // =========================

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!cleanNumber) {
      setError("Please enter your mobile number.");
      return;
    }

    if (!isValidMobile(cleanNumber)) {
      setError(
        "Please enter a valid 10-digit Indian mobile number."
      );
      return;
    }

    try {
      setLoadinglog(true);
      setisDisabled(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          identifier: cleanEmail,
          number: cleanNumber,
        }),
      });

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "Invalid server response. Please try again."
        );
      }

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            data.error ||
            "Unable to send OTP. Please try again."
        );
      }

      // =========================
      // OTP SENT
      // =========================

      setSuccessMsg(
        data.message || "OTP sent successfully."
      );

      setOtpInput("");

      setStep(2);

    } catch (err) {
      console.error("LOGIN OTP ERROR:", err);

      setError(
        err?.message ||
          "Unable to send OTP. Please check your internet connection and try again."
      );
    } finally {
      setLoadinglog(false);

      // Don't keep the button disabled for 7 seconds
      setTimeout(() => {
        setisDisabled(false);
      }, 700);
    }
  };

  // =========================
  // VERIFY OTP
  // =========================

  const handleCheckOtp = async (e) => {
    e.preventDefault();

    setError("");
    setSuccessMsg("");

    const cleanOtp = otpInput.replace(/\D/g, "");
    const cleanEmail = identifier.trim().toLowerCase();
    const cleanNumber = number.replace(/\D/g, "");

    // =========================
    // VALIDATION
    // =========================

    if (!cleanOtp) {
      setError("Please enter the OTP.");
      return;
    }

    if (!/^\d{6}$/.test(cleanOtp)) {
      setError("OTP must be exactly 6 digits.");
      return;
    }

    try {
      setLoading(true);
      setisDisabled(true);

      const response = await fetch(
        "/api/auth/verify-otp",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            email: cleanEmail,
            number: cleanNumber,
            otp: cleanOtp,
          }),
        }
      );

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "Invalid server response. Please try again."
        );
      }

      console.log("VERIFY RESPONSE:", data);

      // =========================
      // BACKEND ERROR
      // =========================

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            data.error ||
            "Invalid or expired OTP."
        );
      }

      // =========================
      // SUCCESS
      // =========================

      setSuccessMsg(
        data.message ||
          "OTP verified successfully. Redirecting..."
      );

      const token = data.token;

      // =========================
      // EXISTING USER ROUTING
      // =========================

      if (token?.isLoggedIn) {
        if (token.isProfileFullyUpdated) {
          router.push("/testroute");
          return;
        }

        if (token.isPhotoUploaded) {
          router.push("/intrestpage");
          return;
        }

        if (token.isFirstPhaseCompleted) {
          router.push("/testimage");
          return;
        }
      }

      // =========================
      // NEW / INCOMPLETE PROFILE
      // =========================

      router.push("/completeProfile");

    } catch (err) {
      console.error(
        "OTP VERIFICATION ERROR:",
        err
      );

      setError(
        err?.message ||
          "Unable to verify OTP. Please try again."
      );
    } finally {
      setLoading(false);

      setTimeout(() => {
        setisDisabled(false);
      }, 700);
    }
  };

  // =========================
  // CHANGE NUMBER / EMAIL
  // =========================

  const handleChangeDetails = () => {
    setStep(1);

    setOtpInput("");

    setError("");

    setSuccessMsg("");
  };

  // =========================
  // RENDER
  // =========================

  return (
    <div className="w-full max-w-md">

      {/* ========================= */}
      {/* BRAND HEADER */}
      {/* ========================= */}

      <div className="mb-6 text-center">

        <div className="flex items-center justify-center gap-2">

          <h1 className="font-serif text-3xl font-bold text-[#741337]">
            Login with Email
          </h1>

          <Sparkles
            size={17}
            className="text-[#ed7137]"
          />

        </div>

        <p className="mt-2 text-sm text-[#24151a]/55">
          Ready for Garba again? Let&apos;s continue.
        </p>

      </div>


      {/* ========================= */}
      {/* CARD */}
      {/* ========================= */}

      <div className="w-full rounded-[1.5rem] border border-[#741337]/10 bg-white p-5 shadow-xl shadow-[#741337]/5 sm:p-6">

        {/* ========================= */}
        {/* ERROR MESSAGE */}
        {/* ========================= */}

        {error && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
          >

            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              !
            </div>

            <div className="min-w-0 flex-1">

              <p className="text-sm font-semibold text-red-700">
                Something went wrong
              </p>

              <p className="mt-0.5 text-xs leading-relaxed text-red-600">
                {error}
              </p>

            </div>

            <button
              type="button"
              onClick={() => setError("")}
              className="text-lg leading-none text-red-400 transition hover:text-red-600"
              aria-label="Close error"
            >
              ×
            </button>

          </div>
        )}


        {/* ========================= */}
        {/* SUCCESS MESSAGE */}
        {/* ========================= */}

        {successMsg && (
          <div
            role="status"
            aria-live="polite"
            className="mb-4 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3"
          >

            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
              ✓
            </div>

            <div>

              <p className="text-sm font-semibold text-green-700">
                Success
              </p>

              <p className="mt-0.5 text-xs leading-relaxed text-green-600">
                {successMsg}
              </p>

            </div>

          </div>
        )}


        {/* ========================= */}
        {/* STEP 1 */}
        {/* ========================= */}

        {step === 1 && (
          <form
            onSubmit={handlesubmit}
            className="space-y-4"
          >

            {/* EMAIL */}

            <div>

              <label
                htmlFor="login-email"
                className="mb-1.5 block text-sm font-medium text-[#24151a]"
              >
                Email
              </label>

              <div className="relative">

                <Mail
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#24151a]/35"
                />

                <input
                  id="login-email"
                  name="email"
                  type="email"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);

                    setError("");
                    setSuccessMsg("");
                  }}
                  placeholder="you@college.ac.in"
                  autoComplete="email"
                  className={`h-12 w-full rounded-xl border bg-[#fffaf2] pl-11 pr-4 text-sm text-[#24151a] outline-none transition placeholder:text-[#24151a]/30 ${
                    error
                      ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-400/10"
                      : "border-[#741337]/10 focus:border-[#ed7137] focus:ring-4 focus:ring-[#ed7137]/10"
                  }`}
                />

              </div>

            </div>


            {/* MOBILE NUMBER */}

            <div>

              <label
                htmlFor="login-number"
                className="mb-1.5 block text-sm font-medium text-[#24151a]"
              >
                Mobile Number
              </label>

              <div className="relative">

                <Phone
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#24151a]/35"
                />

                <input
                  id="login-number"
                  name="number"
                  type="tel"
                  inputMode="numeric"
                  value={number}
                  maxLength={10}
                  onChange={(e) => {
                    const value =
                      e.target.value.replace(
                        /\D/g,
                        ""
                      );

                    setnumber(value);

                    setError("");
                    setSuccessMsg("");
                  }}
                  placeholder="9876543210"
                  autoComplete="tel"
                  className="h-12 w-full rounded-xl border border-[#741337]/10 bg-[#fffaf2] pl-11 pr-4 text-sm text-[#24151a] outline-none transition placeholder:text-[#24151a]/30 focus:border-[#ed7137] focus:ring-4 focus:ring-[#ed7137]/10"
                />

              </div>

              <p className="mt-1.5 text-[11px] text-[#24151a]/45">
                Enter your registered mobile number.
              </p>

            </div>


            {/* REMEMBER ME */}

            <label className="flex cursor-pointer items-center gap-3 pt-0.5 text-xs text-[#24151a]/60">

              <input
                type="checkbox"
                className="h-4 w-4 rounded border-[#741337]/20 accent-[#741337]"
              />

              Keep me signed in

            </label>


            {/* SEND OTP */}

            <button
              type="submit"
              disabled={
                isDisabled ||
                loadinglog ||
                !identifier.trim() ||
                number.length !== 10
              }
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#741337] font-medium text-white shadow-lg shadow-[#741337]/15 transition hover:bg-[#5d0e2b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loadinglog ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  Sending OTP...
                </>
              ) : (
                <>
                  Login to RaasMitra

                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </>
              )}

            </button>

          </form>
        )}


        {/* ========================= */}
        {/* STEP 2 - OTP */}
        {/* ========================= */}

        {step === 2 && (
          <form onSubmit={handleCheckOtp}>

            <div className="text-center">

              <p className="text-sm text-[#24151a]/55">
                We sent a verification code to
              </p>

              <p className="mt-1 text-sm font-semibold text-[#741337]">
                {identifier}
              </p>

              <p className="text-sm font-semibold text-[#741337]">
                +91 {number}
              </p>

              <button
                type="button"
                onClick={handleChangeDetails}
                className="mt-2 text-xs font-semibold text-[#ed7137] hover:underline"
              >
                Change email / number
              </button>

            </div>


            {/* OTP */}

            <div className="mt-5">

              <label
                htmlFor="login-otp"
                className="mb-1.5 block text-sm font-medium text-[#24151a]"
              >
                Enter OTP
              </label>

              <div className="relative">

                <LockKeyhole
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#24151a]/35"
                />

                <input
                  id="login-otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => {
                    const value =
                      e.target.value.replace(
                        /\D/g,
                        ""
                      );

                    setOtpInput(value);

                    setError("");
                  }}
                  placeholder="Enter 6-digit OTP"
                  autoComplete="one-time-code"
                  autoFocus
                  className="h-12 w-full rounded-xl border border-[#741337]/10 bg-[#fffaf2] pl-11 pr-4 text-center text-lg font-semibold tracking-[0.35em] text-[#24151a] outline-none transition placeholder:text-[#24151a]/30 focus:border-[#ed7137] focus:ring-4 focus:ring-[#ed7137]/10"
                />

              </div>

            </div>


            {/* VERIFY BUTTON */}

            <button
              disabled={
                isDisabled ||
                loading ||
                otpInput.length !== 6
              }
              type="submit"
              className="group mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#741337] font-medium text-white shadow-lg shadow-[#741337]/15 transition hover:bg-[#5d0e2b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  Verifying...
                </>
              ) : (
                <>
                  Verify OTP

                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </>
              )}

            </button>


            {/* RESEND */}

            <button
              type="button"
              disabled={loadinglog || loading}
              onClick={handlesubmit}
              className="mt-4 w-full text-center text-xs font-semibold text-[#741337] transition hover:text-[#ed7137] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Resend OTP
            </button>

          </form>
        )}


        {/* ========================= */}
        {/* GOOGLE */}
        {/* ========================= */}

        <div className="flex w-full justify-center pt-4">
          {/* <Googlelogin /> */}
        </div>


        {/* ========================= */}
        {/* TRUST MESSAGE */}
        {/* ========================= */}

        {/* <div className="mt-4 flex items-start gap-3 rounded-xl bg-[#fffaf2] p-3.5">

          <ShieldCheck
            size={17}
            className="mt-0.5 shrink-0 text-[#ed7137]"
          />

          <p className="text-xs leading-relaxed text-[#24151a]/55">
            Your college enrollment helps keep RaasMitra
            a genuine student community.
          </p>

        </div> */}


        {/* ========================= */}
        {/* REGISTER */}
        {/* ========================= */}

        <div className="mt-5 text-center">

          
          <Link
            href="/register"
            className="mt-1 inline-block text-sm font-semibold text-[#741337] transition hover:text-[#ed7137]"
          >
            
          </Link>

        </div>

      </div>

    </div>
  );
}