"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Googlelogin from "@/components/googlelogin"
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
    
    const formData = useRef({
        enrollmentNo:"",
        password:"",
     })

     const [showPassword, setShowPassword] = useState('')
    
  const handlesubmit = async(e)=>{
    e.preventDefault()
    const response = await fetch("/api/auth/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(
            formData
        )
    });
    const data = await response.json()
    
    console.log(data);
    
   alert(data)
   }

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
          onSubmit={handlesubmit}
          className="space-y-5"
        >

          {/* ERROR */}
         


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
                
               onChange={(e)=>{
                    formData.current.enrollmentNo =e.target.value;
                }}
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
                
              onChange={(e)=>{
                    formData.current.password =e.target.value;
                }}
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
            
            className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#741337] font-medium text-white shadow-lg shadow-[#741337]/15 transition hover:bg-[#5d0e2b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >

           
             
          
              <>
                Login to RaasMitra

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </>
        

          </button>

        </form>
         <div className="w-full pt-3 flex justify-center">
                     <Googlelogin/>
                            </div>


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