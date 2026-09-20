

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Background from "@/components/matchingpage/backgroundblur";
import { useAuthGuard } from "@/lib/authorisedroute";
import { useAuth } from "@/lib/gettoken";

export default function CloudinaryUploadForm() {
  // useAuthGuard();

  const router = useRouter();
  // const { user } = useAuth();

  const [userId, setUserId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open,setopen] = useState(false);

  // ================= GET USER =================

  // useEffect(() => {
  //   if (!user) return;

  //   try {
  //     const data =
  //       typeof user === "string"
  //         ? JSON.parse(user)
  //         : user;

  //     if (data?.auth === false) {
  //       router.push("/LoginRegister");
  //       return;
  //     }

  //     setUserId(data?.id || "");

  //   } catch (err) {
  //     console.error("User error:", err);
  //     router.push("/LoginRegister");
  //   }
  // }, [user, router]);

  // ================= UPLOAD =================

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setImageUrl("");

    const data = new FormData(e.currentTarget);

    // Add logged-in user ID
    data.append("userId", userId);

    try {
      const res = await fetch("/api/uploadimage", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setImageUrl(result.imageUrl);
        

      } else {
        setError(
          result.error ||
            "Something went wrong during the upload."
        );
      }

    } catch (err) {
      console.error(err);
      setError("Failed to connect to the upload server.");

    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    async function get() {
      const response = await fetch('/api/checkprofilecompletion',{method:"POST"});
      const data = await response.json();
      if(response.ok){
      if(data){
        
        console.log(data);
        return;
      }
      setopen(true);
      setTimeout(() => {
router.push('/completeProfile');
         
      }, 2000);
     
    }
    }
    get();
  },[])

  return (
    <div className="relative h-dvh w-full overflow-hidden">

      <Background />

      <div className="fixed inset-0 z-40 flex h-dvh items-center justify-center overflow-hidden px-4">
        {open?(
          <div className="w-full min-h-screen flex justify-center items-center fixed inset-0 z-50"><p className=" h-1/4 w-1/2 flex justify-center font-bold text-red-500 items-center">complete filling your details first</p></div>
        ):('')}

        <div className="w-full max-w-md rounded-2xl border border-white/20 bg-[#fdfbf7] p-6 shadow-2xl sm:p-8">
        
          {/* ================= HEADER ================= */}

          <div className="mb-6 text-center">

            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff0df] text-2xl">
              📸
            </div>


            <h2 className="text-3xl font-extrabold tracking-tight text-[#4c0519]">
              Add Your Photo
            </h2>

            <p className="mt-2 text-sm text-amber-950/60">
              One photo is enough to complete your profile.
            </p>

          </div>

          {/* ================= ERROR ================= */}

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3">
              <p className="text-sm font-medium text-red-800">
                {error}
              </p>
            </div>
          )}

          {/* ================= FORM ================= */}

          <form
            onSubmit={handleFormSubmit}
            className="space-y-5"
          >

            <div>

              <label className="mb-2 block text-sm font-semibold text-amber-950/80">
                Select Image
              </label>

              <div className="relative flex min-h-[190px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-amber-900/20 bg-amber-950/[0.02] transition hover:border-[#4c0519] hover:bg-amber-950/[0.04]">

                <div className="text-center">

                  <svg
                    className="mx-auto mb-3 h-12 w-12 text-amber-950/30"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p className="text-sm text-amber-950/70">
                    <span className="font-bold text-[#4c0519]">
                      Upload a file
                    </span>
                  </p>

                  <p className="mt-2 text-xs text-amber-950/40">
                    PNG, JPG, GIF up to 10MB
                  </p>

                </div>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />

              </div>

            </div>

            {/* ================= CREATE ACCOUNT ================= */}
            <a href="/intrestpage">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-xl bg-[#4c0519] px-4 py-3.5 text-sm font-semibold text-[#fdfbf7] shadow-lg transition hover:bg-[#630620] disabled:cursor-not-allowed disabled:bg-[#4c0519]/50"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>
                </a>
          </form>

          {/* ================= SUCCESS ================= */}

          {imageUrl && (
            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">

              <p className="mb-3 text-sm font-bold text-emerald-800">
                ✓ Profile completed successfully!
              </p>

              <img
                src={imageUrl}
                alt="Uploaded profile"
                className="h-40 w-full rounded-xl object-cover"
              />

              <p className="mt-3 text-center text-xs text-emerald-700">
                Taking you to Discover...
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
