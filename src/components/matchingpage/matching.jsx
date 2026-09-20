"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from '@/components/Navbar'
import { useAuth } from "@/lib/gettoken";
import { FiMoreHorizontal,FaXmark, FiCornerUpRight, FiX, FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function RaasMitraProfile() {

    const {user} = useAuth();
    const [error,setError] = useState('');
   const [profiles, setProfiles] = useState([]);
  

 let i = 0;
 const minSwipeDistance = 80;

 const sendLike = async(profileId)=>{
  const someoneGotLiked = profileId;
  const response = await fetch('/api/sendlikes',{
    method:"POST",
    body: JSON.stringify({
      someoneGotLiked,
    })
  })
  const data = await response.json();
  alert(data.message)
 }

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
  
 const skipProfile = (profileId) => {
  setProfiles((currentProfiles) =>
    currentProfiles.filter((profile) => profile._id !== profileId)
  );
};








  return (
    <div className="flex justify-center">
  {/* Mobile Frame Container */}
  <div className="w-full max-w-md mb-4 scroll-auto sm:rounded-xl mt-3 bg-[#fdfbf7] flex flex-col overflow-hidden shadow-2xl relative">
    
    {/* Long Scrollable Div */}
    <div className="min-h-screen   overflow-y-auto space-y-3 pr-4 pl-6 scroll-smooth  [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#4a1525]/20 [&::-webkit-scrollbar-thumb]:rounded-full">
      
      {/* App Heading & More Options */}
       <div className="flex mt-7 justify-between">
        <h1 className="text-2xl font-extrabold text-[#4a1525] tracking-tight">
          Raas Mitra
        </h1>
        <button className="text-[#4a1525] text-xl font-bold tracking-widest p-1">
          •••
        </button>
      </div> 

          <div className="relative">
  {profiles.map((profile, idx) => (
    
    <div
      className={`absolute h-250 py-7 bg-white inset-0 p-4 border rounded-2xl text-black`}
       style={{ zIndex: idx + 1 , touchAction: "pan-y" }}

        key={profile._id}
    >
      <div>
      <div className="flex justify-between items-center px-6 py-5 z-10 bg-gradient-to-b from-white via-white to-transparent absolute top-0 w-full">
        <h1 className="text-4xl font-black text-gray-900">{profile.username}</h1>
        </div>
        
      <div >
        

        <div className="relative w-full h-110 group">
          <img
            src={profile.images[0]?profile.images[0]:"/image"}
            alt={`${profile.username}`}
            className="object-cover h-[60vh] mt-5"
          />

          <button onClick={()=>skipProfile(profile._id)} className="absolute bottom-8 left-2 z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
            <FiX  size={32} className="text-red-400" />
          </button>
          
          {/* Floating "Like" Button */}
          <button onClick={()=>sendLike(profile._id)} className="absolute bottom-8 right-2 z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
            <FiHeart size={32} className="text-red-400" />
          </button>
          
          {/* Carousel Left/Right Buttons (visible on hover for desktop, always for touch) */}
          <button  onClick={() => skipProfile(profile._id)} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/30 text-white/70 hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity sm:opacity-100">
             <FiChevronLeft size={32} />
          </button>
          <button  onClick={() => skipProfile(profile._id)}  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/30 text-white/70 hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity sm:opacity-100">
             <FiChevronRight size={32} />
          </button>
        </div>

         {/* <div className="absolute -top-10 left-8 right-8 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <p className="text-lg font-semibold text-gray-800 mb-2 tracking-tight">
                    {profile.prompt}
                </p>
                <h2 className="text-4xl font-extrabold text-gray-900 leading-tight tracking-tighter">
                    {profile.answer}
                </h2>
           </div> */}
        
     
      </div>

          {/* About section */}

      <div >
      
      <div className="border min-h-40 ha-auto p-3 rounded-md" ><h1 className="font-bold ml-5">About</h1><p className="ml-5 mt-3">
        {profile.promt1}</p>
        </div>

          {/* // second image */}

        <div>
          <img
            src={profile.images[1]?profile.images[1]:"/image"}
            alt={`${profile.username}`}
            className="object-cover rounded-md h-[60vh] mt-5"
          />
        </div>
      </div>
      </div>
    </div>
    
  ))}
</div>
     

      
      

      {/* Interests Section */}
      {/* <div className="bg-white rounded-[24px] p-6 mb-5 shadow-sm border border-[#eae5de]">
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
      </div> */}

    </div>

    <div className="mb-3 mt-0">
      <Navbar />
    </div>

  </div>
</div>

  );
}
