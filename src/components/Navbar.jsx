"use client";

import { useState } from "react";
import { Home, PlaySquare, Send, Search, CircleUserRound } from "lucide-react";

const NAV_ITEMS = [
  { id: "home", icon: Home },
  { id: "reels", icon: PlaySquare },
  { id: "explore", icon: Send },
  { id: "search", icon: Search },
  { id: "profile", icon: CircleUserRound },
];

export default function FloatingNavbar() {
  const [active, setActive] = useState("home");

  return (
    <div className=" flex justify-center">
      <nav
        className="flex gap-2 justify-between  md:w-sm items-center rounded-full border border-white/10 bg-gradient-to-b from-neutral-800 to-neutral-950 px-3 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
      >
        {NAV_ITEMS.map(({ id, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              aria-label={id}
              aria-current={isActive ? "page" : undefined}
              className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200
                ${isActive
                  ? "bg-white text-black shadow-[0_0_16px_rgba(255,255,255,0.35)]"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
            >
              <Icon
                size={22}
                strokeWidth={1.8}
                fill={isActive && id === "reels" ? "currentColor" : "none"}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
}