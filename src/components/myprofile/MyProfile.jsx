"use client";

import {
  ArrowLeft,
  ChevronRight,
  CircleHelp,
  LogOut,
  Pencil,
  Settings,
} from "lucide-react";

import Background from "@/components/matchingpage/backgroundblur";

export default function MyProfile() {
  const user = {
    name: "Aarav Patel",
    year: "2nd Year",
    branch: "Computer Engineering",
    intro: "Garba is better with good company!",
    connections: 12,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  };

  return (
    <main className="h-dvh overflow-hidden bg-[#fffaf2]">
        <div className="inset-0 z-10 fixed">
          <Background />
        </div>

      <div className="mx-auto flex h-full w-full bg-white inset-0 z-50 fixed max-w-[500px] flex-col px-4 py-3 sm:px-6">

        {/* ================= HEADER ================= */}

        <div className="flex shrink-0 items-center justify-between">

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#741337] hover:bg-[#fff0df]"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="font-serif text-xl font-bold text-[#24151a]">
            My Profile
          </h1>

          <div className="w-9" />

        </div>


        {/* ================= PROFILE CARD ================= */}

        <div className="mt-3 shrink-0 rounded-[24px] border border-[#741337]/10 bg-white px-5 py-4 text-center shadow-sm">

          {/* IMAGE */}

          <div className="relative mx-auto mb-2 h-[88px] w-[88px]">

            <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-full bg-[#fff0df]" />

            <img
              src={user.image}
              alt={user.name}
              className="relative h-full w-full rounded-full border-[3px] border-white object-cover shadow"
            />

          </div>


          {/* NAME */}

          <h2 className="font-serif text-[23px] font-bold leading-tight text-[#741337]">
            {user.name}
          </h2>


          {/* DETAILS */}

          <p className="mt-0.5 text-xs text-[#24151a]/55">
            {user.year}
            <span className="mx-1.5 text-[#ed7137]">
              •
            </span>
            {user.branch}
          </p>


          {/* INTRO */}

          <div className="mx-auto mt-2.5 max-w-[330px] rounded-xl bg-[#fffaf2] px-3 py-2">

            <p className="text-xs italic text-[#24151a]/65">
              "{user.intro}"
            </p>

          </div>

        </div>


        {/* ================= CONNECTIONS ================= */}

        <div className="mt-3 flex shrink-0 items-center justify-between rounded-2xl border border-[#741337]/10 bg-white px-4 py-3 shadow-sm">

          <div>

            <p className="text-xs font-semibold text-[#24151a]">
              Your Connections
            </p>

            <p className="text-[11px] text-[#24151a]/40">
              People you've connected with
            </p>

          </div>

          <div className="flex h-9 min-w-[45px] items-center justify-center rounded-xl bg-[#fff0df]">

            <span className="text-base font-bold text-[#741337]">
              {user.connections}
            </span>

          </div>

        </div>


        {/* ================= MENU ================= */}

        <div className="mt-3 shrink-0 overflow-hidden rounded-[20px] border border-[#741337]/10 bg-white shadow-sm">

          {/* EDIT PROFILE */}

          <button
            type="button"
            className="group flex h-[58px] w-full items-center gap-3 border-b border-[#741337]/8 px-4 text-left hover:bg-[#fffaf2]"
          >

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fff0df]">
              <Pencil
                size={15}
                className="text-[#741337]"
              />
            </div>

            <div className="flex-1">

              <p className="text-xs font-medium text-[#24151a]">
                Edit Profile
              </p>

              <p className="text-[9px] text-[#24151a]/40">
                Photos, interests & Garba vibe
              </p>

            </div>

            <ChevronRight
              size={17}
              className="text-[#24151a]/25"
            />

          </button>


          {/* SETTINGS */}

          <button
            type="button"
            className="group flex h-[58px] w-full items-center gap-3 border-b border-[#741337]/8 px-4 text-left hover:bg-[#fffaf2]"
          >

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fff0df]">
              <Settings
                size={15}
                className="text-[#741337]"
              />
            </div>

            <div className="flex-1">

              <p className="text-xs font-medium text-[#24151a]">
                Settings
              </p>

              <p className="text-[9px] text-[#24151a]/40">
                Account information & preferences
              </p>

            </div>

            <ChevronRight
              size={17}
              className="text-[#24151a]/25"
            />

          </button>


          {/* HELP */}

          <button
            type="button"
            className="group flex h-[58px] w-full items-center gap-3 px-4 text-left hover:bg-[#fffaf2]"
          >

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fff0df]">
              <CircleHelp
                size={15}
                className="text-[#741337]"
              />
            </div>

            <div className="flex-1">

              <p className="text-xs font-medium text-[#24151a]">
                Help & Support
              </p>

              <p className="text-[9px] text-[#24151a]/40">
                Need help with RaasMitra?
              </p>

            </div>

            <ChevronRight
              size={17}
              className="text-[#24151a]/25"
            />

          </button>

        </div>


        {/* ================= LOGOUT ================= */}

        <button
          type="button"
          className="mt-3 flex h-[48px] shrink-0 items-center justify-center gap-2 rounded-2xl border border-red-100 bg-white text-xs font-semibold text-[#b3263e] shadow-sm hover:bg-red-50"
        >

          <LogOut size={15} />

          Logout

        </button>


        {/* ================= FOOTER ================= */}

        <p className="mt-auto shrink-0 pb-1 pt-2 text-center text-[9px] text-[#24151a]/30">
          Made for the Garba community ✨
        </p>

      </div>

    </main>
  );
}