import React from 'react'

import Matching from "@/components/matchingpage/matching"

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

    </div>
  )
}

export default page