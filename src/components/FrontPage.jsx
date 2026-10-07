

// src/components/FrontPage.jsx

"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, HeartHandshake } from "lucide-react";

const FrontPage = () => {
  return (
    <main className="h-dvh w-full overflow-hidden bg-[#111015] text-white">
    
      <div className="relative h-full w-full">

        {/* ================= BACKGROUND IMAGE ================= */}
        <div
          className="absolute inset-0 bg-cover bg-center h-full w-full bg-no-repeat"
          style={{
             backgroundImage:"url('/garba-bg.jpg')" ,
          }}
        />

        {/* Dark overlay */}
        <div className="absolute h-full w-full  inset-0 bg-[#0d0b10]/55" />

        {/* Left dark gradient for text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b10]/95 via-[#0d0b10]/65 to-[#0d0b10]/20" />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0d0b10]/95 to-transparent" />

        {/* ================= NAVBAR ================= */}
        <nav className="relative z-30 h-[76px] w-full">
          <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5"
            >
              <div className="flex h-9 w-9 items-center justify-center text-2xl">
                🪔
              </div>

              <span className="font-serif text-xl font-semibold tracking-tight sm:text-2xl">
                RaasMitra
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-8 md:flex">
              <Link
                href="/"
                className="text-sm font-medium text-white transition hover:text-[#f5c982]"
              >
               
              </Link>

              <Link
                href="/LoginRegister"
                className="text-sm font-medium text-white transition hover:text-[#f5c982]"
              >
              </Link>

              <Link
                href="/LoginRegister"
                className="rounded-full bg-[#f4d09b] px-7 py-3 text-sm font-bold text-[#171419] transition hover:bg-[#ffdda9]"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Nav */}
            <div className="flex items-center gap-2 md:hidden">
              <Link
                href="/LoginRegister"
                className="rounded-full border border-white/40 bg-black/20 px-4 py-2 text-xs font-semibold backdrop-blur-sm"
              >
                Login
              </Link>

              <Link
                href="/LoginRegister"
                className="rounded-full bg-[#f4d09b] px-4 py-2 text-xs font-bold text-[#171419]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        {/* ================= HERO ================= */}
        <section className="relative z-10 flex h-[calc(100%-76px)] items-center">
          <div className="mx-auto flex h-full w-full max-w-[1400px] items-center px-5 pb-28 sm:px-8 sm:pb-24 lg:px-12 lg:pb-20">

            <div className="max-w-[680px]">
              {/* <div className="mt-6 sm:mt-8">
                <Link
                  href="/LoginRegister"
                  className="group inline-flex items-center  gap-3 rounded-full bg-[#f3bd78] px-7 py-3.5 text-sm font-bold text-[#20171a] shadow-xl transition hover:scale-[1.02] hover:bg-[#ffd08f] sm:px-8 sm:py-4"
                >
                  Get Started

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </div> */}

              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/95 px-3.5 py-1.5 text-xs font-bold text-[#171419] sm:mb-5 sm:text-sm">
                <span className="text-[#bd3856]">✦</span>
                ONLY FOR COLLEGE STUDENTS
              </div>

              {/* Heading */}
              <h1 className="font-serif text-[48px] font-bold leading-[0.91] tracking-[-2px] sm:text-[64px] sm:tracking-[-3px] md:text-[76px] lg:text-[88px]">

                <span className="text-white">
                  Find Your
                </span>

                <br />

                <span className="text-[#c93658]">
                  Garba
                </span>

                <br />

                <span className="text-[#f5d39d]">
                  Partner
                </span>
              </h1>

              {/* Description */}
              <p className="mt-5 max-w-[560px] text-sm leading-6 text-white/85 sm:mt-6 sm:text-base md:text-lg">
                Same campus. Same beats. New friends.
                <br className="hidden sm:block" />
                Let&apos;s make this Navratri unforgettable — together!
              </p>

              {/* CTA */}
              

            </div>
          </div>
        </section>

        {/* ================= TAGLINE ================= */}
        {/* <div className="absolute left-50 z-20 rotate-[-5deg] font-serif text-lg italic leading-5 text-white/75 sm:bottom-[108px] sm:left-8 sm:text-xl lg:left-12">
          Good
          <br />
          People.
          <br />
          Great Garba!
          <span className="ml-1">♡</span>
        </div> */}

        {/* ================= FOOTER STATS ================= */}
        <footer className="absolute bottom-0 left-0 z-20 w-full">
          <div className="mx-auto max-w-[1400px] px-5 pb-3 sm:px-8 lg:px-12">

            <div className="grid grid-cols-3 border-t border-white/25 pt-2 sm:pt-3 md:grid-cols-4">

              {/* 100+ Students */} 
               <div className="flex items-center gap-2 border-white/20 px-2 py-2 md:border-r">
                <Users
                  size={18}
                  className="shrink-0 text-[#f5d39d]"
                />

                <div>
                  <p className="text-[11px] font-bold sm:text-sm">
                     Students
                  </p>
                  <p className="text-[9px] text-white/60 sm:text-[11px]">
                    College community
                  </p>
                </div>
              </div>

              {/* Verified */}
              <div className="flex items-center col-span-1 gap-2 border-white/20 px-2 py-2 md:border-r md:pl-5">
                <ShieldCheck
                  size={18}
                  className="shrink-0 text-[#f5d39d]"
                />

                <div>
                  <p className="text-[11px] font-bold sm:text-sm">
                    Verified
                  </p>
                  <p className="text-[9px] text-white/60 sm:text-[11px]">
                    Community
                  </p>
                </div>
              </div>

              {/* Safe */}
              <div className="flex items-center col-span-1 gap-2 border-white/20 px-2 py-2 md:border-r md:pl-5">
                <ShieldCheck
                  size={18}
                  className="shrink-0 text-[#f5d39d]"
                />

                <div>
                  <p className="text-[11px] font-bold sm:text-sm">
                    Safe & Respectful
                  </p>
                  <p className="text-[9px] text-white/60 sm:text-[11px]">
                    Community first
                  </p>
                </div>
              </div>

              {/* Garba Focused */}
              <div className="flex col-span-1 items-center gap-2 px-2 py-2 md:pl-5">
                <HeartHandshake
                  size={18}
                  className="shrink-0 text-[#f5d39d]"
                />

                <div>
                  <p className="text-[11px] font-bold sm:text-sm">
                    Garba Focused
                  </p>
                  <p className="text-[9px] text-white/60 sm:text-[11px]">
                    Made for Navratri
                  </p>
                </div>
              </div>

            </div>
          </div>
        </footer>

      </div>
    </main>
  );
};

export default FrontPage;