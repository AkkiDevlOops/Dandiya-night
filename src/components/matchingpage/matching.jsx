import React from "react";
import Image from "next/image";

export default function RaasMitraProfile() {
  return (
    <div className=" flex justify-center">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-[412px] scroll-auto   sm:rounded-[40px] mt-3 mb-2 bg-[#fdfbf7] flex flex-col overflow-hidden shadow-2xl relative">
        
        {/* Long Scrollable Div */}
        <div className="flex-1 md:mb-25 mb-40 overflow-y-auto p-5 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#4a1525]/20 [&::-webkit-scrollbar-thumb]:rounded-full">
          
          {/* App Heading & More Options */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-extrabold text-[#4a1525] tracking-tight">
              Raas Mitra
            </h1>
            <button className="text-[#4a1525] text-xl font-bold tracking-widest p-1">
              •••
            </button>
          </div>

          {/* Profile Card Section */}
          <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-[#eae5de] mb-5">
            
            {/* Person's Name */}
            <div className="px-5 pt-5 pb-3 text-[22px] font-bold text-gray-900">
              Aanya, 24
            </div>

            {/* Image Div with Floating Round Button */}
            <div className="relative w-full h-[420px] bg-gray-200">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                alt="Profile picture of Aanya"
                fill
                priority
                className="object-cover"
              />

              {/* Round Button at Right Bottom of Image */}
              <button 
                aria-label="Like profile" 
                className="absolute bottom-4 right-4 w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <svg className="w-6 h-6 text-[#4a1525] fill-[#4a1525]/10" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Light HR Line */}
            <hr className="border-t border-[#eae5de] my-0" />

            {/* Bio / Prompt Section Inside Card */}
            <div className="p-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                My simple pleasure
              </p>
              <p className="text-2xl font-bold text-gray-900 leading-snug tracking-tight">
                Chai on a rainy balcony with old Bollywood records playing.
              </p>
            </div>

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
      </div>
    </div>
  );
}
