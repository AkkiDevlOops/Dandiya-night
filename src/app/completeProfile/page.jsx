// "use client";

// import { useSearchParams } from "next/navigation";
// import { useState } from "react";

// import Background from "@/components/matchingpage/backgroundblur";

// import ProfileFormFirst from "@/components/completeProfile/ProfileFormFirst";
// import ProfileFormSecond from "@/components/completeProfile/ProfileFormSecond";

// export default function CompleteProfilePage() {
//   const searchParams = useSearchParams();

//   const enrollment = searchParams.get("enrollment");

//   const [step, setStep] = useState(1);

//   // Data collected from both forms
//   const [profileData, setProfileData] = useState({
//     username: "",
//     branch: "",
//     semester: "",
//     college: "",
//     gender: "",
//     email: "",

//     // Step 2
//     interests: [],
//     height: "",
//     prompt1: "",
//     prompt2: "",
//   });

//   const student = {
//     name: "madhur",
//     enrollment: enrollment,
//   };

//   // ================= STEP 1 → STEP 2 =================

//   const handleNext = (data) => {
//     console.log("First Form Data:", data);

//     setProfileData((prev) => ({
//       ...prev,
//       ...data,
//     }));

//     setStep(2);
//   };

//   // ================= STEP 2 → STEP 1 =================

//   const handleBack = () => {
//     setStep(1);
//   };

//   // ================= STEP 2 → SAVE =================

//   const handleSave = (data) => {
//     const finalProfile = {
//       ...profileData,
//       ...data,

//       // Student information
//       name: student.name,
//       enrollmentNo: student.enrollment,
//     };

//     console.log("FINAL PROFILE:", finalProfile);

//     // Later:
//     // fetch("/api/profile", {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify(finalProfile),
//     // });
//   };

//   return (
//     <div className="relative h-dvh w-full overflow-hidden">
//       <Background />

//       <main className="absolute inset-0 z-50 h-dvh overflow-hidden">
//         <div className="flex h-full items-center justify-center px-4 py-3 sm:px-6">

//           {/* ================= STEP 1 ================= */}

//           {step === 1 && (
//             <ProfileFormFirst
//               student={student}
//               onNext={handleNext}
//             />
//           )}

//           {/* ================= STEP 2 ================= */}

//           {step === 2 && (
//             <ProfileFormSecond
//               profileData={profileData}
//               onBack={handleBack}
//               onSave={handleSave}
//             />
//           )}

//         </div>
//       </main>
//     </div>
//   );
// }
"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import Background from "@/components/matchingpage/backgroundblur";
import ProfileFormFirst from "@/components/completeProfile/ProfileFormFirst";
import ProfileFormSecond from "@/components/completeProfile/ProfileFormSecond";

export default function CompleteProfilePage() {
  const searchParams = useSearchParams();
  const enrollment = searchParams.get("enrollment");

  const [step, setStep] = useState(1);

  const [profileData, setProfileData] = useState({
    enrollmentNo: enrollment || "",
    username: "",
    branch: "",
    semester: "",
    college: "",
    gender: "",
    email: "",
    interests: [],
    height: "",
    prompt1: "",
    prompt2: "",
  });

  // FORM 1 → FORM 2
  const handleNext = (data) => {
    console.log("STEP 1 DATA:", data);

    setProfileData((prev) => ({
      ...prev,
      ...data,
    }));

    setStep(2);
  };

  // FORM 2 → IMAGE UPLOAD
  const handleSecondNext = (data) => {
    console.log("STEP 2 DATA:", data);

    const finalProfile = {
      ...profileData,
      ...data,
    };

    console.log("FINAL PROFILE:", finalProfile);

    sessionStorage.setItem(
      "profileData",
      JSON.stringify(finalProfile)
    );

    window.location.href = "/testimage";
  };

  // FORM 2 → FORM 1
  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <Background />

      <main className="absolute inset-0 z-50 h-dvh overflow-hidden">
        <div className="flex h-full items-center justify-center px-4 py-3 sm:px-6">

          {step === 1 && (
            <ProfileFormFirst
              student={{
                name: "madhur",
                enrollment: enrollment,
              }}
              onNext={handleNext}
            />
          )}

          {step === 2 && (
            <ProfileFormSecond
              profileData={profileData}
              onBack={handleBack}
              onSave={handleSecondNext}
            />
          )}

        </div>
      </main>
    </div>
  );
}