"use client";

import { useState } from 'react';

export default function CloudinaryUploadForm() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setImageUrl('');

    // Extract the file from the form data
    const data = new FormData(e.currentTarget);
    
    try {
      const res = await fetch('/api/uploadimage', {
        method: 'POST',
        body: data, // Handles content-type boundaries automatically
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        
        {/* Header Block */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Cloud Upload
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Upload files seamlessly to your Cloudinary storage
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="rounded-md bg-red-50 p-4 border border-red-200">
            <div className="flex">
              <div className="text-sm font-medium text-red-800">{error}</div>
            </div>
          </div>
        )}

        {/* Dynamic Form Setup */}
        <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Select Image File</label>
            
            {/* Styled Drag & Drop Input Interface Area */}
            <div className="mt-1 flex justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 hover:border-indigo-500 transition-colors relative group">
              <div className="space-y-1 text-center">
                
                {/* Visual Anchor Upload Vector Icon */}
                <svg className="mx-auto h-12 w-12 text-gray-400 group-hover:text-indigo-500 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <div className="flex text-sm text-gray-600 justify-center">
                  <span className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500">
                    Upload a file
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
              </div>

              {/* Invisible HTML target overlapping the styled element */}
              <input 
                type="file" 
                name="image" 
                accept="image/*" 
                required 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Action Trigger Submission Control Button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative flex w-full justify-center rounded-xl bg-indigo-600 py-3 px-4 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 transition-all shadow-md hover:shadow-indigo-200"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                {/* Tailwind Processing Spinner Vector Graphic Element */}
                <svg className="h-5 w-5 animate-spin text-white" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24">
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
          <div className="mt-6 space-y-3 rounded-xl bg-green-50 p-4 border border-green-200 animate-fadeIn">
            <p className="text-sm font-semibold text-green-800">✓ File Uploaded Successfully!</p>
            
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <img 
                src={imageUrl} 
                alt="Cloud storage rendering preview asset" 
                className="h-48 w-full object-cover"
              />
            </div>

            {/* Read-Only Clipboard Target Display Box */}
            <div className="flex flex-col space-y-1">
              <span className="text-xs text-gray-500 font-medium">Permanent Target URL:</span>
              <input 
                type="text" 
                readOnly 
                value={imageUrl} 
                className="w-full truncate rounded-md bg-white border border-gray-200 p-2 text-xs font-mono text-gray-600 select-all focus:outline-none focus:border-indigo-400"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
