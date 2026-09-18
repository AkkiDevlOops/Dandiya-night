
"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Ruler,
  Sparkles,
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
  const [selectedInterests, setSelectedInterests] = useState(
    profileData?.interests || []
  );

  const [height, setHeight] = useState(
    profileData?.height || ""
  );

  const [prompt1, setPrompt1] = useState(
    profileData?.prompt1 || ""
  );

  const [prompt2, setPrompt2] = useState(
    profileData?.prompt2 || ""
  );

  const [error, setError] = useState("");

  // ================= INTEREST =================

  const toggleInterest = (interest) => {
    setError("");

    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((item) => item !== interest);
      }

      if (prev.length >= 5) {
        setError("Choose up to 5 interests.");
        return prev;
      }

      return [...prev, interest];
    });
  };

  // ================= NEXT =================

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (selectedInterests.length === 0) {
      setError("Please choose at least one interest.");
      return;
    }

    if (!height) {
      setError("Please enter your height.");
      return;
    }

    if (Number(height) < 100 || Number(height) > 250) {
      setError("Please enter a valid height.");
      return;
    }

    if (!prompt1.trim()) {
      setError("Please answer the first prompt.");
      return;
    }

    if (!prompt2.trim()) {
      setError("Please answer the second prompt.");
      return;
    }

    const secondFormData = {
      interests: selectedInterests,
      height: Number(height),
      prompt1: prompt1.trim(),
      prompt2: prompt2.trim(),
    };

    console.log("STEP 2 DATA:", secondFormData);

    // Send data back to CompleteProfile page
    onSave(secondFormData);
  };

  return (
    <div className="w-full max-w-[650px]">

      {/* ================= HEADER ================= */}

      <div className="mb-4 text-center">
        <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0df] text-xl">
          ✨
        </div>

        <h1 className="font-serif text-[30px] font-bold leading-tight text-[#741337]">
          Show Your Vibe
          <span className="ml-2 text-[#ed7137]">✧</span>
        </h1>

        <p className="mt-1 text-xs text-[#24151a]/50">
          A few more things so people can know you better.
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
              Almost there — complete your profile
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
          onSubmit={handleSubmit}
          className="space-y-4"
        >

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
                  selectedInterests.includes(interest);

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

          {/* ================= HEIGHT ================= */}

          <div>

            <div className="mb-2 flex items-center gap-2">

              <Ruler
                size={15}
                className="text-[#ed7137]"
              />

              <div>
                <label
                  htmlFor="height"
                  className="block text-xs font-medium text-[#24151a]"
                >
                  Your Height
                </label>

                <p className="text-[10px] text-[#24151a]/40">
                  Enter your height in centimeters
                </p>
              </div>

            </div>

            <div className="relative">

              <input
                id="height"
                type="number"
                min="100"
                max="250"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                  setError("");
                }}
                placeholder="e.g. 175"
                className="w-full rounded-xl border border-[#741337]/10 bg-[#fffaf2] px-3 py-2.5 pr-16 text-xs text-[#24151a] outline-none transition placeholder:text-[#24151a]/30 focus:border-[#ed7137] focus:ring-2 focus:ring-[#ed7137]/10"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#24151a]/40">
                cm
              </span>

            </div>

          </div>

          {/* ================= PROMPT 1 ================= */}

          <div>

            <div className="mb-2 flex items-center gap-2">

              <Sparkles
                size={15}
                className="text-[#ed7137]"
              />

              <label
                htmlFor="prompt1"
                className="text-xs font-medium text-[#24151a]"
              >
                What makes a Garba night perfect for you?
              </label>

            </div>

            <textarea
              id="prompt1"
              value={prompt1}
              onChange={(e) => {
                setPrompt1(e.target.value);
                setError("");
              }}
              maxLength={150}
              rows={2}
              placeholder="Great music, energetic Garba, good people..."
              className="w-full resize-none rounded-xl border border-[#741337]/10 bg-[#fffaf2] px-3 py-2.5 text-xs leading-relaxed outline-none transition placeholder:text-[#24151a]/30 focus:border-[#ed7137] focus:ring-2 focus:ring-[#ed7137]/10"
            />

            <div className="mt-1 flex justify-end">
              <span className="text-[9px] text-[#24151a]/35">
                {prompt1.length}/150
              </span>
            </div>

          </div>

          {/* ================= PROMPT 2 ================= */}

          <div>

            <div className="mb-2 flex items-center gap-2">

              <Sparkles
                size={15}
                className="text-[#ed7137]"
              />

              <label
                htmlFor="prompt2"
                className="text-xs font-medium text-[#24151a]"
              >
                What should your Garba partner know about you?
              </label>

            </div>

            <textarea
              id="prompt2"
              value={prompt2}
              onChange={(e) => {
                setPrompt2(e.target.value);
                setError("");
              }}
              maxLength={150}
              rows={2}
              placeholder="I'm always ready for one more round..."
              className="w-full resize-none rounded-xl border border-[#741337]/10 bg-[#fffaf2] px-3 py-2.5 text-xs leading-relaxed outline-none transition placeholder:text-[#24151a]/30 focus:border-[#ed7137] focus:ring-2 focus:ring-[#ed7137]/10"
            />

            <div className="mt-1 flex justify-end">
              <span className="text-[9px] text-[#24151a]/35">
                {prompt2.length}/150
              </span>
            </div>

          </div>

          {/* ================= BUTTONS ================= */}

          <div className="flex items-center gap-3 pt-1">

            {/* Back */}
            <button
              type="button"
              onClick={onBack}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#741337]/10 bg-[#fffaf2] text-[#741337] transition hover:border-[#ed7137]"
              aria-label="Go back"
            >
              <ArrowLeft size={17} />
            </button>

            {/* NEXT */}
            <button
              type="submit"
              className="group flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#741337] text-sm font-medium text-white shadow-lg shadow-[#741337]/15 transition hover:bg-[#5d0e2b] active:scale-[0.99]"
            >
              Next

              <ArrowRight
                size={17}
                className="transition group-hover:translate-x-1"
              />
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
