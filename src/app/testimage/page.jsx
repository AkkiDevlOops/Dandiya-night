"use client";

import { useEffect, useState } from 'react';
import Background from '@/components/matchingpage/backgroundblur';
import { useRouter } from "next/navigation";

import { useAuthGuard } from "@/lib/authorisedroute";

import { useAuth } from "@/lib/gettoken";

export default function CloudinaryUploadForm() {

  useAuthGuard();
  const {user} = useAuth();
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setuserId] = useState('')


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setImageUrl('');

    const data = new FormData(e.currentTarget);
     data.append('userId', userId);
    try {
      // Endpoint automatically updated to match your custom configuration path
      const res = await fetch('/api/uploadimage', {
        method: 'POST',
        body: data,userId
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setImageUrl(result.imageUrl);
      } else {
        setError(result.error || "Something went wrong during the upload.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the upload server.");
    } finally {
      setLoading(false);
    }
  };
  const router = useRouter();
    
     useEffect(()=>{
      
      const data = JSON.parse(user);
      const auth = data;
      if(data.auth == false){
        router.push('/LoginRegister')
      }
        setuserId(data.id);
        console.log(auth)
        
        
     },[])

  return (
    <>
    <div className=''>
    <Background/>
    <div className="flex fixed inset-0 z-50 min-h-screen items-center justify-center  px-4 py-12 sm:px-6 lg:px-8 flex-1 overflow-y-auto p-5 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#4a1525]/20 [&::-webkit-scrollbar-thumb]:rounded-full">
    
      {/* Container card uses clean off-white block style */}
      <div className="w-full max-w-md min-h-screen space-y-8 rounded-2xl bg-[#fdfbf7] p-8 shadow-2xl border border-white/20">
        
        {/* Header Block */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#4c0519]">
            Cloud Upload
          </h2>
          <p className="mt-2 text-sm text-amber-950/60">
            Upload files seamlessly to your Cloudinary storage
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="rounded-xl bg-red-50 p-4 border border-red-200">
            <div className="flex">
              <div className="text-sm font-medium text-red-800">{error}</div>
            </div>
          </div>
        )}

        {/* Dynamic Form Setup */}
        <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-amber-950/80">Select Image File</label>
            
            {/* Custom styled Drag & Drop Area utilizing the maroon line transitions */}
            <div className="mt-1 flex justify-center rounded-xl border-2 border-dashed border-amber-900/20 bg-amber-950/[0.02] px-6 pt-5 pb-6 hover:border-[#4c0519] hover:bg-amber-950/[0.04] transition-all duration-300 relative group">
              <div className="space-y-1 text-center">
                
                {/* Custom Highlighted Drop Vector Icon */}
                <svg className="mx-auto h-12 w-12 text-amber-950/30 group-hover:text-[#4c0519] transition-colors duration-300" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <div className="flex text-sm text-amber-950/70 justify-center">
                  <span className="relative cursor-pointer rounded-md font-bold text-[#4c0519] focus-within:outline-none hover:text-[#700824] transition-colors">
                    Upload a file
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-amber-950/40">PNG, JPG, GIF up to 10MB</p>
              </div>

              <input 
                type="file" 
                name="image" 
                accept="image/*" 
                required 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Action Trigger Submission Control Button tailored in solid deep maroon */}
          <button
            type="submit"
            disabled={loading}
            className="group relative flex w-full justify-center rounded-xl bg-[#4c0519] py-3.5 px-4 text-sm font-semibold text-[#fdfbf7] hover:bg-[#630620] focus:outline-none focus:ring-2 focus:ring-[#4c0519] focus:ring-offset-2 disabled:bg-[#4c0519]/50 transition-all duration-300 shadow-lg shadow-rose-950/20 hover:shadow-xl hover:shadow-rose-950/30"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 animate-spin text-[#fdfbf7]" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing Upload...</span>
              </div>
            ) : (
              'Send to Cloud Storage'
            )}
          </button>
        </form>

        {/* Success Preview Module Block */}
        {imageUrl && (
          <div className="mt-6 space-y-3 rounded-xl bg-emerald-50/50 p-4 border border-emerald-200/60 animate-fadeIn">
            <p className="text-sm font-bold text-emerald-800">✓ File Uploaded Successfully!</p>
            
            <div className="overflow-hidden rounded-xl border border-amber-950/10 bg-white shadow-sm">
              <img 
                src={imageUrl} 
                alt="Cloud storage rendering preview asset" 
                className="h-48 w-full object-cover"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-xs text-amber-950/50 font-semibold">Permanent Target URL:</span>
              <input 
                type="text" 
                readOnly 
                value={imageUrl} 
                className="w-full truncate rounded-lg bg-white border border-amber-950/10 p-2.5 text-xs font-mono text-amber-950/80 select-all focus:outline-none focus:border-[#4c0519]"
              />
            </div>
          </div>
        )}

      </div>
    </div>
    </div>
    </>
  );
}
