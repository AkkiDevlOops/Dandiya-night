"use client";
import LoginForm from "@/components/Loginform";
import RegisterForm from "@/components/registerform";
import { useState } from "react";


export default function LoginPage() {
    const [login,islogin] = useState(true);
  return (
    <>
    <div className="h-50">
    <main className=" bg-[#fffaf2]">

      <div className="grid lg:grid-cols-2">

        {/* LEFT IMAGE SECTION */}
        <div className="relative  bg-[#4a0b22] lg:block">

          <img
            src="/left-page.jpeg"
            alt="Students enjoying Garba"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#4a0b22] via-[#741337]/30 to-transparent" />

          {/* CONTENT */}
          <div className="absolute bottom-14 left-12 max-w-md text-white">

            <p className="text-sm uppercase tracking-[0.25em] text-[#ffd98a]">
              Navratri • Campus • Community
            </p>

            <h2 className="mt-4 font-serif text-5xl font-bold leading-tight">
              Same beats.
              <br />
              New friends.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-white/70">
              Find someone from your campus who
              wants to enjoy Garba with you.
            </p>

          </div>

        </div>


        {/* LOGIN SECTION */}
        <div className="flex flex-col scroll  items-center justify-center px-5 py-12 sm:px-8">
            {login?(
                <div>
                <RegisterForm/>
                <div className="mt-6 border-t border-[#741337]/10 pt-5 text-center">

          <p className="text-sm text-[#24151a]/50">
            Already have an account?
          </p>

          <a
            onClick={()=>{islogin(false)}}
            className="mt-1 inline-block text-sm font-semibold text-[#741337] hover:text-[#ed7137]"
          >
            Login to RaasMitra →
          </a>

        </div>
        </div>
            ):(
                  <div>
        <LoginForm/>
         <div className="mt-7 border-t border-[#741337]/10 pt-6 text-center">

          <p className="text-sm text-[#24151a]/50">
            
          </p>

          <a
            onClick={()=>{islogin(true)}}
            className="mt-1 inline-block text-sm font-semibold text-[#741337] transition hover:text-[#ed7137]"
          >
            Login with email
          </a>

        </div>
        </div>
            )}
          
         {/* Login from */}
        </div>

      </div>

    </main>
    </div>
    </>
  );
}