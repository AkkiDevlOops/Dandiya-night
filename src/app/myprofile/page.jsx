"use client";
import MyProfile from '@/components/myprofile/MyProfile'
import React, { useEffect } from 'react'
import { useAuth } from '@/lib/gettoken';

const page = () => {
  const {user} = useAuth();

 useEffect(()=>{
  
    console.log(user)
    
 })
  return (
    <div>
      <MyProfile/>
      <div></div>
    </div>
  )
}

export default page
