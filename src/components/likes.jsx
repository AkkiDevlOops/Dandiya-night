import React from "react";
import Image from "next/image";
import { FiPlus, FiMusic, FiHeart, FiMessageCircle, FiChevronRight } from "react-icons/fi";
import Background from "@/components/matchingpage/backgroundblur"
import Navbar from '@/components/Navbar'

export default function RaasMitraLikesView() {
  const likesData = [
    {
      id: 1,
      name: "Ananya",
      age: 24,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      text: "Liked your photo: 'Chai on a rainy balcony...'",
      time: "2h ago",
    },
    {
      id: 2,
      name: "Priya",
      age: 23,
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      text: "Liked your prompt response about history.",
      time: "5h ago",
    },
    {
      id: 3,
      name: "Meera",
      age: 25,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      text: "Liked your song: 'Kehna Hi Kya - Bombay Theme'",
      time: "1d ago",
    },
    {
      id: 4,
      name: "Rhea",
      age: 22,
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
      text: "Liked your photo at the museum.",
      time: "2d ago",
    }
  ];

  return (
    <div className=" flex  flex-col  justify-center items-center min-h-screen">
        <div className="fixed min-h-screen inset-0 z-10">
        <Background/>
        </div>
      {/* Mobile Frame Container */}
      <div className="w-full max-w-[412px] pb-2 inset-0 z-50 min-h-screen sm:h-[100vh] sm:rounded-[40px] bg-[#fdfbf7] flex flex-col overflow-hidden shadow-2xl relative">
        
        {/* Top Header / App Title */}
        <div className="px-5 pt-5 pb-2 flex justify-between items-center bg-[#fdfbf7]">
          
          <div className="flex items-center flex-row-reverse w-full gap-2 rounded-full">
            <div className=" bg-[#4a1525]/10 flex rounded-2xl px-3 py-1.5">
            <FiHeart className="text-[#4a1525]  fill-[#4a1525]" size={16} />
            <span className="text-xs ml-auto  font-bold text-[#4a1525]">14 Likes</span>
            </div>
          </div>
        </div>

        {/* Top 1/4 Section: Stories and Songs Upload / Shortcuts */}
        <div className="h-[24%] min-h-[150px] px-5  border-b border-[#eae5de] flex flex-col justify-center bg-[#fdfbf7]">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Share Your Vibe
          </p>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
            
            {/* Add Story Button */}
            <div className="flex flex-col items-center flex-shrink-0 cursor-pointer group">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#4a1525]/40 flex items-center justify-center bg-white group-hover:border-[#4a1525] transition-colors">
                <FiPlus className="text-[#4a1525]" size={22} />
              </div>
              <span className="text-[11px] font-medium text-gray-700 mt-1.5">Add Story</span>
            </div>

            {/* Add Song Button */}
            <div className="flex flex-col items-center flex-shrink-0 cursor-pointer group">
              <div className="w-14 h-14 rounded-full bg-[#4a1525] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <FiMusic className="text-white" size={20} />
              </div>
              <span className="text-[11px] font-medium text-gray-700 mt-1.5">Add Song</span>
            </div>

            {/* Active Story Preview Mock */}
            <div className="flex flex-col items-center flex-shrink-0 cursor-pointer">
              <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 to-[#4a1525]">
                <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-white">
                  <Image 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                    alt="Your Story" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="text-[11px] font-medium text-gray-700 mt-1.5">Your Vibe</span>
            </div>

          </div>
        </div>

        {/* Bottom Section: Scrollable List of People Who Sent You Likes */}
        <div className="flex-1 overflow-y-auto p-5 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#4a1525]/20 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              People who liked you
            </h2>
            <span className="text-xs font-semibold text-[#4a1525] bg-[#4a1525]/10 px-2 py-0.5 rounded-md">
              Recent
            </span>
          </div>

          <div className="space-y-3">
            {likesData.map((person) => (
              <div 
                key={person.id} 
                className="bg-white p-3.5 rounded-2xl border border-[#eae5de] shadow-sm flex items-center justify-between hover:border-[#4a1525]/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-[#eae5de]">
                    <Image 
                      src={person.image} 
                      alt={person.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow">
                      <FiHeart className="text-[#4a1525] fill-[#4a1525]" size={10} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-900 leading-tight">
                      {person.name}, <span className="font-normal text-gray-500">{person.age}</span>
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">
                      {person.text}
                    </p>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      {person.time}
                    </span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#f7f3ed] flex items-center justify-center text-[#4a1525] group-hover:bg-[#4a1525] group-hover:text-white transition-colors">
                  <FiMessageCircle size={18} />
                </div>
              </div>
            ))}
          </div>

        </div>
        <div className="inset-0 z-50 mt-3">
      <Navbar/>
      </div>

      </div>
      
    </div>
  );
}