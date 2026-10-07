"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FiPlus,
  FiMusic,
  FiHeart,
  FiMessageCircle,
  FiX,
} from "react-icons/fi";

import Background from "@/components/matchingpage/backgroundblur";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function RaasMitraLikesView() {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(true);
 const [matchMessage, setMatchMessage] = useState("");
  // Popup
  const [selectedLike, setSelectedLike] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [profilePhotoIndex, setProfilePhotoIndex] = useState(0);

  // Match loading
  const [matching, setMatching] = useState(false);
  const router = useRouter();

  // ============================================
  // GET LIKES
  // ============================================
const openChat = async (match) => {
  try {
    const profileId = match.profileId;

    const response = await fetch(
      `/api/conversations/with-profile/${profileId}`,
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error(
        "Open chat failed:",
        data.message
      );
      return;
    }

    router.push(
      `/chat?conversationId=${data.conversation._id}`
    );
  } catch (error) {
    console.error(
      "Open chat error:",
      error
    );
  }
};

const getLikedProfiles = async () => {
  try {
    setLoading(true);

    const response = await fetch("/api/getLikedprof", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    // Read as text first so an empty/non-JSON response doesn't crash with
    // "Unexpected end of JSON input".
    const text = await response.text();

    console.log("GET LIKES STATUS:", response.status);
    console.log("GET LIKES RESPONSE:", text);

    if (!text) {
      throw new Error(
        `Empty response from /api/discoverFunctions/likes (HTTP ${response.status})`
      );
    }

    let data;

    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error("INVALID JSON FROM GET LIKES:", text);
      throw new Error("Server returned invalid JSON.");
    }

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to get likes.");
    }

    const receivedLikes = data.likes || [];

    setLikes(receivedLikes);

    // Open popup automatically if at least one like exists
    if (receivedLikes.length > 0) {
      setSelectedLike(receivedLikes[0]);
      setShowPopup(true);
    }
  } catch (error) {
    console.error("GET LIKES ERROR:", error);
    setLikes([]);
  } finally {
    setLoading(false);
  }
};

const matchWithUser = async () => {
  if (!selectedLike || matching) {
    return;
  }

  try {
    setMatching(true);
    setMatchMessage("");

    const response = await fetch(
      "/api/discoverFunctions/match",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likeId: selectedLike.likeId,
        }),
      }
    );

    const data = await response.json();

    console.log("MATCH STATUS:", response.status);
    console.log("MATCH RESPONSE:", data);

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Could not create match."
      );
    }

    // Remove the matched like from the UI.
    // IMPORTANT:
    // If your likes state has a different name,
    // replace `setReceivedLikes` with that setter.
   

    setShowPopup(false);
    setSelectedLike(null);

    setMatchMessage(
      data.message || "You matched successfully!"
    );

    setTimeout(() => {
      setMatchMessage("");
    }, 3000);
  } catch (error) {
    console.error("MATCH ERROR:", error);

    setMatchMessage(
      error.message || "Could not create match."
    );

    setTimeout(() => {
      setMatchMessage("");
    }, 3000);
  } finally {
    setMatching(false);
  }
};

 const fetchMatches = async () => {
    try {
      setLoadingMatches(true);

      const res = await fetch("/api/getchatprofiles", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      console.log("data hi idhar");
      console.log(data);
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch matches");
      }

      setMatches(data.matches || []);
    } catch (error) {
      console.error("FETCH MATCHES ERROR:", error);
      setMatches([]);
    } finally {
      setLoadingMatches(false);
    }
  };


{matchMessage && (
  <div>
    {matchMessage}
  </div>
)}


  // ============================================
  // LOAD LIKES
  // ============================================

  useEffect(() => {
    getLikedProfiles();

    fetchMatches();
  }, []);


  // ============================================
  // CLOSE POPUP
  // ============================================

  const closePopup = () => {
    setShowPopup(false);
    setSelectedLike(null);
  };

  // ============================================
  // MATCH WITH USER
  // ============================================



  // ============================================
  // VISIT PROFILE
  // ============================================

  const visitProfile = () => {
    if (!selectedLike?.from?.profileId) {
      return;
    }

    console.log(
      "VISIT PROFILE:",
      selectedLike.from.profileId
    );

    // Put your profile route here.
    // Example:
    //
    // router.push(
    //   `/profile/${selectedLike.from.profileId}`
    // );
  };

  const previewProfile = selectedLike?.from;

const previewImages =
  Array.isArray(previewProfile?.images) && previewProfile.images.length > 0
    ? previewProfile.images
    : ["/default-avatar.png"];

const currentPreviewImage =
  previewImages[profilePhotoIndex] || "/default-avatar.png";

const nextPreviewPhoto = () => {
  if (previewImages.length <= 1) return;

  setProfilePhotoIndex(
    (current) => (current + 1) % previewImages.length
  );
};

const previousPreviewPhoto = () => {
  if (previewImages.length <= 1) return;

  setProfilePhotoIndex(
    (current) =>
      (current - 1 + previewImages.length) %
      previewImages.length
  );
};

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">

      {/* Background */}
      <div className="fixed min-h-screen inset-0 z-10">
        <Background />
      </div>

      {/* Main container */}
      <div className="w-full max-w-[412px] pb-2 inset-0 z-50 min-h-screen sm:h-[100vh] sm:rounded-[40px] bg-[#fdfbf7] flex flex-col overflow-hidden shadow-2xl relative">

        {/* Header */}
        <div className="px-5 pt-5 pb-2 flex justify-between items-center bg-[#fdfbf7]">
          <div className="flex items-center flex-row-reverse w-full gap-2 rounded-full">

            <div className="bg-[#4a1525]/10 flex rounded-2xl px-3 py-1.5">

              <FiHeart
                className="text-[#4a1525] fill-[#4a1525]"
                size={16}
              />

              <span className="text-xs ml-2 font-bold text-[#4a1525]">
                {matches.length} Likes
              </span>

            </div>
          </div>
        </div>

        {/* Share Your Vibe */}
        {/* <div className="h-[24%] min-h-[150px] px-5 border-b border-[#eae5de] flex flex-col justify-center bg-[#fdfbf7]">

          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Share Your Vibe
          </p> */}

          {/* <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none"> */}

            {/* Add Story */}
            <div className="flex flex-col items-center flex-shrink-0 cursor-pointer group">

              {/* <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#4a1525]/40 flex items-center justify-center bg-white group-hover:border-[#4a1525] transition-colors">

                <FiPlus
                  className="text-[#4a1525]"
                  size={22}
                />

              </div> */}

              {/* <span className="text-[11px] font-medium text-gray-700 mt-1.5">
                Add Story
              </span> */}

            {/* </div> */}

            {/* Add Song */}
            {/* <div className="flex flex-col items-center flex-shrink-0 cursor-pointer group"> */}

              {/* <div className="w-14 h-14 rounded-full bg-[#4a1525] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">

                <FiMusic
                  className="text-white"
                  size={20}
                />

              </div> */}

              {/* <span className="text-[11px] font-medium text-gray-700 mt-1.5">
                Add Song
              </span> */}

            {/* </div> */}

          {/* </div> */}
        </div>

        {/* Likes */}
        <div className="flex-1 overflow-y-auto p-5 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#4a1525]/20 [&::-webkit-scrollbar-thumb]:rounded-full">

          <div className="flex justify-between items-center mb-4">

            {/* <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              People who liked you
            </h2> */}

            <span className="text-xs font-semibold text-[#4a1525] bg-[#4a1525]/10 px-2 py-0.5 rounded-md">
              Recent
            </span>

          </div>

          {/* Loading */}
          {loading ?(
            <div className="text-center py-10">

              <p className="text-sm text-gray-500">
                Loading likes...
              </p>

            </div>
          ):(<div>
            {/* Matches */}
<div className="mt-6">

  <div className="flex justify-between items-center mb-4">
    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
      Your Matches
    </h2>

    <span className="text-xs font-semibold text-[#4a1525] bg-[#4a1525]/10 px-2 py-0.5 rounded-md">
      {matches.length}
    </span>
  </div>

  {loadingMatches ? (
    <div className="text-center py-6">
      <p className="text-sm text-gray-500">
        Loading matches...
      </p>
    </div>
  ) : matches.length === 0 ? (
    <div className="text-center py-6">
      <FiHeart
        className="mx-auto text-[#4a1525]/30"
        size={35}
      />

      <p className="text-sm text-gray-500 mt-3">
        No matches yet.
      </p>
    </div>
  ) : (
    <div className="space-y-3">

      {matches.map((match) => (
//        <div
//   key={String(match.profileId)}
//   onClick={() => {
//     router.push(`/chat?userId=${match.profileId}`);
//   }}
//   className="bg-white p-3.5 rounded-2xl border border-[#eae5de] shadow-sm flex items-center justify-between hover:border-[#4a1525]/30 transition-all cursor-pointer group"
// >
<div
  key={String(match.profileId)}
  onClick={() => openChat(match)}
  className="bg-white p-3.5 rounded-2xl border border-[#eae5de] shadow-sm flex items-center justify-between hover:border-[#4a1525]/30 transition-all cursor-pointer group"
>

          <div className="flex items-center gap-3.5">

            {/* Image */}
            <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-[#eae5de]">

              <Image
                src={
                  match.images[0] ||
                  "/default-avatar.png"
                }
                alt={
                  match.username ||
                  "Profile"
                }
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute bottom-0 right-0 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow">
                <FiHeart
                  className="text-[#4a1525] fill-[#4a1525]"
                  size={10}
                />
              </div>

            </div>

            {/* Name */}
            <div>
              <h3 className="text-base font-bold text-gray-900">
                {match.username || "Unknown"}
              </h3>

              <p className="text-xs text-gray-600 mt-0.5">
                {match.status || "Connected"}
              </p>
            </div>

          </div>

          {/* Message */}
          {/* <button
            className="w-10 h-10 rounded-full bg-[#f7f3ed] flex items-center justify-center text-[#4a1525] group-hover:bg-[#4a1525] group-hover:text-white transition-colors"
          >
            <FiMessageCircle size={18} />
          </button> */}

          {/* <button
  onClick={(e) => {
    e.stopPropagation();
    router.push(`/chat?userId=${match.profileId}`);
  }}
  className="w-10 h-10 rounded-full bg-[#f7f3ed] flex items-center justify-center text-[#4a1525] group-hover:bg-[#4a1525] group-hover:text-white transition-colors"
>
  <FiMessageCircle size={18} />
</button> */}

<button
  onClick={(e) => {
    e.stopPropagation();
    openChat(match);
  }}
  className="w-10 h-10 rounded-full bg-[#f7f1ec] flex items-center justify-center text-[#4a1525] hover:bg-[#4a1525] hover:text-white transition-all"
>
  <FiMessageCircle size={18} />
</button>

        </div>
      ))}

    </div>
  )}

</div>
          </div>)}

          {/* Empty */}
          {!loading && likes.length === 0 && (
            <div className="text-center py-10">

              {/* <FiHeart
                className="mx-auto text-[#4a1525]/30"
                size={40}
              />

              <p className="text-sm text-gray-500 mt-3">
                No one has liked you yet.
              </p> */}

            </div>
          )}

          {/* Likes */}
          {!loading && likes.length > 0 && (
            <div className="space-y-3">

              {likes.map((like) => {

                const profile = like.from;

                const image =
                  profile?.images?.[0] ||
                  "/default-avatar.png";

                return (
                  <div
                    key={String(like.likeId)}
                    // onClick={() => {
                    //   setSelectedLike(like);
                    //   setShowPopup(true);
                    // }}
                    onClick={() => {
  setSelectedLike(like);
  setProfilePhotoIndex(0);
  setShowPopup(true);
}}
                    className="bg-white p-3.5 rounded-2xl border border-[#eae5de] shadow-sm flex items-center justify-between hover:border-[#4a1525]/30 transition-all cursor-pointer group"
                  >

                    <div className="flex items-center gap-3.5">

                      {/* Profile image */}
                      <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-[#eae5de]">

                        <Image
                          src={image}
                          alt={
                            profile?.username ||
                            "Profile"
                          }
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow">

                          <FiHeart
                            className="text-[#4a1525] fill-[#4a1525]"
                            size={10}
                          />

                        </div>

                      </div>

                      {/* Profile info */}
                      <div>

                        <h3 className="text-base font-bold text-gray-900 leading-tight">
                          {profile?.username ||
                            "Unknown"}
                        </h3>

                        <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">

                          {like.comment
                            ? like.comment
                            : `Liked your ${
                                like.targetType ||
                                "profile"
                              }`}

                        </p>

                      </div>

                    </div>

                    {/* Message */}
                    <div className="w-10 h-10 rounded-full bg-[#f7f3ed] flex items-center justify-center text-[#4a1525] group-hover:bg-[#4a1525] group-hover:text-white transition-colors">

                      <FiMessageCircle
                        size={18}
                      />

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

        {/* Navbar */}
        <div className="inset-0 z-50 mt-3">
          <Navbar />
        </div>

      </div>

      {/* ================================================= */}
      {/* LIKE POPUP */}
      {/* ================================================= */}

     {showPopup && selectedLike && previewProfile && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-4">

    {/* BACKDROP */}
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={closePopup}
    />

    {/* PROFILE MODAL */}
    <div className="
      relative
      w-full max-w-[400px]
      max-h-[92vh]
      bg-[#fdfbf7]
      rounded-[30px]
      shadow-2xl
      overflow-hidden
      flex flex-col
    ">

      {/* CLOSE BUTTON */}
      <button
        type="button"
        onClick={closePopup}
        className="
          absolute top-4 right-4 z-30
          w-10 h-10 rounded-full
          bg-black/40 backdrop-blur-md
          text-white
          flex items-center justify-center
          hover:bg-[#4a1525]
          transition
        "
      >
        <FiX size={20} />
      </button>

      {/* SCROLLABLE PROFILE */}
      <div className="flex-1 overflow-y-auto">

        {/* ================= PHOTO ================= */}

        <div className="relative w-full h-[430px] bg-gray-100">

          <Image
            src={currentPreviewImage}
            alt={previewProfile.username || "Profile"}
            fill
            className="object-cover"
          />

          {/* IMAGE PROGRESS */}
          {previewImages.length > 1 && (
            <div className="absolute top-4 left-4 right-16 flex gap-1 z-20">
              {previewImages.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full ${
                    index === profilePhotoIndex
                      ? "bg-white"
                      : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}

          {/* PREVIOUS IMAGE */}
          {previewImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                previousPreviewPhoto();
              }}
              className="
                absolute left-3 top-1/2
                -translate-y-1/2
                w-9 h-9
                rounded-full
                bg-black/30
                text-white
                flex items-center justify-center
                hover:bg-black/50
                transition
              "
            >
              ←
            </button>
          )}

          {/* NEXT IMAGE */}
          {previewImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextPreviewPhoto();
              }}
              className="
                absolute right-3 top-1/2
                -translate-y-1/2
                w-9 h-9
                rounded-full
                bg-black/30
                text-white
                flex items-center justify-center
                hover:bg-black/50
                transition
              "
            >
              →
            </button>
          )}

          {/* NAME GRADIENT */}
          <div className="
            absolute bottom-0 left-0 right-0
            pt-24 pb-5 px-5
            bg-gradient-to-t
            from-black/80 via-black/30 to-transparent
          ">
            <h1 className="text-3xl font-black text-white">
              {previewProfile.username || "Unknown"}
            </h1>

            <p className="text-sm text-white/80 mt-1">
              {previewProfile.semester &&
                `Semester ${previewProfile.semester}`}

              {previewProfile.semester &&
                previewProfile.branch &&
                " • "}

              {previewProfile.branch}
            </p>
          </div>
        </div>

        {/* ================= PROFILE INFO ================= */}

        <div className="px-5 pt-5 pb-28">

          {/* SOMEONE LIKED YOU */}
          <div className="
            flex items-center gap-3
            bg-[#4a1525]/5
            border border-[#4a1525]/10
            rounded-2xl
            p-4
          ">
            <div className="
              w-10 h-10
              rounded-full
              bg-[#4a1525]/10
              flex items-center justify-center
            ">
              <FiHeart
                size={19}
                className="text-[#4a1525] fill-[#4a1525]"
              />
            </div>

            <div>
              <p className="text-sm font-bold text-gray-900">
                {previewProfile.username} liked you
              </p>

              <p className="text-xs text-gray-500 mt-0.5">
                Liked your {selectedLike.targetType || "profile"}
              </p>
            </div>
          </div>

          {/* COMMENT */}
          {selectedLike.comment && (
            <div className="
              mt-3
              bg-white
              border border-[#eae5de]
              rounded-2xl
              p-4
            ">
              <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400">
                Their message
              </p>

              <p className="text-sm font-medium text-gray-800 mt-2">
                "{selectedLike.comment}"
              </p>
            </div>
          )}

          {/* ================= BASIC INFO ================= */}

          <div className="mt-6">

            <h3 className="
              text-[11px]
              font-bold
              uppercase
              tracking-wider
              text-gray-400
              mb-3
            ">
              About
            </h3>

            <div className="grid grid-cols-2 gap-2.5">

              <div className="rounded-xl bg-[#f7f3ed] p-3">
                <p className="text-[11px] text-gray-400">
                  Height
                </p>

                <p className="mt-1 text-sm font-bold text-gray-900">
                  {previewProfile.height
                    ? `${previewProfile.height} cm`
                    : "—"}
                </p>
              </div>

              <div className="rounded-xl bg-[#f7f3ed] p-3">
                <p className="text-[11px] text-gray-400">
                  Branch
                </p>

                <p className="mt-1 text-sm font-bold text-gray-900">
                  {previewProfile.branch || "—"}
                </p>
              </div>

              <div className="rounded-xl bg-[#f7f3ed] p-3">
                <p className="text-[11px] text-gray-400">
                  Semester
                </p>

                <p className="mt-1 text-sm font-bold text-gray-900">
                  {previewProfile.semester || "—"}
                </p>
              </div>

              <div className="rounded-xl bg-[#f7f3ed] p-3">
                <p className="text-[11px] text-gray-400">
                  Gender
                </p>

                <p className="mt-1 text-sm font-bold text-gray-900">
                  {previewProfile.gender || "—"}
                </p>
              </div>

            </div>

            {/* COLLEGE */}
            <div className="mt-2.5 rounded-xl bg-[#f7f3ed] p-3">

              <p className="text-[11px] text-gray-400">
                College
              </p>

              <p className="mt-1 text-sm font-bold text-gray-900">
                {previewProfile.college || "—"}
              </p>

            </div>

          </div>

          {/* ================= INTERESTS ================= */}

          {Array.isArray(previewProfile.interests) &&
            previewProfile.interests.length > 0 && (

            <div className="mt-6">

              <h3 className="
                text-[11px]
                font-bold
                uppercase
                tracking-wider
                text-gray-400
                mb-3
              ">
                Interests
              </h3>

              <div className="flex flex-wrap gap-2">

                {previewProfile.interests.map(
                  (interest, index) => (

                    <span
                      key={`${interest}-${index}`}
                      className="
                        px-3 py-1.5
                        rounded-full
                        bg-[#4a1525]/10
                        text-[#4a1525]
                        text-xs
                        font-semibold
                      "
                    >
                      {interest}
                    </span>

                  )
                )}

              </div>

            </div>

          )}

          {/* ================= PROMPTS ================= */}

          {Array.isArray(previewProfile.prompts) &&
            previewProfile.prompts.length > 0 && (

            <div className="mt-7">

              <h3 className="
                text-[11px]
                font-bold
                uppercase
                tracking-wider
                text-gray-400
                mb-3
              ">
                Get to know {previewProfile.username}
              </h3>

              <div className="space-y-3">

                {previewProfile.prompts.map(
                  (prompt, index) => (

                    <div
                      key={
                        prompt._id ||
                        prompt.id ||
                        index
                      }
                      className="
                        bg-white
                        border border-[#eae5de]
                        rounded-2xl
                        p-4
                      "
                    >

                      <p className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-gray-400
                      ">
                        {prompt.question}
                      </p>

                      <p className="
                        text-sm
                        font-semibold
                        text-gray-900
                        leading-relaxed
                        mt-2
                      ">
                        {prompt.answer}
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

          )}

        </div>
      </div>

      {/* ================= BOTTOM ACTIONS ================= */}

      <div className="
        absolute
        bottom-0 left-0 right-0
        bg-[#fdfbf7]/95
        backdrop-blur-md
        border-t border-[#eae5de]
        px-5 py-4
        flex gap-3
      ">

        {/* PASS */}
        <button
          type="button"
          onClick={closePopup}
          disabled={matching}
          className="
            w-14 h-14
            flex-shrink-0
            rounded-full
            border-2 border-gray-200
            flex items-center justify-center
            text-gray-500
            hover:border-gray-400
            hover:text-gray-800
            transition
          "
        >
          <FiX size={23} />
        </button>

        {/* MATCH */}
        <button
          type="button"
          onClick={matchWithUser}
          disabled={matching}
          className="
            flex-1 h-14
            rounded-full
            bg-[#4a1525]
            text-white
            font-bold
            flex items-center justify-center
            gap-2
            hover:bg-[#35101b]
            transition
            disabled:opacity-60
          "
        >
          <FiHeart
            size={19}
            className="fill-white"
          />

          {matching
            ? "Matching..."
            : `Match with ${
                previewProfile.username || "them"
              }`}
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
}






