"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/gettoken";
import Background from '@/components/matchingpage/backgroundblur'

import ProfileFormFirst from "@/components/completeProfile/ProfileFormFirst";
import ProfileFormSecond from "@/components/completeProfile/ProfileFormSecond";

export default function CompleteProfilePage() {
  const searchParams = useSearchParams();

  const enrollment = searchParams.get("enrollment");

  const [step, setStep] = useState(1);

  const [profileData, setProfileData] = useState({
    username: "",
    branch: "",
    semester: "",
    college: "",
    gender: "",
    email: "",
  });

  const student = {
    name: "madhur",
    enrollment: enrollment,
  };

  // STEP 1 → STEP 2
  const handleNext = (data) => {
    console.log("First Form Data:", data);

    setProfileData((prev) => ({
      ...prev,
      ...data,
    }));

    setStep(2);
  };

  // STEP 2 → STEP 1
  const handleBack = () => {
    setStep(1);
  };

  // STEP 2 → SAVE
  const handleSave = (data) => {
    const finalProfile = {
      ...profileData,
      ...data,
      name: student.name,
      enrollment: student.enrollment,
    };

    console.log("FINAL PROFILE:", finalProfile);

    // Later your backend API will be called here
    // fetch("/api/profile", {...})
  };

 

  useEffect(()=>{
    
  })

  return (
    <div><Background/>
    <main className="h-dvh inset-0 z-50 overflow-hidden bg-[#fffaf2]">
      <div className="flex h-full items-center justify-center px-4 py-3 sm:px-6">
      
          <ProfileFormFirst
            student={student}
            onNext={handleNext}
          />
      

       

      </div>
    </main></div>
  );
}