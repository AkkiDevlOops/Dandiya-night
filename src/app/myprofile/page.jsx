"use client";
import MyProfile from '@/components/myprofile/MyProfile'
import React, { useEffect } from 'react'
import { useAuth } from '@/lib/gettoken';

const page = () => {
 
  return (
    <div>
      <MyProfile/>
      <div></div>
    </div>
  )
}

export default page
