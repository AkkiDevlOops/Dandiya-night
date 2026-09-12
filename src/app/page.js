import Image from "next/image";
import ImageSlider from "@/components/intro";
import Navbar from "@/components/Navbar"

export default function Home() {
  return (
   <>
   <div className="flex flex-col min-h-screen justify-center">
    {/* w-[430px] */}
   
   
{/* 
   // Navbar div */}
   <div className="inset-0 z-50 top-127 fixed md:top-130">
   <Navbar/>
   </div>
   </div>
   
   </>
  );
}
