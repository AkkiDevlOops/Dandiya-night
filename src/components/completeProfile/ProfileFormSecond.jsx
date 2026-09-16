"use client";

import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Heart,
  ImagePlus,
  Sparkles,
  X,
} from "lucide-react";

const interests = [
  "Garba",
  "Dandiya",
  "Music",
  "Dance",
  "Photography",
  "Fashion",
  "Food",
  "Travel",
  "Fitness",
  "Movies",
];

export default function ProfileFormSecond({
  profileData,
  onBack,
  onSave,
}) {

    const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]);

  const [selectedInterests, setSelectedInterests] =
    useState([]);

  const [about, setAbout] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [saved, setSaved] = useState(false);

  // ================= IMAGE UPLOAD =================

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setError("");

    if (images.length + files.length > 2) {
      setError("You can upload a maximum of 2 photos.");
      return;
    }

    const validFiles = files.filter((file) => {

      if (!file.type.startsWith("image/")) {
        setError("Please select only image files.");
        return false;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Each image must be smaller than 5MB.");
        return false;
      }

      return true;
    });

    validFiles.forEach((file) => {

      const reader = new FileReader();

      reader.onload = () => {

        setImages((prev) => {

          if (prev.length >= 2) {
            return prev;
          }

          return [
            ...prev,
            {
              file: file,
              preview: reader.result,
            },
          ];
        });

      };

      reader.readAsDataURL(file);

    });

    e.target.value = "";
  };


  // ================= REMOVE IMAGE =================

  const removeImage = (index) => {

    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setError("");
  };


  // ================= INTEREST =================

  const toggleInterest = (interest) => {

    setError("");

    setSelectedInterests((prev) => {

      if (prev.includes(interest)) {

        return prev.filter(
          (item) => item !== interest
        );

      }

      if (prev.length >= 5) {

        setError("Choose up to 5 interests.");

        return prev;
      }

      return [...prev, interest];

    });
  };


  // ================= SUBMIT =================

 const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  if (images.length === 0) {
    setError("Please add at least one photo.");
    return;
  }

  if (selectedInterests.length === 0) {
    setError("Please choose at least one interest.");
    return;
  }

  if (!about.trim()) {
    setError("Tell us a little about your Garba vibe.");
    return;
  }

  if (about.trim().length < 10) {
    setError("Write at least a few words about yourself.");
    return;
  }

  try {
    setLoading(true);

    const secondFormData = {
      interests: selectedInterests,
      about: about.trim(),
      images: images,
    };

    onSave(secondFormData);

    // Show popup
    setSaved(true);

  } catch (err) {
    setError(
      err.message || "Unable to save your profile."
    );
  } finally {
    setLoading(false);
  }
};

  const handleimageSubmit = async (e) => {
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
    <div className="w-full max-w-[700px]">

      {/* ================= HEADER ================= */}

      <div className="mb-4 text-center">

        <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0df] text-xl">
          ✨
        </div>

        <h1 className="font-serif text-[30px] font-bold leading-tight text-[#741337]">
          Show Your Vibe
          <span className="ml-2 text-[#ed7137]">
            ✧
          </span>
        </h1>

        <p className="mt-1 text-xs text-[#24151a]/50">
          Add photos and tell us what makes your Garba night fun.
        </p>

      </div>


      {/* ================= CARD ================= */}

      <div className="rounded-[1.7rem] border border-[#741337]/10 bg-white p-5 shadow-xl shadow-[#741337]/5 sm:p-6">

        {/* ================= USER ================= */}

        <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#fffaf2] px-4 py-2.5">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#741337] text-white">
            <span className="text-sm font-semibold">
              {profileData?.name?.charAt(0)?.toUpperCase() || "M"}
            </span>
          </div>

          <div>

            <p className="text-sm font-semibold text-[#741337]">
              {profileData?.name || "Your Profile"}
            </p>

            <p className="text-[10px] text-[#24151a]/40">
              Almost there — show your Garba vibe
            </p>

          </div>

        </div>


        {/* ================= ERROR ================= */}

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
            {error}
          </div>
        )}


        <form 
          onSubmit={handleimageSubmit}
          className="space-y-4"
        >

          {/* ================= PHOTOS ================= */}
          
          <div>

            <div className="mb-2 flex items-center justify-between">

              <div>

                <label className="block text-xs font-medium text-[#24151a]">
                  Your Photos
                </label>

                <p className="mt-0.5 text-[10px] text-[#24151a]/40">
                  Add up to 2 photos
                </p>

              </div>

              <span className="text-[10px] font-medium text-[#741337]">
                {images.length}/2
              </span>

            </div>


            <div className="grid grid-cols-2 gap-3">

              {/* UPLOAD */}

              {images.length === 0 && (
                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="flex h-28 flex-col items-center justify-center rounded-xl border border-dashed border-[#741337]/20 bg-[#fffaf2] text-[#741337] transition hover:border-[#ed7137] hover:bg-[#fff0df]"
                >

                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                    <ImagePlus size={17} />
                  </div>

                  <span className="text-xs font-medium">
                    Add Photo
                  </span>

                  <span className="mt-1 text-[9px] text-[#24151a]/40">
                    JPG, PNG • Max 5MB
                  </span>

                </button>
              )}


              {/* IMAGE PREVIEWS */}

              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative h-28 overflow-hidden rounded-xl bg-[#fffaf2]"
                >

                  <img
                    src={image.preview}
                    alt={`Profile photo ${index + 1}`}
                    className="h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(index)
                    }
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white"
                  >
                    <X size={14} />
                  </button>

                  {index === 0 && (
                    <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-1 text-[9px] font-medium text-[#741337]">
                      Main photo
                    </span>
                  )}

                </div>
              ))}


              {/* SECOND EMPTY SLOT */}

              {images.length === 1 && (
                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="flex h-28 flex-col items-center justify-center rounded-xl border border-dashed border-[#741337]/20 bg-[#fffaf2] text-[#741337] transition hover:border-[#ed7137] hover:bg-[#fff0df]"
                >

                  <Camera size={18} />

                  <span className="mt-2 text-xs font-medium">
                    Add another
                  </span>

                </button>
              )}

            </div>


            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />

          </div>


          {/* ================= INTERESTS ================= */}

          <div>

            <div className="mb-2 flex items-center gap-2">

              <Heart
                size={15}
                className="text-[#ed7137]"
              />

              <div>

                <label className="block text-xs font-medium text-[#24151a]">
                  Your Interests
                </label>

                <p className="text-[10px] text-[#24151a]/40">
                  Pick up to 5
                </p>

              </div>

            </div>


            <div className="flex flex-wrap gap-1.5">

              {interests.map((interest) => {

                const selected =
                  selectedInterests.includes(
                    interest
                  );

                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() =>
                      toggleInterest(interest)
                    }
                    className={`rounded-full border px-3 py-1.5 text-[10px] font-medium transition ${
                      selected
                        ? "border-[#741337] bg-[#741337] text-white"
                        : "border-[#741337]/10 bg-[#fffaf2] text-[#741337] hover:border-[#ed7137]"
                    }`}
                  >

                    {selected && (
                      <Check
                        size={10}
                        className="mr-1 inline"
                      />
                    )}

                    {interest}

                  </button>
                );

              })}

            </div>

          </div>


          {/* ================= ABOUT ================= */}

          <div>

            <div className="mb-2 flex items-center gap-2">

              <Sparkles
                size={15}
                className="text-[#ed7137]"
              />

              <label
                htmlFor="about"
                className="text-xs font-medium text-[#24151a]"
              >
                Your Garba Vibe
              </label>

            </div>

            <textarea
              id="about"
              value={about}
              onChange={(e) => {
                setAbout(e.target.value);
                setError("");
              }}
              maxLength={120}
              rows={2}
              placeholder="Love energetic Garba nights, good music and meeting new people..."
              className="w-full resize-none rounded-xl border border-[#741337]/10 bg-[#fffaf2] px-3 py-2.5 text-xs leading-relaxed outline-none transition placeholder:text-[#24151a]/30 focus:border-[#ed7137] focus:ring-2 focus:ring-[#ed7137]/10"
            />

            <div className="mt-1 flex justify-end">
              <span className="text-[9px] text-[#24151a]/35">
                {about.length}/120
              </span>
            </div>

          </div>


          {/* ================= BUTTONS ================= */}

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={onBack}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#741337]/10 bg-[#fffaf2] text-[#741337] transition hover:border-[#ed7137]"
              aria-label="Go back"
            >
              <ArrowLeft size={17} />
            </button>


            <button
              type="submit"
              disabled={loading}
              className="group flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#741337] text-sm font-medium text-white shadow-lg shadow-[#741337]/15 transition hover:bg-[#5d0e2b] active:scale-[0.99] disabled:opacity-60"
            >

              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  Saving...
                </>
              ) : (
                <>
                  Save & Continue

                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </>
              )}

            </button>

          </div>

        </form>


        <p className="mt-3 text-center text-[10px] text-[#24151a]/35">
          Keep it genuine — this is about finding someone to enjoy Garba with.
        </p>

      </div>

    </div>
  );
}