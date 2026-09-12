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
} from "lucide-react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Basic validation
    if (!formData.email.trim()) {
      setError("Please enter your college email.");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      /*
        Backend API will be connected here later.

        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        window.location.href = "/discover";
      */

      // Temporary simulation
      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      console.log("Login Data:", formData);

      alert("Login UI is working!");

    } catch (error) {
      setError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">

      {/* BRAND ICON */}
      <div className="mb-7 text-center">

        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0df] text-2xl shadow-sm">
          🪔
        </div>

        <div className="flex items-center justify-center gap-2">

          <h1 className="font-serif text-3xl font-bold text-[#741337]">
            Welcome Back!
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


      {/* CARD */}
      <div className="rounded-[2rem] border border-[#741337]/10 bg-white p-6 shadow-xl shadow-[#741337]/5 sm:p-8">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
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
              htmlFor="login-email"
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
                id="login-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@college.ac.in"
                autoComplete="email"
                className="h-13 w-full rounded-xl border border-[#741337]/10 bg-[#fffaf2] pl-11 pr-4 text-sm text-[#24151a] outline-none transition placeholder:text-[#24151a]/30 focus:border-[#ed7137] focus:ring-4 focus:ring-[#ed7137]/10"
              />

            </div>

          </div>


          {/* PASSWORD */}
          <div>

            <div className="mb-2 flex items-center justify-between">

              <label
                htmlFor="login-password"
                className="text-sm font-medium text-[#24151a]"
              >
                Password
              </label>

              <Link
                href="#"
                className="text-xs font-semibold text-[#741337] hover:text-[#ed7137]"
              >
                Forgot password?
              </Link>

            </div>

            <div className="relative">

              <LockKeyhole
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#24151a]/35"
              />

              <input
                id="login-password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="h-13 w-full rounded-xl border border-[#741337]/10 bg-[#fffaf2] pl-11 pr-12 text-sm text-[#24151a] outline-none transition placeholder:text-[#24151a]/30 focus:border-[#ed7137] focus:ring-4 focus:ring-[#ed7137]/10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#24151a]/40 transition hover:bg-[#fff0df] hover:text-[#741337]"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>


          {/* REMEMBER ME */}
          <label className="flex cursor-pointer items-center gap-3 text-xs text-[#24151a]/60">

            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[#741337]/20 accent-[#741337]"
            />

            Keep me signed in

          </label>


          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#741337] font-medium text-white shadow-lg shadow-[#741337]/15 transition hover:bg-[#5d0e2b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >

            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                Logging in...
              </>
            ) : (
              <>
                Login to RaasMitra

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </>
            )}

          </button>

        </form>


        {/* VERIFIED MESSAGE */}
        <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#fffaf2] p-4">

          <ShieldCheck
            size={18}
            className="mt-0.5 shrink-0 text-[#ed7137]"
          />

          <p className="text-xs leading-relaxed text-[#24151a]/55">
            Your college email helps keep RaasMitra
            a genuine student community.
          </p>

        </div>


        {/* REGISTER */}
       

      </div>

    </div>
  );
}