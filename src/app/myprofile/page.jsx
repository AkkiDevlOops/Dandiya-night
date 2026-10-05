"use client";
import MyProfile from '@/components/myprofile/MyProfile'
import React, { useEffect } from 'react'
import Background from '@/components/matchingpage/backgroundblur'
import { useAuth } from '@/lib/gettoken';


const page = () => {
 
  return (
    <div>
      <div className='relative z-50 inset-0'><MyProfile/></div>
      <div className='fixed z-10 inset-0'><Background/></div>
      
      

    </div>
  )
}

export default page
