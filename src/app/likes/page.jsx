"use client";
import React, { useEffect, useState } from 'react'
import Like from "@/components/likes"
import getcookie from '@/lib/gettoken.js'

const page = () => {
//   const [token,settoken] = useState('');

  // const cookie = getcookie();

  // const callfunction=async()=>{
  //   const data = await getcookie();
  //   console.log("data"+data);
  //   }

  
  
  return (
    <div>
        <Like/>
    </div>
  )
}

export default page