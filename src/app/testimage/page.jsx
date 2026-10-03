"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Background from "@/components/matchingpage/backgroundblur";

export default function CloudinaryUploadForm() {
  const router = useRouter();

  const [photos, setPhotos] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  // =========================================================
  // UPLOAD ONE PHOTO
  // =========================================================

  const handleImageSelect = async (event, index) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    // Basic validation
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    // 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be smaller than 10MB.");
      return;
    }

    try {
      setUploadingIndex(index);

      const formData = new FormData();

      formData.append("image", file);

      /*
       * Keeping your existing API.
       *
       * Your current code was already using:
       *
       * /api/uploadimage
       *
       * so we continue using exactly that.
       */
      const response = await fetch("/api/uploadimage", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            result.message ||
            "Image upload failed."
        );
      }

      if (!result.imageUrl) {
        throw new Error(
          "Upload succeeded but no image URL was returned."
        );
      }

      // Add uploaded image to this slot
      setPhotos((currentPhotos) => {
        const updatedPhotos = [...currentPhotos];

        updatedPhotos[index] = {
          url: result.imageUrl,
          name: file.name,
        };

        return updatedPhotos;
      });
    } catch (err) {
      console.error("IMAGE UPLOAD ERROR:", err);

      setError(
        err.message ||
          "Something went wrong while uploading the image."
      );
    } finally {
      setUploadingIndex(null);

      // Allows selecting the same file again
      event.target.value = "";
    }
  };

  // =========================================================
  // COUNT UPLOADED PHOTOS
  // =========================================================

  const uploadedCount = photos.filter(
    (photo) => photo !== null
  ).length;

  const minimumPhotosUploaded =
    uploadedCount >= 3;

  // =========================================================
  // GO TO NEXT PAGE
  // =========================================================

  const handleNext = () => {
    setError("");

    if (uploadedCount < 3) {
      setError(
        `Please upload at least 3 photos. You have uploaded ${uploadedCount} of 3 required photos.`
      );

      return;
    }

    router.push("/intrestpage");
  };

  // =========================================================
  // RENDER PHOTO SLOT
  // =========================================================

  const renderPhotoSlot = (index) => {
    const photo = photos[index];

    const isRequired = index < 3;

    const isUploading =
      uploadingIndex === index;

    return (
      <div
        key={index}
        className="relative aspect-[0.78]  w-full"
      >
        <label
          className={`
            group relative flex h-full w-full
            cursor-pointer items-center justify-center
            overflow-hidden rounded-2xl
            border-2 border-dashed
            transition-all duration-200
            ${
              photo
                ? "border-[#4c0519]/30 bg-white"
                : "border-amber-900/25 bg-amber-950/[0.02] hover:border-[#4c0519]/60 hover:bg-amber-950/[0.04]"
            }
          `}
        >
          {/* =================================================
              IMAGE PREVIEW
          ================================================= */}

          {photo ? (
            <>
              <img
                src={photo.url}
                alt={`Uploaded photo ${index + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Dark hover overlay */}
              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/25" />

              {/* Uploaded check */}
              <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#4c0519] text-sm font-bold text-white shadow-lg">
                ✓
              </div>

              {/* Change text */}
              <div className="absolute bottom-2 left-2 right-2 rounded-xl bg-black/45 px-2 py-1.5 text-center text-[10px] font-semibold text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                Tap to change
              </div>
            </>
          ) : (
            <>
              {/* Plus icon */}
              <div className="flex flex-col items-center justify-center">
                {isUploading ? (
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4c0519]/20 border-t-[#4c0519]" />
                ) : (
                  <>
                    <span className="text-5xl font-light leading-none text-gray-400">
                      +
                    </span>

                    {isRequired && (
                      <span className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-[#4c0519]/50">
                        Required
                      </span>
                    )}
                  </>
                )}
              </div>
            </>
          )}

          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            onChange={(event) =>
              handleImageSelect(event, index)
            }
            disabled={isUploading}
          />
        </label>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen  w-full overflow-y-auto pb-4">
      {/* =====================================================
          YOUR EXISTING BACKGROUND
      ===================================================== */}

      <Background />

      <div className="fixed inset-0 z-40 pt-40  md:pt-55  mt-2 flex h-dvh items-center justify-center overflow-y-auto px-4 py-4 [&::-webkit-scrollbar]:hidden">
        {/* ===================================================
            MAIN CARD
        =================================================== */}

        <div className="w-full max-w-md rounded-2xl mt-10 border border-white/20 bg-[#fdfbf7] p-5 shadow-2xl sm:p-7">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-5">
            {/* Small progress indicator */}
            <div className="mb-5 flex items-center justify-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#4c0519]" />

              <div className="h-2 w-2 rounded-full bg-[#4c0519]" />

              <div className="h-2 w-2 rounded-full bg-gray-300" />
            </div>

            <div className="flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[#4c0519] bg-white text-2xl shadow-sm">
                📷
              </div>
            </div>

            <h1 className="mt-5 text-center text-3xl font-extrabold leading-tight tracking-tight text-[#4c0519]">
              Pair your photos and
              <br />
              videos with prompts
            </h1>

            <p className="mt-3 text-center text-sm text-amber-950/60">
              Add at least 3 photos to continue.
            </p>
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-center text-sm font-medium text-red-800">
                {error}
              </p>
            </div>
          )}

          {/* =================================================
              PHOTO GRID
          ================================================= */}

          <div className="grid grid-cols-3 gap-2.5">
            {photos.map((_, index) =>
              renderPhotoSlot(index)
            )}
          </div>

          {/* =================================================
              PHOTO COUNT
          ================================================= */}

          <div className="mt-3 flex items-center justify-between px-1">
            <p
              className={`text-sm font-medium ${
                minimumPhotosUploaded
                  ? "text-emerald-700"
                  : "text-gray-400"
              }`}
            >
              {uploadedCount} / 6 uploaded
            </p>

            <p className="text-xs text-gray-400">
              {minimumPhotosUploaded
                ? "Minimum reached ✓"
                : `${3 - uploadedCount} more required`}
            </p>
          </div>

          {/* =================================================
              PROGRESS
          ================================================= */}

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-[#4c0519] transition-all duration-300"
              style={{
                width: `${Math.min(
                  (uploadedCount / 3) * 100,
                  100
                )}%`,
              }}
            />
          </div>

          {/* =================================================
              TIP BOX
          ================================================= */}

          <div className="mt-5 rounded-2xl border border-gray-200 bg-white px-4 py-4">
            <div className="mb-2 flex justify-center">
              <span className="text-2xl">💡</span>
            </div>

            <p className="text-center text-sm font-medium leading-5 text-gray-700">
              Tap a photo to add one.
              <br />
              Good photos help your profile stand out.
            </p>
          </div>

          {/* =================================================
              NEXT BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={handleNext}
            disabled={
              !minimumPhotosUploaded ||
              uploadingIndex !== null
            }
            className={`
              mt-5 flex w-full items-center justify-center
              rounded-xl px-4 py-3.5
              text-sm font-semibold
              shadow-lg transition
              ${
                minimumPhotosUploaded
                  ? "bg-[#4c0519] text-[#fdfbf7] hover:bg-[#630620]"
                  : "cursor-not-allowed bg-[#4c0519]/30 text-white"
              }
            `}
          >
            {uploadingIndex !== null
              ? "Uploading..."
              : minimumPhotosUploaded
              ? "Continue"
              : "Upload 3 photos to continue"}
          </button>

          {/* =================================================
              REQUIREMENT TEXT
          ================================================= */}

          <p className="mt-3 text-center text-xs text-gray-400">
            At least 3 photos are required
          </p>
        </div>
      </div>

      {/* =====================================================
          UNUSED STATE KEPT AVAILABLE
      ===================================================== */}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-5">
          <div className="rounded-2xl bg-white p-6 text-center shadow-2xl">
            <p className="font-bold text-red-500">
              Complete filling your details first
            </p>
          </div>
        </div>
      )}
    </div>
  );
}