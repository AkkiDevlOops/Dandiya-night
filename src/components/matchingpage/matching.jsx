"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from '@/components/Navbar'
import { useAuth } from "@/lib/gettoken";

export default function RaasMitraProfile() {

    const {user} = useAuth();
    
   const [profiles, setProfiles] = useState([]);

 

 useEffect(()=>{
  const getprofile = async()=>{
    try{
   const response = await fetch("api/getprofiles");
  const data = await response.json();
  // const data2 = JSON.parse(data.users);
  console.log(data.users);
  if(response.ok){
   setProfiles(data.users);
  }
}    catch (err) {
        console.error(err);
        setError("Could not connect to the profile directory server.");
      } }
      getprofile()
      // console.log(user)      
   },[]);
  


  return (
    <div className="flex justify-center">
  {/* Mobile Frame Container */}
  <div className="w-full max-w-[412px] mb-4 scroll-auto sm:rounded-[40px] mt-3 bg-[#fdfbf7] flex flex-col overflow-hidden shadow-2xl relative">
    
    {/* Long Scrollable Div */}
    <div className="h-140 overflow-y-auto space-y-3 pr-4 pl-6 scroll-smooth  [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#4a1525]/20 [&::-webkit-scrollbar-thumb]:rounded-full">
      
      {/* App Heading & More Options */}
      <div >
        <h1 className="text-2xl font-extrabold text-[#4a1525] tracking-tight">
          Raas Mitra
        </h1>
        <button className="text-[#4a1525] text-xl font-bold tracking-widest p-1">
          •••
        </button>
      </div>

      {/* 🚀 STACK CONTAINER START */}
      {/* Set a fixed height so absolute positioned cards have a bounding box layout */}
      <div className="relative h-[600px] w-full mb-5">
        {profiles.map((profile, idx) => {
          // Limit stack to only show the top 3 profiles to prevent UI cluster mess
          if (idx > 2) return null;

          // 📐 Math offsets for the 3D layered stack effect:
          // Top card (idx 0): translate-x-0, translate-y-0
          // Second card (idx 1): moved right by 12px, moved up/offset slightly by -12px
          // Third card (idx 2): moved right by 24px, moved up/offset slightly by -24px
          const offsetRight = idx * 12;
          const offsetTop = idx * 12;
          
          // Reverse Z-Index sequence so the first array item (idx: 0) always sits on the absolute top layer
          const layerDepth = 30 - idx;

          return (
            <div
              key={profile._id || idx}
              style={{
                transform: `translate(${offsetRight}px, -${offsetTop}px)`,
                zIndex: layerDepth,
              }}
              // Width calculations take away the right translate padding space to avoid frame overflow bounds
              className="absolute left-0 bottom-0 w-[calc(100%-24px)] bg-white rounded-[24px] overflow-hidden shadow-md border border-[#eae5de] transition-all duration-300"
            >
              
              {/* Person's Name */}
              <div className="px-5 pt-3 pb-3 text-[22px] font-bold text-gray-900">
                {profile.username || 'Aanya'}, {profile.age || 24}
              </div>

              {/* Image Div with Floating Round Button */}
              <div className="relative w-full h-[400px] bg-gray-200">
               
                <img
                  src={profile.images?.[0] || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"}
                  alt={`Profile picture of ${profile.username || 'Aanya'}`}
                  className="w-full h-full object-cover"
                />

                {/* Only render interactive controls like click triggers on the active topmost card (idx === 0) */}
                {idx === 0 && (
                  <button 
                    aria-label="Like profile" 
                    className="absolute bottom-4 right-4 w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-lg transition-transform hover:scale-105 active:scale-95 z-40"
                  >
                    <img src="/dandiya.png" alt="like action" />
                  </button>
                )}
              </div>

              {/* Light HR Line */}
              <hr className="border-t border-[#eae5de] my-0" />

              {/* Bio / Prompt Section Inside Card */}
              <div className="p-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  My simple pleasure
                </p>
                <p className="text-lg font-bold text-gray-900 leading-snug tracking-tight truncate">
                  {profile.bio || "Chai on a rainy balcony with old Bollywood records."}
                </p>
              </div>

              {/* Secondary Bio Prompt Section */}
      <div className="bg-white rounded-[24px] p-6 mb-5 shadow-sm border border-[#eae5de]">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          I'm weirdly attracted to
        </p>
        <p className="text-2xl font-bold text-gray-900 leading-snug tracking-tight">
          People who can passionately talk about history or ancient architecture for hours.
        </p>
      </div>

            </div>
          );
        })}
      </div>
      {/* 🚀 STACK CONTAINER END */}

      
      

      {/* Interests Section */}
      <div className="bg-white rounded-[24px] p-6 mb-5 shadow-sm border border-[#eae5de]">
        <h2 className="text-base font-bold text-gray-900 mb-4">
          Interests
        </h2>
        <div className="flex flex-wrap gap-2">
          {["Classical Dance", "Indie Music", "Poetry", "Museums", "Hiking", "Chai Lover"].map((interest, index) => (
            <span 
              key={index} 
              className="bg-[#f7f3ed] text-[#4a1525] px-4 py-2 rounded-full text-sm font-medium border border-[#4a1525]/10"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

    </div>

    <div className="mb-3 mt-0">
      <Navbar />
    </div>

  </div>
</div>

  );
}
