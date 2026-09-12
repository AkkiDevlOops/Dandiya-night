"use client";

import { useState } from "react";

export default function ImageSlider() {
  const [slid, setSlid] = useState(null);

  const handleClick = (index) => {
    setSlid(index);
  };

  return (
    <div onClick={()=>handleClick(0)} className="flex min-h-screen items-center justify-center gap-8 overflow-hidden bg-black p-10">

      {/* First Div */}
      <div
        
        className={`
          min-h-screen w-80 cursor-pointer overflow-hidden rounded-2xl
          transition-transform duration-700 ease-in-out
          ${slid === 0 ? "-translate-x-[120vw]" : "translate-x-0"}
        `}
      >
        <img
          src="/girl-hand-bg.png"
          alt="Image 1"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Second Div */}
      <div
      
        className={`
          h-min-screen w-80 cursor-pointer overflow-hidden rounded-2xl
          transition-transform duration-700 ease-in-out
          ${slid === 1 ? "-translate-x-[120vw]" : "translate-x-0"}
        `}
      >
        <img
          src="/boy-hand-bg.png"
          alt="Image 2"
          className="h-full w-full object-cover"
        />
      </div>

    </div>
  );
}

