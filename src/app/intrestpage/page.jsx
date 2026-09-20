import React from 'react'
import ProfileFormSecond from '@/components/completeProfile/ProfileFormSecond'
import Background from '@/components/matchingpage/backgroundblur'

const page = () => {
  return (
    <div>
        <Background/>
        <div className='inset-0 fixed z-40 flex min-h-screen w-full justify-center items-center'> <ProfileFormSecond/></div>
       
    </div>
  )
}

export default page