"use client";

import { useEffect, useRef, useState } from "react";
import Googlelogin from '@/components/googlelogin'
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
import { useRouter } from 'next/navigation';


export default function RegisterForm() {

  const router = useRouter(); 

 const formData = useRef({
    enrollmentNo:"",
    email:"",
    password:"",
 })

 const[name,setname] = useState('');
 const[namediv,setnamedivopen] = useState(false);
const[error,seterror] = useState('');

 const handlesubmit = async(e)=>{
    e.preventDefault()
    const response = await fetch("/api/auth/signup",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(
            formData
        )
    });
    const data = await response.json()
    console.log(data)
    if(response.ok){
      if(data.message == 'Account created and logged in successfully!'){
        setTimeout(() => {
          router.push('/login')
        },2000);
        
      }

    }
    if(data.error){
      seterror(data.error);
      return;
    }
    setname(data.user.name);
    setnamedivopen(true);
    
 }

 useEffect(()=>{
//   const token = localStorage.getItem('token');
  
//   if (token) {
//   try {
//     // 1. Split the JWT parts (Header.Payload.Signature)
//     const base64Url = token.split('.')[1]; 
    
//     // 2. Adjust base64url format to standard base64 strings
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
//     // 3. Decode the base64 string back into JSON text
//     const jsonPayload = decodeURIComponent(
//       window.atob(base64)
//         .split('')
//         .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//         .join('')
//     );

//     // 4. Parse the plain text into an interactive object
//     const userData = JSON.parse(jsonPayload);
    
    
//   } catch (error) {
//     console.error("Failed to decode token:", error);
//   }
// }

  
 },[])

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
     onSubmit={handlesubmit}
          className="space-y-4"
        >

          {/* ERROR */}
       {namediv?(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
  <div className="bg-white border border-[#eae5de] shadow-2xl rounded-3xl w-full max-w-md p-6 flex flex-col items-center justify-center text-center transform transition-all animate-in fade-in zoom-in duration-200">
    <div className="w-12 h-12 rounded-full bg-[#4a1525]/10 flex items-center justify-center mb-4 text-[#4a1525]">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </div>
    
    <p className="text-gray-600 text-base font-medium mb-1">
      Got your name
    </p>
    
    <p className="text-2xl font-bold text-[#4a1525] tracking-tight mb-6">
      {name}
    </p>

    <div className="flex justify-center gap-3 w-full">
      
      <a><button  onClick={()=>{setnamedivopen(false), setTimeout(() => {
        router.push('/completeProfile')
      }, 2000); }} className="flex-1 py-3 px-4 rounded-xl bg-[#4a1525] text-white font-semibold hover:bg-[#3a101d] transition-colors shadow-md">
        Yes, that's me
      </button></a>
    </div>
    <p className="mt-2">If no, try signing in with google</p>
  </div>
</div>
        ):""}


        {/* enrollmentNo */}
         <div>
            <div className="w-full flex items-center justify-center">
          <p className="text-red-600 mb-3 ">{error}</p>
          
          </div>
            <label
             
              className="mb-2 block text-sm font-medium text-[#24151a]"
            >
              Enrollment Number
            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#24151a]/35"
              />

              <input
                id="register-email"
                name="enrollmentNo"
                
                onChange={(e)=>{
                    formData.current.enrollmentNo =e.target.value;
                }}
                placeholder="you@college.ac.in"
                autoComplete="email"
                className="h-12 w-full rounded-xl text-black border border-[#741337]/10 bg-[#fffaf2] pl-11 pr-4 text-sm outline-none transition placeholder:text-[#24151a]/30 focus:border-[#ed7137] focus:ring-4 focus:ring-[#ed7137]/10"
              />

            </div>

          </div>


          {/* EMAIL */}
          <div>
           
            <label
             
              className="mb-2 block text-sm font-medium text-[#24151a]"
            >
              Email 
                          </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#24151a]/35"
              />

              <input
                id="register-email"
                name="email"
                
                onChange={(e)=>{
                    formData.current.email =e.target.value;
                }}
                placeholder="you@college.ac.in"
                autoComplete="email"
                className="h-12 w-full rounded-xl text-black border border-[#741337]/10 bg-[#fffaf2] pl-11 pr-4 text-sm outline-none transition placeholder:text-[#24151a]/30 focus:border-[#ed7137] focus:ring-4 focus:ring-[#ed7137]/10"
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
               onChange={(e)=>{
                    formData.current.password = e.target.value;
                }}
               
                placeholder="Create a password"
                autoComplete="new-password"
                className="h-12 w-full text-black rounded-xl border border-[#741337]/10 bg-[#fffaf2] pl-11 pr-12 text-sm outline-none transition placeholder:text-[#24151a]/30 focus:border-[#ed7137] focus:ring-4 focus:ring-[#ed7137]/10"
              />

              <button
                type="button"
               
               
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#24151a]/40 hover:bg-[#fff0df]"
              >
                
              </button>

            </div>

          </div>


          {/* CONFIRM PASSWORD */}
          <div>

            

            <div className="relative">


            
         

            </div>

          </div>


          {/* TERMS */}
          <label className="flex cursor-pointer items-start gap-3 pt-1">

            <input
              type="checkbox"
              required
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
            
            className="group mt-2 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#741337] font-medium text-white shadow-lg shadow-[#741337]/15 transition hover:bg-[#5d0e2b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >

           
              <>
                Create Account

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