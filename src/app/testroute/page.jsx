import React from 'react'
import MorphSlider from "@/components/MorphSlider"
import Matching from "@/components/matchingpage/matching"
import Navbar from '@/components/Navbar'
import Background from "@/components/matchingpage/backgroundblur"
import '@/app/globals.css';



function page() {
  
  return (
    <div className='max-h-screen overscroll-none'>
<div className='inset-0 z-10 fixed'>
<Background/>
</div>
<div className='inset-0 relative z-20 '>
    <Matching/>
</div>
<div className='className="inset-0 z-50 top-127 w-full fixed md:top-130'>
<Navbar/>
</div>
    </div>
  )
}

export default page