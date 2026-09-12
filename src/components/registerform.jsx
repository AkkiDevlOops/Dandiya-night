"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

const colleges = [
  "Lakshmi Narain College of Technology",
  "Oriental College of Technology",
  "Technocrats Institute of Technology",
  "Other",
];

export default function RegisterForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [agree, setAgree] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };


  const validateForm = () => {

    if (!formData.name.trim()) {
      return "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      return "Please enter your college email.";
    }

    if (!formData.email.includes("@")) {
      return "Please enter a valid email.";
    }

    if (!formData.college) {
      return "Please select your college.";
    }

    if (!formData.password) {
      return "Please create a password.";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      return "Passwords do not match.";
    }

    if (!agree) {
      return "Please agree to the community guidelines.";
    }

    return null;
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {

      setLoading(true);

      /*
        Backend will be connected later.

        const response = await fetch(
          "/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
      */

      // Temporary simulation
      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      console.log(
        "Register Data:",
        formData
      );

      alert(
        "Registration UI is working!"
      );

    } catch (error) {

      setError(
        error.message ||
          "Something went wrong."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="w-full max-w-md">

      {/* HEADER */}
      <div className="mb-7 text-center">

        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0df] text-2xl">
          🪔
        </div>

        <div className="flex items-center justify-center gap-2">

          <h1 className="font-serif text-3xl font-bold text-[#741337]">
            Join the Garba Circle
          </h1>

          <Sparkles
            size={17}
            className="text-[#ed7137]"
          />

        </div>

        <p className="mt-2 text-sm text-[#24151a]/55">
          Create your account and find your
          campus Garba partner.
        </p>

      </div>


      {/* FORM CARD */}
      <div className="rounded-[2rem] border border-[#741337]/10 bg-white p-6 shadow-xl shadow-[#741337]/5 sm:p-8">

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* ERROR */}
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </div>
          )}


          {/* EMAIL */}
          <div>

            <label
              htmlFor="register-email"
              className="mb-2 block text-sm font-medium text-[#24151a]"
            >
              College Email
            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#24151a]/35"
              />

              <input
                id="register-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@college.ac.in"
                autoComplete="email"
                className="h-12 w-full rounded-xl border border-[#741337]/10 bg-[#fffaf2] pl-11 pr-4 text-sm outline-none transition placeholder:text-[#24151a]/30 focus:border-[#ed7137] focus:ring-4 focus:ring-[#ed7137]/10"
              />

            </div>

            <p className="mt-1.5 text-[13px] text-[#24151a]/40">
              Enter email registered on UIT RGPV website 
            </p>

          </div>


          


          {/* PASSWORD */}
          <div>

            <label
              htmlFor="register-password"
              className="mb-2 block text-sm font-medium text-[#24151a]"
            >
              Password
            </label>

            <div className="relative">

              <LockKeyhole
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#24151a]/35"
              />

              <input
                id="register-password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                autoComplete="new-password"
                className="h-12 w-full rounded-xl border border-[#741337]/10 bg-[#fffaf2] pl-11 pr-12 text-sm outline-none transition placeholder:text-[#24151a]/30 focus:border-[#ed7137] focus:ring-4 focus:ring-[#ed7137]/10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#24151a]/40 hover:bg-[#fff0df]"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>


          {/* CONFIRM PASSWORD */}
          <div>

            

            <div className="relative">


            
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#24151a]/40 hover:bg-[#fff0df]"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>


          {/* TERMS */}
          <label className="flex cursor-pointer items-start gap-3 pt-1">

            <input
              type="checkbox"
              checked={agree}
              onChange={(e) =>
                setAgree(e.target.checked)
              }
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#741337]"
            />

            <span className="text-xs leading-relaxed text-[#24151a]/55">
              I agree to keep RaasMitra
              respectful, safe and focused
              on Garba community.
            </span>

          </label>


          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="group mt-2 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#741337] font-medium text-white shadow-lg shadow-[#741337]/15 transition hover:bg-[#5d0e2b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >

            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                Creating account...
              </>
            ) : (
              <>
                Create Account

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </>
            )}

          </button>

            <div className="w-full flex justify-center">
            <a
            type="submit"
            disabled={loading}
            className="group mt-2 w-1/2 flex-col flex h-13  items-center justify-center gap-2 rounded-xl bg-[#2381ec] font-medium text-white shadow-lg shadow-[#741337]/15 transition hover:bg-[#5d0e2b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
          Google Login
          </a>
</div>
        </form>


        {/* VERIFIED MESSAGE */}
        <div className="mt-5 flex items-start gap-3 rounded-xl bg-[#fffaf2] p-4">

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fff0df]">
            <ShieldCheck
              size={17}
              className="text-[#ed7137]"
            />
          </div>

          <div>

            <p className="text-xs font-semibold text-[#741337]">
              College verified community
            </p>

            <p className="mt-1 text-[11px] leading-relaxed text-[#24151a]/50">
              We&apos;ll send a verification code
              to your college email.
            </p>

          </div>

        </div>


        

      </div>

    </div>
  );
}