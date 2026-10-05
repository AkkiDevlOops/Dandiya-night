"use client";



import React, { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";



import {

  FiHeart,

  FiChevronLeft,

  FiChevronRight,

  FiMoreHorizontal,

  FiFlag,

  FiSlash,

  FiSend,

  FiX,

} from "react-icons/fi";



export default function RaasMitraProfile() {

  const [profiles, setProfiles] = useState([]);

  const [loading, setLoading] = useState(true);

  const [processing, setProcessing] = useState(false);

  const [error, setError] = useState("");



  const [currentIndex, setCurrentIndex] = useState(0);



  // Main image currently selected

  const [photoIndex, setPhotoIndex] = useState(0);



  const [showMenu, setShowMenu] = useState(false);

  const [showReport, setShowReport] = useState(false);



  const [showComment, setShowComment] = useState(false);

  const [comment, setComment] = useState("");



  const [likeTarget, setLikeTarget] = useState({

    type: "profile",

    id: null,

    photoIndex: null,

    promptId: null,

  });



  const [lastSkipped, setLastSkipped] = useState(null);



  const currentProfile = profiles[currentIndex];



  // =========================================================

  // HELPERS

  // =========================================================



  const getImages = (profile) => {

    if (!Array.isArray(profile?.images)) return [];



    return profile.images

      .filter(

        (image) =>

          typeof image === "string" &&

          image.trim().length > 0

      )

      .slice(0, 6);

  };



  const getPrompts = (profile) => {

    if (!Array.isArray(profile?.prompts)) return [];



    return profile.prompts

      .filter(

        (prompt) =>

          prompt &&

          typeof prompt.question === "string" &&

          typeof prompt.answer === "string" &&

          prompt.question.trim() &&

          prompt.answer.trim()

      )

      .slice(0, 6);

  };



  const calculateAge = (dob) => {

    if (!dob) return null;



    const birthDate = new Date(dob);



    if (Number.isNaN(birthDate.getTime())) {

      return null;

    }



    const today = new Date();



    let age =

      today.getFullYear() -

      birthDate.getFullYear();



    const monthDifference =

      today.getMonth() -

      birthDate.getMonth();



    if (

      monthDifference < 0 ||

      (monthDifference === 0 &&

        today.getDate() < birthDate.getDate())

    ) {

      age--;

    }



    return age >= 0 ? age : null;

  };



  // =========================================================

  // GET PROFILES

  // =========================================================



  const getProfiles = async () => {

    try {

      setLoading(true);

      setError("");



      const response = await fetch(

        "/api/chatgptroute",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          credentials: "include",

          body: JSON.stringify({

            action: "discover",

            limit: 10,

          }),

        }

      );



      const data = await response.json();



      console.log("DISCOVERY RESPONSE:", data);



      if (!response.ok || !data.success) {

        if (response.status === 401 || data.redirect) {

          window.location.href =

            data.url || "/login";

          return;

        }



        throw new Error(

          data.message ||

            data.error ||

            "Failed to load profiles."

        );

      }



      // Only keep profiles compatible with new schema

      const validProfiles = (data.users || [])

        .map((profile) => ({

          ...profile,

          images: getImages(profile),

          prompts: getPrompts(profile),

          interests: Array.isArray(profile.interests)

            ? profile.interests

            : [],

        }))

        .filter(

          (profile) =>

            profile.images.length >= 3 &&

            profile.images.length <= 6 &&

            profile.prompts.length >= 3 &&

            profile.prompts.length <= 6

        );



      setProfiles(validProfiles);

      setCurrentIndex(0);

      setPhotoIndex(0);

    } catch (error) {

      console.error(

        "DISCOVERY ERROR:",

        error

      );



      setError(

        error.message ||

          "Could not load profiles."

      );

    } finally {

      setLoading(false);

    }

  };



  // =========================================================

  // INITIAL LOAD

  // =========================================================



  useEffect(() => {

    getProfiles();

  }, []);



  // =========================================================

  // NEXT PROFILE

  // =========================================================



  const nextProfile = () => {

    setPhotoIndex(0);

    setShowMenu(false);

    setShowReport(false);

    setShowComment(false);

    setComment("");



    setCurrentIndex(

      (current) => current + 1

    );

  };



  // =========================================================

  // REMOVE CURRENT PROFILE

  // =========================================================



  const removeCurrentProfile = () => {

    setProfiles((currentProfiles) =>

      currentProfiles.filter(

        (_, index) =>

          index !== currentIndex

      )

    );



    setPhotoIndex(0);

  };



  // =========================================================

  // SKIP

  // =========================================================



  const skipProfile = async () => {

    if (!currentProfile || processing) {

      return;

    }



    try {

      setProcessing(true);



      const response = await fetch(

        "/api/",

        {

          method: "POST",

          headers: {

            "Content-Type":

              "application/json",

          },

          body: JSON.stringify({

            action: "skip",

            profileId:

              currentProfile._id,

          }),

        }

      );



      // Keep existing behavior.

      // If your skip route returns an error,

      // uncomment validation below.



      /*

      const data = await response.json();



      if (!response.ok || !data.success) {

        throw new Error(

          data.message ||

            "Could not skip profile."

        );

      }

      */



      setLastSkipped({

        profile: currentProfile,

        index: currentIndex,

      });



      removeCurrentProfile();

    } catch (error) {

      console.error(error);



      alert(

        error.message ||

          "Could not skip this profile."

      );

    } finally {

      setProcessing(false);

    }

  };



  // =========================================================

  // UNDO SKIP

  // =========================================================



  const undoSkip = async () => {

    if (!lastSkipped || processing) {

      return;

    }



    try {

      setProcessing(true);



      const response = await fetch(

        "/api/",

        {

          method: "POST",

          headers: {

            "Content-Type":

              "application/json",

          },

          body: JSON.stringify({

            action: "undo",

            profileId:

              lastSkipped.profile._id,

          }),

        }

      );



      const data =

        await response.json();



      if (!response.ok || !data.success) {

        throw new Error(

          data.message ||

            "Could not undo skip."

        );

      }



      setProfiles((currentProfiles) => {

        const updated = [

          ...currentProfiles,

        ];



        updated.splice(

          Math.min(

            lastSkipped.index,

            updated.length

          ),

          0,

          lastSkipped.profile

        );



        return updated;

      });



      setCurrentIndex(

        Math.min(

          lastSkipped.index,

          profiles.length

        )

      );



      setLastSkipped(null);

    } catch (error) {

      console.error(error);



      alert(

        error.message ||

          "Could not undo."

      );

    } finally {

      setProcessing(false);

    }

  };



  // =========================================================

  // LIKE PROFILE

  // =========================================================



  const likeProfile = () => {

    if (!currentProfile || processing) {

      return;

    }



    setLikeTarget({

      type: "profile",

      id: String(currentProfile._id),

      photoIndex: null,

      promptId: null,

    });



    setShowComment(true);

  };



  // =========================================================

  // LIKE PHOTO

  // =========================================================



  const likePhoto = (index) => {

    if (!currentProfile || processing) {

      return;

    }



    const photos =

      getImages(currentProfile);



    if (!photos[index]) {

      return;

    }



    setLikeTarget({

      type: "photo",

      id: String(currentProfile._id),

      photoIndex: index,

      promptId: null,

    });



    setShowComment(true);

  };



  // =========================================================

  // LIKE PROMPT

  // =========================================================



  const likePrompt = (prompt, index) => {

    if (!currentProfile || processing) {

      return;

    }



    setLikeTarget({

      type: "prompt",

      id: String(currentProfile._id),

      photoIndex: null,

      promptId:

        prompt?._id ||

        String(index),

    });



    setShowComment(true);

  };



  // =========================================================

  // SUBMIT LIKE

  // =========================================================



  const submitLike = async () => {

    if (

      !currentProfile ||

      processing

    ) {

      return;

    }



    try {

      setProcessing(true);



      const photos =

        getImages(currentProfile);



      const response = await fetch(

        "/api/discoverFunctions/likes",

        {

          method: "POST",

          headers: {

            "Content-Type":

              "application/json",

          },

          credentials: "include",



          body: JSON.stringify({

            action: "like",



            targetType:

              likeTarget.type,



            targetId:

              String(currentProfile._id),



            targetIdphoto:

              likeTarget.type === "photo"

                ? photos[

                    likeTarget.photoIndex

                  ] || null

                : photos[0] || null,



            targetIdName:

              currentProfile.username,



            comment:

              comment.trim(),

          }),

        }

      );



      const data =

        await response.json();



      console.log(

        "LIKE RESPONSE:",

        data

      );



      if (

        data.message ===

        "You already Liked this profile"

      ) {

        setError(

          "You already liked this profile."

        );



        setShowComment(false);



        setTimeout(() => {

          setError("");

          nextProfile();

        }, 1500);



        return;

      }



      if (

        !response.ok ||

        !data.success

      ) {

        throw new Error(

          data.message ||

            data.error ||

            "Could not send like."

        );

      }



      setShowComment(false);

      setComment("");



      nextProfile();

    } catch (error) {

      console.error(

        "LIKE ERROR:",

        error

      );



      setError(

        error.message ||

          "Could not send like."

      );



      setTimeout(() => {

        setError("");

      }, 3000);

    } finally {

      setProcessing(false);

    }

  };



  // =========================================================

  // BLOCK

  // =========================================================



  const blockProfile = async () => {

    if (!currentProfile || processing) {

      return;

    }



    const confirmed = window.confirm(

      "Block this profile? You won't see them again."

    );



    if (!confirmed) {

      return;

    }



    try {

      setProcessing(true);



      const response = await fetch(

        "/api/discoverFunctions/blocked",

        {

          method: "POST",

          headers: {

            "Content-Type":

              "application/json",

          },

          body: JSON.stringify({

            profileId:

              currentProfile._id,

          }),

        }

      );



      const data =

        await response.json();



      if (

        !response.ok ||

        !data.success

      ) {

        throw new Error(

          data.message ||

            "Could not block profile."

        );

      }



      setShowMenu(false);



      removeCurrentProfile();

    } catch (error) {

      console.error(

        "BLOCK ERROR:",

        error

      );



      alert(

        error.message ||

          "Could not block profile."

      );

    } finally {

      setProcessing(false);

    }

  };



  // =========================================================

  // REPORT

  // =========================================================



  const reportProfile = async (reason) => {

    if (!currentProfile || processing) {

      return;

    }



    try {

      setProcessing(true);



      const response = await fetch(

        "/api/",

        {

          method: "POST",

          headers: {

            "Content-Type":

              "application/json",

          },

          body: JSON.stringify({

            action: "report",

            profileId:

              currentProfile._id,

            reason,

          }),

        }

      );



      const data =

        await response.json();



      if (

        !response.ok ||

        !data.success

      ) {

        throw new Error(

          data.message ||

            "Could not report profile."

        );

      }



      setShowReport(false);

      setShowMenu(false);



      removeCurrentProfile();



      alert(

        "Thank you. This profile has been reported."

      );

    } catch (error) {

      console.error(error);



      alert(

        error.message ||

          "Could not report profile."

      );

    } finally {

      setProcessing(false);

    }

  };



  // =========================================================

  // PHOTO NAVIGATION

  // =========================================================



  const nextPhoto = () => {

    if (!currentProfile) {

      return;

    }



    const photos =

      getImages(currentProfile);



    if (!photos.length) {

      return;

    }



    setPhotoIndex(

      (current) =>

        (current + 1) %

        photos.length

    );

  };



  const previousPhoto = () => {

    if (!currentProfile) {

      return;

    }



    const photos =

      getImages(currentProfile);



    if (!photos.length) {

      return;

    }



    setPhotoIndex(

      (current) =>

        (current - 1 + photos.length) %

        photos.length

    );

  };



  // =========================================================

  // LOADING

  // =========================================================



  if (loading) {

    return (

      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center">

        <div className="text-center">

          <div className="w-10 h-10 border-4 border-[#4a1525]/20 border-t-[#4a1525] rounded-full animate-spin mx-auto" />



          <p className="mt-4 text-gray-600">

            Finding people for you...

          </p>

        </div>

      </div>

    );

  }



  // =========================================================

  // ERROR

  // =========================================================



  if (error && !currentProfile) {

    return (

      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center px-6">

        <div className="text-center">

          <h2 className="text-xl font-bold text-[#4a1525]">

            {error}

          </h2>



          <button

            onClick={getProfiles}

            className="mt-5 px-6 py-3 rounded-full bg-[#4a1525] text-white font-semibold"

          >

            Try Again

          </button>

        </div>

      </div>

    );

  }



  // =========================================================

  // NO MORE PROFILES

  // =========================================================



  if (!currentProfile) {

    return (

      <div className="min-h-screen bg-[#fdfbf7] flex flex-col">

        <div className="flex-1 flex items-center justify-center px-6">

          <div className="text-center max-w-sm">

            <div className="text-6xl mb-5">

              💜

            </div>



            <h2 className="text-2xl font-extrabold text-[#4a1525]">

              You've reached the end

            </h2>



            <p className="mt-3 text-gray-600">

              You've seen everyone

              available right now.

              Check back later for

              new people.

            </p>



            <button

              onClick={getProfiles}

              className="mt-6 px-7 py-3 rounded-full bg-[#4a1525] text-white font-semibold"

            >

              Refresh

            </button>

          </div>

        </div>



        <Navbar />

      </div>

    );

  }



  // =========================================================

  // CURRENT DATA

  // =========================================================



  const photos =

    getImages(currentProfile);



  const prompts =

    getPrompts(currentProfile);



  const interests =

    Array.isArray(currentProfile.interests)

      ? currentProfile.interests

      : [];



  const age =

    currentProfile.age ??

    calculateAge(

      currentProfile.dateOfBirth

    );



  const currentImage =

    photos[photoIndex] ||

    photos[0] ||

    "/default-profile.jpg";



  // =========================================================

  // MAIN UI

  // =========================================================



  return (

    <div className="flex justify-center bg-[#fdfbf7]">

      <div className="min-h-screen w-full max-w-md bg-[#fdfbf7]">

        <div className="max-w-md mx-auto min-h-screen">



          {/* =================================================

              HEADER

          ================================================= */}



          <div className="flex items-center justify-between px-5 pt-7 pb-4">

            <div>

              <h1 className="text-2xl font-black text-[#4a1525]">

                Raas Mitra

              </h1>



              <p className="text-xs text-gray-500 mt-1">

                Discover people

              </p>

            </div>



            <button

              onClick={() =>

                setShowMenu(

                  (current) => !current

                )

              }

              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5"

            >

              <FiMoreHorizontal

                size={25}

              />

            </button>

          </div>



          {/* =================================================

              PROFILE CARD

          ================================================= */}



          <div className="px-4 pb-32">

            <div

              key={currentProfile._id}

              className="bg-white rounded-[28px] overflow-hidden shadow-lg border border-gray-100"

            >



              {/* =================================================

                  PROFILE HEADER

              ================================================= */}



              <div className="px-5 pt-5 pb-4">

                <div className="flex items-start justify-between">



                  <div>

                    <div className="flex items-center gap-2">

                      <h2 className="text-3xl font-black text-gray-900">

                        {currentProfile.username}

                      </h2>



                      {age !== null && (

                        <span className="text-2xl font-medium text-gray-500">

                          {age}

                        </span>

                      )}

                    </div>



                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">

                      {currentProfile.branch && (

                        <span>

                          {currentProfile.branch}

                        </span>

                      )}



                      {currentProfile.semester && (

                        <>

                          <span>•</span>

                          <span>

                            {currentProfile.semester}

                          </span>

                        </>

                      )}

                    </div>

                  </div>



                  <button

                    onClick={() =>

                      setShowMenu(

                        (current) =>

                          !current

                      )

                    }

                    className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center shrink-0"

                  >

                    <FiMoreHorizontal />

                  </button>

                </div>

              </div>



              {/* =================================================
                  DYNAMIC PHOTO → PROMPT TIMELINE

                  Photo 1
                  Prompt 1
                  Photo 2
                  Prompt 2
                  Photo 3
                  Prompt 3
                  Photo 4
                  Prompt 4
                  Photo 5
                  Prompt 5
                  Photo 6
                  Prompt 6
              ================================================= */}

              <div className="px-5">
                {Array.from({
                  length: Math.max(photos.length, prompts.length),
                }).map((_, index) => (
                  <React.Fragment key={`timeline-${index}`}>
                    {photos[index] && (
                      <PhotoCard
                        image={photos[index]}
                        username={currentProfile.username}
                        photoIndex={index}
                        totalPhotos={photos.length}
                        onPrevious={() => {}}
                        onNext={() => {}}
                        onLike={() => likePhoto(index)}
                        showNavigation={false}
                      />
                    )}

                    {prompts[index] && (
                      <PromptCard
                        prompt={prompts[index]}
                        index={index}
                        onLike={() =>
                          likePrompt(prompts[index], index)
                        }
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* =================================================

                  INTRO

              ================================================= */}



              {currentProfile.intro && (

                <div className="px-5 pt-7">

                  <SectionTitle>

                    About

                  </SectionTitle>



                  <div className="rounded-2xl bg-[#fdfbf7] border border-gray-100 p-5">

                    <p className="text-[15px] leading-7 text-gray-700">

                      {currentProfile.intro}

                    </p>

                  </div>

                </div>

              )}



              {/* =================================================

                  INTERESTS

              ================================================= */}



              {interests.length > 0 && (

                <div className="px-5 pt-7">

                  <SectionTitle>

                    Interests

                  </SectionTitle>



                  <div className="flex flex-wrap gap-2">

                    {interests.map(

                      (interest) => (

                        <span

                          key={interest}

                          className="rounded-full border border-[#741337]/10 bg-[#fffaf2] px-4 py-2 text-sm text-[#741337]"

                        >

                          {interest}

                        </span>

                      )

                    )}

                  </div>

                </div>

              )}



              {/* =================================================

                  BASIC DETAILS

              ================================================= */}



              <div className="px-5 pt-7 pb-7">

                <SectionTitle>

                  Details

                </SectionTitle>



                <div className="grid grid-cols-2 gap-3">



                  {currentProfile.college && (

                    <InfoBox

                      label="College"

                      value={

                        currentProfile.college

                      }

                    />

                  )}



                  {currentProfile.branch && (

                    <InfoBox

                      label="Branch"

                      value={

                        currentProfile.branch

                      }

                    />

                  )}



                  {currentProfile.semester && (

                    <InfoBox

                      label="Semester"

                      value={

                        currentProfile.semester

                      }

                    />

                  )}



                  {currentProfile.gender && (

                    <InfoBox

                      label="Gender"

                      value={

                        currentProfile.gender

                      }

                    />

                  )}



                  {currentProfile.height && (

                    <InfoBox

                      label="Height"

                      value={`${currentProfile.height} cm`}

                    />

                  )}



                  {age !== null && (

                    <InfoBox

                      label="Age"

                      value={`${age} years`}

                    />

                  )}

                </div>

              </div>



              {/* =================================================

                  PROFILE LIKE

              ================================================= */}



              <div className="px-5 pb-7">

                <button

                  onClick={

                    likeProfile

                  }

                  disabled={processing}

                  className="w-full rounded-2xl bg-[#741337] py-4 text-white font-semibold shadow-lg hover:bg-[#62102e] transition disabled:opacity-50"

                >

                  <span className="flex items-center justify-center gap-2">

                    <FiHeart

                      size={20}

                    />

                    Like this profile

                  </span>

                </button>

              </div>



            </div>

          </div>

        </div>



        {/* =====================================================

            MORE MENU

        ===================================================== */}



        {showMenu && (

          <div className="fixed inset-0 z-50">

            <div

              className="absolute inset-0 bg-black/20"

              onClick={() =>

                setShowMenu(false)

              }

            />



            <div className="absolute right-4 top-20 w-64 rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">



              <button

                onClick={() => {

                  setShowMenu(false);

                  skipProfile();

                }}

                disabled={processing}

                className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-gray-50"

              >

                <FiChevronRight />

                <span>

                  Skip profile

                </span>

              </button>



              {lastSkipped && (

                <button

                  onClick={() => {

                    setShowMenu(false);

                    undoSkip();

                  }}

                  disabled={processing}

                  className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-gray-50"

                >

                  <FiChevronLeft />

                  <span>

                    Undo last skip

                  </span>

                </button>

              )}



              <button

                onClick={() => {

                  setShowReport(true);

                }}

                disabled={processing}

                className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-gray-50"

              >

                <FiFlag />

                <span>

                  Report profile

                </span>

              </button>



              <button

                onClick={blockProfile}

                disabled={processing}

                className="w-full px-5 py-4 flex items-center gap-3 text-left text-red-600 hover:bg-red-50"

              >

                <FiSlash />

                <span>

                  Block profile

                </span>

              </button>

            </div>

          </div>

        )}



        {/* =====================================================

            REPORT MODAL

        ===================================================== */}



        {showReport && (

          <div className="fixed inset-0 z-[60] bg-black/40 flex items-end sm:items-center justify-center p-4">

            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl">



              <div className="flex items-center justify-between mb-5">

                <h3 className="text-xl font-bold text-[#4a1525]">

                  Report profile

                </h3>



                <button

                  onClick={() =>

                    setShowReport(false)

                  }

                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"

                >

                  <FiX />

                </button>

              </div>



              <p className="text-sm text-gray-500 mb-5">

                Why are you reporting

                this profile?

              </p>



              {[

                "Fake profile",

                "Harassment",

                "Inappropriate content",

                "Spam",

                "Something else",

              ].map((reason) => (

                <button

                  key={reason}

                  onClick={() =>

                    reportProfile(

                      reason

                    )

                  }

                  disabled={processing}

                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-sm border-b border-gray-100 last:border-0"

                >

                  {reason}

                </button>

              ))}

            </div>

          </div>

        )}



        {/* =====================================================

            COMMENT / LIKE MODAL

        ===================================================== */}



        {showComment && (

          <div className="fixed inset-0 z-[70] bg-black/40 flex items-end sm:items-center justify-center p-4">

            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl">



              <div className="flex items-center justify-between mb-5">

                <div>

                  <h3 className="text-xl font-bold text-[#4a1525]">

                    Send a like

                  </h3>



                  <p className="text-xs text-gray-500 mt-1">

                    Add a message if you

                    want.

                  </p>

                </div>



                <button

                  onClick={() => {

                    setShowComment(false);

                    setComment("");

                  }}

                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"

                >

                  <FiX />

                </button>

              </div>



              <textarea

                value={comment}

                onChange={(e) =>

                  setComment(

                    e.target.value

                  )

                }

                maxLength={500}

                rows={4}

                placeholder="Write something nice..."

                className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#741337]"

              />



              <div className="mt-2 text-right text-xs text-gray-400">

                {comment.length}/500

              </div>



              <button

                onClick={submitLike}

                disabled={processing}

                className="mt-4 w-full rounded-2xl bg-[#741337] py-4 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"

              >

                <FiSend size={18} />



                {processing

                  ? "Sending..."

                  : "Send Like"}

              </button>

            </div>

          </div>

        )}



        {/* =====================================================

            NAVBAR

        ===================================================== */}



        <Navbar />

      </div>

    </div>

  );

}



// =============================================================

// PHOTO CARD

// =============================================================



function PhotoCard({

  image,

  username,

  photoIndex,

  totalPhotos,

  onPrevious,

  onNext,

  onLike,

  showNavigation,

}) {

  return (

    <div className="relative">



      <img

        src={image}

        alt={

          username || "Profile"

        }

        className="w-full h-[58vh] object-cover"

      />



      {/* Progress indicators */}



      {totalPhotos > 1 && (

        <div className="absolute top-4 left-4 right-4 flex gap-1">

          {Array.from({

            length: totalPhotos,

          }).map((_, index) => (

            <div

              key={index}

              className={`h-1 flex-1 rounded-full ${

                index === photoIndex

                  ? "bg-white"

                  : "bg-white/40"

              }`}

            />

          ))}

        </div>

      )}



      {/* Previous */}



      {showNavigation &&

        totalPhotos > 1 && (

          <button

            onClick={onPrevious}

            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center backdrop-blur-sm"

          >

            <FiChevronLeft

              size={24}

            />

          </button>

        )}



      {/* Next */}



      {showNavigation &&

        totalPhotos > 1 && (

          <button

            onClick={onNext}

            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center backdrop-blur-sm"

          >

            <FiChevronRight

              size={24}

            />

          </button>

        )}



      {/* Like */}



      <button

        onClick={onLike}

        className="absolute bottom-5 right-5 w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform"

      >

        <FiHeart

          size={28}

          className="text-red-500"

        />

      </button>



      {/* Photo number */}



      <div className="absolute bottom-5 left-5 rounded-full bg-black/40 backdrop-blur-sm px-3 py-1.5 text-xs text-white">

        {photoIndex + 1} /{" "}

        {totalPhotos}

      </div>

    </div>

  );

}



// =============================================================

// PROMPT CARD

// =============================================================



function PromptCard({

  prompt,

  index,

  onLike,

}) {

  return (

    <div className="py-7">



      <button

        onClick={onLike}

        className="w-full text-left rounded-3xl border border-[#741337]/10 bg-[#fffaf2] p-5 hover:border-[#741337]/30 transition"

      >



        <div className="flex items-center justify-between">

          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#741337]/45">

            Prompt {index + 1}

          </span>



          <div className="w-9 h-9 rounded-full bg-white border border-[#741337]/10 flex items-center justify-center">

            <FiHeart

              size={17}

              className="text-red-400"

            />

          </div>

        </div>



        <p className="mt-4 text-base font-semibold text-[#4a1525] leading-6">

          {prompt.question}

        </p>



        <p className="mt-3 text-[15px] leading-7 text-gray-700">

          {prompt.answer}

        </p>



      </button>

    </div>

  );

}



// =============================================================

// SECTION TITLE

// =============================================================



function SectionTitle({

  children,

}) {

  return (

    <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#741337]/45">

      {children}

    </h3>

  );

}



// =============================================================

// INFO BOX

// =============================================================



function InfoBox({

  label,

  value,

}) {

  return (

    <div className="rounded-2xl border border-gray-100 bg-[#fdfbf7] p-4">

      <p className="text-[10px] uppercase tracking-wider text-gray-400">

        {label}

      </p>



      <p className="mt-1 text-sm font-medium text-gray-800 break-words">

        {value}

      </p>

    </div>

  );

}





// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Navbar from '@/components/Navbar'
// import { ArrowLeft } from "lucide-react";
// import { useRouter } from "next/navigation";
// /* =========================================================
//    INTERESTS
// ========================================================= */

// const INTERESTS = [
//   "Music",
//   "Movies",
//   "TV",
//   "Books",
//   "Travel",
//   "Food",
//   "Sports",
//   "Gaming",
//   "Photography",
//   "Art",
//   "Fitness",
//   "Cooking",
//   "Dancing",
//   "Hiking",
//   "Pets",
//   "Fashion",
//   "Technology",
//   "Business",
//   "Cars",
//   "Nature",
//   "Nightlife",
//   "Coffee",
//   "Volunteering",
//   "Reading",
//   "Writing",
//   "Cricket",
//   "Football",
//   "Badminton",
//   "Basketball",
//   "Trekking",
//   "Road Trips",
//   "Beaches",
//   "Mountains",
//   "Anime",
//   "Podcasts",
//   "Memes",
//   "Startups",
//   "Coding",
//   "Design",
//   "Content Creation",
//   "Fitness Training",
//   "Yoga",
//   "Meditation",
//   "Dance",
//   "Fashion Design",
//   "Concerts",
//   "Festivals",
//   "Garba",
//   "Dandiya",
// ];

// /* =========================================================
//    PROMPT TYPES
// ========================================================= */

// const PROMPT_TYPES = [
//   {
//     value: "text",
//     label: "Text",
//   },
//   {
//     value: "voice",
//     label: "Voice",
//   },
//   {
//     value: "video",
//     label: "Video",
//   },
//   {
//     value: "poll",
//     label: "Poll",
//   },
// ];

// /* =========================================================
//    DEFAULT PROMPT
// ========================================================= */

// const createEmptyPrompt = () => ({
//   question: "",
//   answer: "",
//   type: "text",
// });

// /* =========================================================
//    HELPERS
// ========================================================= */

// const normalizeProfile = (profile) => {
//   if (!profile) return null;

//   return {
//     username: profile.username || "",
//     branch: profile.branch || "",
//     semester: profile.semester || "",
//     college: profile.college || "",
//     gender: profile.gender || "",

//     dateOfBirth: profile.dateOfBirth
//       ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
//       : "",

//     intro: profile.intro || "",

//     interests: Array.isArray(profile.interests)
//       ? profile.interests
//       : [],

//     prompts: Array.isArray(profile.prompts)
//       ? profile.prompts.map((prompt) => ({
//           _id: prompt._id,
//           question: prompt.question || "",
//           answer: prompt.answer || "",
//           type: ["text", "voice", "video", "poll"].includes(prompt.type)
//             ? prompt.type
//             : "text",
//         }))
//       : [],

//     images: Array.isArray(profile.images)
//       ? profile.images
//       : [],
//   };
// };

// /* =========================================================
//    MAIN PAGE
// ========================================================= */

// export default function MyProfilePage() {
//   /* -------------------------------------------------------
//      PROFILE / ACCOUNT DATA
//   ------------------------------------------------------- */

//   const [user, setUser] = useState({
//     username: "",
//     branch: "",
//     semester: "",
//     college: "",
//     gender: "",
//   });

//   /* -------------------------------------------------------
//      EDITABLE PROFILE STATE
//   ------------------------------------------------------- */

//   const [profileData, setProfileData] = useState({
//     dateOfBirth: "",
//     intro: "",
//     interests: [],
//     prompts: [],
//     images: [],
//   });

//   /* -------------------------------------------------------
//      UI STATES
//   ------------------------------------------------------- */

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [loggingOut, setLoggingOut] = useState(false);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [showMoreInterests, setShowMoreInterests] =
//     useState(false);

//   const [activePhotoIndex, setActivePhotoIndex] =
//     useState(null);

//   const fileInputRef = useRef(null);
//   const router = useRouter();
//   /* =======================================================
//      GET PROFILE
//   ======================================================= */

//   useEffect(() => {
//     getProfile();
//   }, []);

//   const getProfile = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetch("/api/myprofile", {
//         method: "GET",
//         credentials: "include",
//         cache: "no-store",
//       });

//       const data = await res.json();
//       console.log(data);
//       if (!res.ok) {
//         throw new Error(
//           data.error || "Failed to load profile."
//         );
//       }

//       const profile =
//         data.user ||
//         data.profile ||
//         data.users;

//       if (!profile) {
//         throw new Error("Profile data not found.");
//       }

//       const normalized = normalizeProfile(profile);

//       /* -----------------------------------------------
//          LOCKED USER INFORMATION
//       ------------------------------------------------ */

//       setUser({
//         username: normalized.username,
//         branch: normalized.branch,
//         semester: normalized.semester,
//         college: normalized.college,
//         gender: normalized.gender,
//       });

//       /* -----------------------------------------------
//          EDITABLE PROFILE INFORMATION
//       ------------------------------------------------ */

//       setProfileData({
//         dateOfBirth: normalized.dateOfBirth,
//         intro: normalized.intro,
//         interests: normalized.interests,
//         prompts: normalized.prompts,
//         images: normalized.images,
//       });
//     } catch (err) {
//       console.error("Get profile error:", err);

//       setError(
//         err.message || "Unable to load your profile."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =======================================================
//      GENERIC STATE UPDATE
//   ======================================================= */

//   const updateProfileState = (updates) => {
//     setProfileData((prev) => ({
//       ...prev,
//       ...updates,
//     }));

//     // Clear old messages when user starts editing
//     setSuccess("");
//     setError("");
//   };

//   /* =======================================================
//      DATE OF BIRTH
//   ======================================================= */

//   const handleDateChange = (value) => {
//     updateProfileState({
//       dateOfBirth: value,
//     });
//   };

//   /* =======================================================
//      INTRO
//   ======================================================= */

//   const handleIntroChange = (value) => {
//     if (value.length > 500) return;

//     updateProfileState({
//       intro: value,
//     });
//   };

//   /* =======================================================
//      INTERESTS
//   ======================================================= */

//   const toggleInterest = (interest) => {
//     setProfileData((prev) => {
//       const exists = prev.interests.includes(interest);

//       const updatedInterests = exists
//         ? prev.interests.filter(
//             (item) => item !== interest
//           )
//         : [...prev.interests, interest];

//       return {
//         ...prev,
//         interests: updatedInterests,
//       };
//     });

//     setSuccess("");
//     setError("");
//   };

//   const clearAllInterests = () => {
//     updateProfileState({
//       interests: [],
//     });
//   };

//   const visibleInterests = showMoreInterests
//     ? INTERESTS
//     : INTERESTS.slice(0, 16);

//   /* =======================================================
//      PROMPTS
//   ======================================================= */

//   const addPrompt = () => {
//     if (profileData.prompts.length >= 6) {
//       return;
//     }

//     updateProfileState({
//       prompts: [
//         ...profileData.prompts,
//         createEmptyPrompt(),
//       ],
//     });
//   };

//   const updatePrompt = (
//     index,
//     field,
//     value
//   ) => {
//     setProfileData((prev) => {
//       const prompts = [...prev.prompts];

//       prompts[index] = {
//         ...prompts[index],
//         [field]: value,
//       };

//       return {
//         ...prev,
//         prompts,
//       };
//     });

//     setSuccess("");
//     setError("");
//   };

//   const removePrompt = (index) => {
//     setProfileData((prev) => ({
//       ...prev,
//       prompts: prev.prompts.filter(
//         (_, i) => i !== index
//       ),
//     }));

//     setSuccess("");
//     setError("");
//   };

//   /* =======================================================
//      IMAGE HANDLING
     
//      NOTE:
//      This stores image as base64 in React state.
//      Your backend can later receive it with Update Profile.
//   ======================================================= */

//   const openImagePicker = (index) => {
//     setActivePhotoIndex(index);

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//       fileInputRef.current.click();
//     }
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setError("Please select a valid image.");
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setError("Image must be smaller than 5MB.");
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = () => {
//       const imageData = reader.result;

//       setProfileData((prev) => {
//         const images = [...prev.images];

//         images[activePhotoIndex] = imageData;

//         return {
//           ...prev,
//           images,
//         };
//       });

//       setSuccess("");
//       setError("");
//     };

//     reader.onerror = () => {
//       setError("Failed to read image.");
//     };

//     reader.readAsDataURL(file);
//   };

//   const removeImage = (index) => {
//     setProfileData((prev) => {
//       const images = [...prev.images];

//       images.splice(index, 1);

//       return {
//         ...prev,
//         images,
//       };
//     });

//     setSuccess("");
//     setError("");
//   };

//   /* =======================================================
//      UPDATE PROFILE
     
//      THIS IS THE ONLY PLACE WHERE PROFILE DATA IS SENT
//      TO THE BACKEND.
//   ======================================================= */

//   const handleUpdateProfile = async () => {
//     try {
//       setSaving(true);
//       setError("");
//       setSuccess("");

//       /* -----------------------------------------------
//          CLEAN PROMPTS BEFORE SENDING
//       ------------------------------------------------ */

//       const cleanedPrompts =
//         profileData.prompts
//           .slice(0, 6)
//           .map((prompt) => ({
//             ...(prompt._id
//               ? { _id: prompt._id }
//               : {}),
//             question:
//               String(
//                 prompt.question || ""
//               ).trim(),

//             answer:
//               String(
//                 prompt.answer || ""
//               ).trim(),

//             type: [
//               "text",
//               "voice",
//               "video",
//               "poll",
//             ].includes(prompt.type)
//               ? prompt.type
//               : "text",
//           }))
//           .filter(
//             (prompt) =>
//               prompt.question ||
//               prompt.answer
//           );

//       /* -----------------------------------------------
//          PAYLOAD
         
//          Username / branch / semester / college are
//          intentionally NOT included.
//       ------------------------------------------------ */

//       const payload = {
//         dateOfBirth:
//           profileData.dateOfBirth || null,

//         intro:
//           profileData.intro.trim(),

//         interests:
//           profileData.interests,

//         prompts:
//           cleanedPrompts,

//         images:
//           profileData.images,
//       };

//       console.log(
//         "Updating profile:",
//         payload
//       );

//       const res = await fetch(
//         "/api/updateprofile",
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type":
//               "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify(payload),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(
//           data.error ||
//             "Failed to update profile."
//         );
//       }

//       /* -----------------------------------------------
//          UPDATE STATE WITH BACKEND RESPONSE
//       ------------------------------------------------ */

//       const updatedProfile =
//         data.user ||
//         data.profile ||
//         data.users;

//       if (updatedProfile) {
//         const normalized =
//           normalizeProfile(
//             updatedProfile
//           );

//         setUser({
//           username:
//             normalized.username,

//           branch:
//             normalized.branch,

//           semester:
//             normalized.semester,

//           college:
//             normalized.college,

//           gender:
//             normalized.gender,
//         });

//         setProfileData({
//           dateOfBirth:
//             normalized.dateOfBirth,

//           intro:
//             normalized.intro,

//           interests:
//             normalized.interests,

//           prompts:
//             normalized.prompts,

//           images:
//             normalized.images,
//         });
//       } else {
//         /* ---------------------------------------------
//            If backend doesn't return profile,
//            keep our current state but normalize prompts.
//         --------------------------------------------- */

//         setProfileData((prev) => ({
//           ...prev,
//           prompts: cleanedPrompts,
//         }));
//       }

//       setSuccess(
//         "Profile updated successfully."
//       );
//     } catch (err) {
//       console.error(
//         "Update profile error:",
//         err
//       );

//       setError(
//         err.message ||
//           "Something went wrong while updating your profile."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* =======================================================
//      LOGOUT
//   ======================================================= */

//   const handleLogout = async () => {
//     try {
//       setLoggingOut(true);
//       setError("");

//       const res = await fetch(
//         "/api/logout",
//         {
//           method: "POST",
//           credentials: "include",
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(
//           data.error ||
//             "Logout failed."
//         );
//       }

//       window.location.href = "/login";
//     } catch (err) {
//       console.error(
//         "Logout error:",
//         err
//       );

//       setError(
//         err.message ||
//           "Unable to logout."
//       );

//       setLoggingOut(false);
//     }
//   };

//   /* =======================================================
//      AGE CALCULATOR
//   ======================================================= */

//   const calculateAge = (dob) => {
//     if (!dob) return null;

//     const birthDate =
//       new Date(dob);

//     if (Number.isNaN(
//       birthDate.getTime()
//     )) {
//       return null;
//     }

//     const today =
//       new Date();

//     let age =
//       today.getFullYear() -
//       birthDate.getFullYear();

//     const monthDifference =
//       today.getMonth() -
//       birthDate.getMonth();

//     if (
//       monthDifference < 0 ||
//       (monthDifference === 0 &&
//         today.getDate() <
//           birthDate.getDate())
//     ) {
//       age--;
//     }

//     return age;
//   };

//   const age = calculateAge(
//     profileData.dateOfBirth
//   );

//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (loading) {
//     return (
//       <main className="min-h-screen inset-0 z-60 fixed bg-[#fffaf2] flex items-center justify-center">
//         <div className="text-center">
//           <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#741337]/20 border-t-[#741337]" />

//           <p className="text-sm text-[#741337]/60">
//             Loading your profile...
//           </p>
//         </div>
//       </main>
//     );
//   }

//   /* =======================================================
//      PAGE
//   ======================================================= */
// // text-[#741337]
//   return (
//     <main className="min-h-screen inset-0 z-50 fixed overflow-y-auto  [&::-webkit-scrollbar]:hidden px-4 py-8 text-white sm:px-6 lg:px-8">
      
//       <div className="mx-auto max-w-2xl">

//         {/* =================================================
//             HEADER
//         ================================================= */}
        
//         <div className="mb-8">
//           <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
//             Your profile
//           </p>

//           <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
//             Edit Profile
//           </h1>

//           <p className="mt-2 max-w-xl text-sm leading-6 text-red-400">
//             {/* Make your profile feel more like you.
//             Changes will only be saved when you
//             press Update Profile. */}
//           </p>
//         </div>

//         {/* =================================================
//             ERROR
//         ================================================= */}

//         {error && (
//           <div className="mb-5 rounded-2xl  border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
//             {error}
//           </div>
//         )}

//         {/* =================================================
//             SUCCESS
//         ================================================= */}

//         {success && (
//           <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
//             {success}
//           </div>
//         )}

//         {/* =================================================
//             PROFILE CARD
//         ================================================= */}

//         <section className="rounded-[28px] border border-[#741337]/8 bg-white text-[#741337] p-5 shadow-[0_10px_40px_rgba(116,19,55,0.06)] sm:p-7">
//           <div className="flex "><div><button onClick={()=>router.push("/testroute")}><ArrowLeft/></button></div><div className="mx-2"><h1><a href="/testroute">Get Back to explore Page</a></h1></div></div>
//           {/* ===============================================
//               PHOTOS
//           =============================================== */}

//           <ProfileSection 
          
//             number="01"
//             title="Photos"
//             description="Choose the photos people will see on your profile."
//           >

//             <div className="grid grid-cols-3  gap-3 sm:grid-cols-6">

//               {Array.from({
//                 length: 6,
//               }).map((_, index) => {
//                 const image =
//                   profileData.images[
//                     index
//                   ];

//                 return (
//                   <div
//                     key={index}
//                     className="relative aspect-[3/4]"
//                   >
//                     {image ? (
//                       <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-[#f7efe8]">

//                         <img
//                           src={image}
//                           alt={`Profile photo ${
//                             index + 1
//                           }`}
//                           className="h-full w-full object-cover"
//                         />

//                         <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100">
//                           <div className="mb-2 flex gap-1">
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 openImagePicker(
//                                   index
//                                 )
//                               }
//                               className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#741337] "
//                             >
//                               Change
//                             </button>

//                             <button
//                               type="button"
//                               onClick={() =>
//                                 removeImage(
//                                   index
//                                 )
//                               }
//                               className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-red-600"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <button
//                         type="button"
//                         onClick={() =>
//                           openImagePicker(
//                             index
//                           )
//                         }
//                         className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#741337]/15 bg-[#fffaf2] text-[#741337]/50 transition hover:border-[#741337]/35 hover:bg-[#fdf3e9]"
//                       >
//                         <span className="text-2xl">
//                           +
//                         </span>

//                         <span className="mt-1 text-[11px]">
//                           Add
//                         </span>
//                       </button>
//                     )}
//                   </div>
//                 );
//               })}

//             </div>

//             <p className="mt-3 text-xs text-[#741337]/40">
//               Maximum 5MB per image.
//             </p>

//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="hidden"
//             />
//           </ProfileSection>

//           {/* ===============================================
//               BASIC INFORMATION
//           =============================================== */}

//           <ProfileSection
//             number="02"
//             title="Basic Information"
//             description="Some account information is fixed and cannot be edited here."
//           >

//             <div className="grid gap-4 sm:grid-cols-2">

//               {/* Username */}

//               <LockedField
//                 label="Username"
//                 value={
//                   user.username
//                 }
//               />

//               {/* Branch */}

//               <LockedField
//                 label="Branch"
//                 value={
//                   user.branch
//                 }
//               />

//               {/* Semester */}

//               <LockedField
//                 label="Year / Semester"
//                 value={
//                   user.semester
//                 }
//               />

//               {/* College */}

//               <LockedField
//                 label="College"
//                 value={
//                   user.college
//                 }
//               />

//             </div>
//           </ProfileSection>

//           {/* ===============================================
//               AGE / DOB
//           =============================================== */}

//           <ProfileSection
//             number="03"
//             title="Age"
//             description="Your date of birth is used to calculate your age."
//           >

//             <div className="grid gap-4 sm:grid-cols-2">

//               <div>
//                 <label className="mb-2 block text-sm font-medium">
//                   Date of Birth
//                 </label>

//                 <input
//                   type="date"
//                   value={
//                     profileData.dateOfBirth
//                   }
//                   onChange={(e) =>
//                     handleDateChange(
//                       e.target.value
//                     )
//                   }
//                   className="w-full rounded-2xl border border-[#741337]/10 bg-[#fffaf2] px-4 py-3 text-sm outline-none transition focus:border-[#741337]/30"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium">
//                   Age
//                 </label>

//                 <div className="flex h-[46px] items-center rounded-2xl border border-[#741337]/10 bg-[#f7efe8] px-4 text-sm">
//                   {age !== null
//                     ? `${age} years`
//                     : "Select your date of birth"}
//                 </div>
//               </div>

//             </div>
//           </ProfileSection>

//           {/* ===============================================
//               INTRO
//           =============================================== */}

//           <ProfileSection
//             number="04"
//             title="About You"
//             description="Give people a small idea of who you are."
//           >

//             <div>
//               <label className="mb-2 block text-sm font-medium">
//                 Intro
//               </label>

//               <textarea
//                 value={
//                   profileData.intro
//                 }
//                 onChange={(e) =>
//                   handleIntroChange(
//                     e.target.value
//                   )
//                 }
//                 maxLength={500}
//                 rows={5}
//                 placeholder="Tell people something about yourself..."
//                 className="w-full resize-none rounded-2xl border border-[#741337]/10 bg-[#fffaf2] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[#741337]/30 focus:border-[#741337]/30"
//               />

//               <div className="mt-2 text-right text-xs text-[#741337]/35">
//                 {
//                   profileData.intro
//                     .length
//                 }
//                 /500
//               </div>
//             </div>
//           </ProfileSection>

//           {/* ===============================================
//               INTERESTS
//           =============================================== */}

//           <ProfileSection
//             number="05"
//             title="Interests & Personality"
//             description="Tap interests to select or remove them."
//           >

//             <div className="flex items-center justify-between gap-3">

//               <p className="text-xs text-[#741337]/45">
//                 {
//                   profileData.interests
//                     .length
//                 }{" "}
//                 selected
//               </p>

//               {profileData.interests
//                 .length > 0 && (
//                 <button
//                   type="button"
//                   onClick={
//                     clearAllInterests
//                   }
//                   className="text-xs font-medium text-[#741337]/55 underline underline-offset-4"
//                 >
//                   Clear all
//                 </button>
//               )}

//             </div>

//             <div className="mt-4 flex flex-wrap gap-2">

//               {visibleInterests.map(
//                 (interest) => {
//                   const selected =
//                     profileData.interests.includes(
//                       interest
//                     );

//                   return (
//                     <button
//                       key={interest}
//                       type="button"
//                       onClick={() =>
//                         toggleInterest(
//                           interest
//                         )
//                       }
//                       className={`rounded-full border px-4 py-2 text-sm transition ${
//                         selected
//                           ? "border-[#741337] bg-[#741337] text-white shadow-sm"
//                           : "border-[#741337]/8 bg-[#fffaf2] text-[#741337]/55 hover:border-[#741337]/20 hover:text-[#741337]"
//                       }`}
//                     >
//                       {interest}
//                     </button>
//                   );
//                 }
//               )}

//             </div>

//             <button
//               type="button"
//               onClick={() =>
//                 setShowMoreInterests(
//                   (prev) => !prev
//                 )
//               }
//               className="mt-5 text-sm font-semibold underline underline-offset-4"
//             >
//               {showMoreInterests
//                 ? "Show less"
//                 : "More interests"}
//             </button>

//           </ProfileSection>

//           {/* ===============================================
//               PROMPTS
//           =============================================== */}

//           <ProfileSection
//             number="06"
//             title="Prompts"
//             description="Add up to 6 prompts to show more personality."
//           >

//             <div className="space-y-5">

//               {profileData.prompts.map(
//                 (prompt, index) => (
//                   <PromptCard
//                     key={
//                       prompt._id ||
//                       index
//                     }
//                     prompt={prompt}
//                     index={index}
//                     onChange={
//                       updatePrompt
//                     }
//                     onRemove={
//                       removePrompt
//                     }
//                   />
//                 )
//               )}

//             </div>

//             {profileData.prompts
//               .length < 6 && (
//               <button
//                 type="button"
//                 onClick={addPrompt}
//                 className="mt-5 w-full rounded-2xl border border-dashed border-[#741337]/15 bg-[#fffaf2] py-4 text-sm font-semibold transition hover:border-[#741337]/30 hover:bg-[#fdf3e9]"
//               >
//                 + Add another prompt
//               </button>
//             )}

//             <p className="mt-3 text-xs text-[#741337]/40">
//               {
//                 profileData.prompts
//                   .length
//               }{" "}
//               / 6 prompts
//             </p>

//           </ProfileSection>

//           {/* ===============================================
//               UPDATE + LOGOUT
//           =============================================== */}

//           <div className="mt-8 border-t border-[#741337]/8 pt-7">

//             <button
//               type="button"
//               onClick={
//                 handleUpdateProfile
//               }
//               disabled={
//                 saving ||
//                 loggingOut
//               }
//               className="w-full rounded-full bg-[#741337] py-4 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(116,19,55,0.18)] transition hover:bg-[#62102e] disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {saving
//                 ? "Updating Profile..."
//                 : "Update Profile"}
//             </button>

//             <button
//               type="button"
//               onClick={
//                 handleLogout
//               }
//               disabled={
//                 saving ||
//                 loggingOut
//               }
//               className="mt-4 w-full rounded-full border border-red-200 bg-white py-4 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loggingOut
//                 ? "Logging out..."
//                 : "Logout"}
//             </button>

//           </div>

//         </section>

//       </div>
//     </main>
//   );
// }

// /* =========================================================
//    PROFILE SECTION
// ========================================================= */

// function ProfileSection({
//   number,
//   title,
//   description,
//   children,
// }) {
//   return (
//     <section className="border-b border-[#741337]/8 py-7 first:pt-0 last:border-b-0">

//       <div className="mb-5 flex gap-4">

//         <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#741337]/8 text-xs font-semibold">
//           {number}
//         </div>

//         <div>
//           <h2 className="text-lg font-semibold">
//             {title}
//           </h2>

//           {description && (
//             <p className="mt-1 text-sm leading-5 text-[#741337]/45">
//               {description}
//             </p>
//           )}
//         </div>

//       </div>

//       {children}

//     </section>
//   );
// }

// /* =========================================================
//    LOCKED FIELD
// ========================================================= */

// function LockedField({
//   label,
//   value,
// }) {
//   return (
//     <div>
//       <label className="mb-2 block text-sm font-medium">
//         {label}
//       </label>

//       <div className="flex min-h-[46px] items-center justify-between rounded-2xl border border-[#741337]/8 bg-[#f7efe8] px-4">

//         <span className="text-sm text-[#741337]/65">
//           {value || "—"}
//         </span>

//         <span className="text-[10px] font-semibold uppercase tracking-wider text-[#741337]/30">
//           Locked
//         </span>

//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    PROMPT CARD
// ========================================================= */

// function PromptCard({
//   prompt,
//   index,
//   onChange,
//   onRemove,
// }) {
//   return (
//     <div className="rounded-3xl border border-[#741337]/8 bg-[#fffaf2] p-4 sm:p-5">

//       {/* HEADER */}

//       <div className="mb-4 flex items-center justify-between">

//         <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#741337]/40">
//           Prompt {index + 1}
//         </span>

//         <button
//           type="button"
//           onClick={() =>
//             onRemove(index)
//           }
//           className="text-xs font-medium text-red-500"
//         >
//           Remove
//         </button>

//       </div>

//       {/* QUESTION */}

//       <div>
//         <label className="mb-2 block text-sm font-medium">
//           Question
//         </label>

//         <input
//           type="text"
//           value={
//             prompt.question
//           }
//           onChange={(e) =>
//             onChange(
//               index,
//               "question",
//               e.target.value
//             )
//           }
//           placeholder="e.g. My ideal Sunday is..."
//           className="w-full rounded-2xl border border-[#741337]/10 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#741337]/25 focus:border-[#741337]/30"
//         />
//       </div>

//       {/* TYPE */}

//       <div className="mt-4">

//         <label className="mb-2 block text-sm font-medium">
//           Response type
//         </label>

//         <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

//           {PROMPT_TYPES.map(
//             (type) => {
//               const selected =
//                 prompt.type ===
//                 type.value;

//               return (
//                 <button
//                   key={
//                     type.value
//                   }
//                   type="button"
//                   onClick={() =>
//                     onChange(
//                       index,
//                       "type",
//                       type.value
//                     )
//                   }
//                   className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${
//                     selected
//                       ? "border-[#741337] bg-[#741337] text-white"
//                       : "border-[#741337]/8 bg-white text-[#741337]/50 hover:border-[#741337]/20"
//                   }`}
//                 >
//                   {type.label}
//                 </button>
//               );
//             }
//           )}

//         </div>

//       </div>

//       {/* ANSWER */}

//       <div className="mt-4">

//         <label className="mb-2 block text-sm font-medium">
//           Answer
//         </label>

//         {prompt.type ===
//         "text" ? (
//           <textarea
//             value={
//               prompt.answer
//             }
//             onChange={(e) =>
//               onChange(
//                 index,
//                 "answer",
//                 e.target.value
//               )
//             }
//             rows={4}
//             placeholder="Write your answer..."
//             className="w-full resize-none rounded-2xl border border-[#741337]/10 bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[#741337]/25 focus:border-[#741337]/30"
//           />
//         ) : prompt.type ===
//           "voice" ? (
//           <div className="rounded-2xl border border-dashed border-[#741337]/15 bg-white px-4 py-6 text-center">

//             <div className="text-2xl">
//               🎙️
//             </div>

//             <p className="mt-2 text-sm font-medium">
//               Voice answer
//             </p>

//             <p className="mt-1 text-xs text-[#741337]/40">
//               Voice upload can be connected
//               to your media upload API.
//             </p>

//           </div>
//         ) : prompt.type ===
//           "video" ? (
//           <div className="rounded-2xl border border-dashed border-[#741337]/15 bg-white px-4 py-6 text-center">

//             <div className="text-2xl">
//               🎥
//             </div>

//             <p className="mt-2 text-sm font-medium">
//               Video answer
//             </p>

//             <p className="mt-1 text-xs text-[#741337]/40">
//               Video upload can be connected
//               to your media upload API.
//             </p>

//           </div>
//         ) : (
//           <div className="rounded-2xl border border-dashed border-[#741337]/15 bg-white px-4 py-6 text-center">

//             <div className="text-2xl">
//               📊
//             </div>

//             <p className="mt-2 text-sm font-medium">
//               Poll
//             </p>

//             <p className="mt-1 text-xs text-[#741337]/40">
//               Poll options can be added
//               when the poll system is connected.
//             </p>

//           </div>
//         )}

//       </div>

//     </div>
//   );
// }













// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Navbar from '@/components/Navbar'
// import { ArrowLeft } from "lucide-react";
// import { useRouter } from "next/navigation";
// /* =========================================================
//    INTERESTS
// ========================================================= */

// const INTERESTS = [
//   "Music",
//   "Movies",
//   "TV",
//   "Books",
//   "Travel",
//   "Food",
//   "Sports",
//   "Gaming",
//   "Photography",
//   "Art",
//   "Fitness",
//   "Cooking",
//   "Dancing",
//   "Hiking",
//   "Pets",
//   "Fashion",
//   "Technology",
//   "Business",
//   "Cars",
//   "Nature",
//   "Nightlife",
//   "Coffee",
//   "Volunteering",
//   "Reading",
//   "Writing",
//   "Cricket",
//   "Football",
//   "Badminton",
//   "Basketball",
//   "Trekking",
//   "Road Trips",
//   "Beaches",
//   "Mountains",
//   "Anime",
//   "Podcasts",
//   "Memes",
//   "Startups",
//   "Coding",
//   "Design",
//   "Content Creation",
//   "Fitness Training",
//   "Yoga",
//   "Meditation",
//   "Dance",
//   "Fashion Design",
//   "Concerts",
//   "Festivals",
//   "Garba",
//   "Dandiya",
// ];

// /* =========================================================
//    PROMPT TYPES
// ========================================================= */

// const PROMPT_TYPES = [
//   {
//     value: "text",
//     label: "Text",
//   },
//   {
//     value: "voice",
//     label: "Voice",
//   },
//   {
//     value: "video",
//     label: "Video",
//   },
//   {
//     value: "poll",
//     label: "Poll",
//   },
// ];

// /* =========================================================
//    DEFAULT PROMPT
// ========================================================= */

// const createEmptyPrompt = () => ({
//   question: "",
//   answer: "",
//   type: "text",
// });

// /* =========================================================
//    HELPERS
// ========================================================= */

// const normalizeProfile = (profile) => {
//   if (!profile) return null;

//   return {
//     username: profile.username || "",
//     branch: profile.branch || "",
//     semester: profile.semester || "",
//     college: profile.college || "",
//     gender: profile.gender || "",

//     dateOfBirth: profile.dateOfBirth
//       ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
//       : "",

//     intro: profile.intro || "",

//     interests: Array.isArray(profile.interests)
//       ? profile.interests
//       : [],

//     prompts: Array.isArray(profile.prompts)
//       ? profile.prompts.map((prompt) => ({
//           _id: prompt._id,
//           question: prompt.question || "",
//           answer: prompt.answer || "",
//           type: ["text", "voice", "video", "poll"].includes(prompt.type)
//             ? prompt.type
//             : "text",
//         }))
//       : [],

//     images: Array.isArray(profile.images)
//       ? profile.images
//       : [],
//   };
// };

// /* =========================================================
//    MAIN PAGE
// ========================================================= */

// export default function MyProfilePage() {
//   /* -------------------------------------------------------
//      PROFILE / ACCOUNT DATA
//   ------------------------------------------------------- */

//   const [user, setUser] = useState({
//     username: "",
//     branch: "",
//     semester: "",
//     college: "",
//     gender: "",
//   });

//   /* -------------------------------------------------------
//      EDITABLE PROFILE STATE
//   ------------------------------------------------------- */

//   const [profileData, setProfileData] = useState({
//     dateOfBirth: "",
//     intro: "",
//     interests: [],
//     prompts: [],
//     images: [],
//   });

//   /* -------------------------------------------------------
//      UI STATES
//   ------------------------------------------------------- */

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [loggingOut, setLoggingOut] = useState(false);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [showMoreInterests, setShowMoreInterests] =
//     useState(false);

//   const [activePhotoIndex, setActivePhotoIndex] =
//     useState(null);

//   const fileInputRef = useRef(null);
//   const router = useRouter();
//   /* =======================================================
//      GET PROFILE
//   ======================================================= */

//   useEffect(() => {
//     getProfile();
//   }, []);

//   const getProfile = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetch("/api/myprofile", {
//         method: "GET",
//         credentials: "include",
//         cache: "no-store",
//       });

//       const data = await res.json();
//       console.log(data);
//       if (!res.ok) {
//         throw new Error(
//           data.error || "Failed to load profile."
//         );
//       }

//       const profile =
//         data.user ||
//         data.profile ||
//         data.users;

//       if (!profile) {
//         throw new Error("Profile data not found.");
//       }

//       const normalized = normalizeProfile(profile);

//       /* -----------------------------------------------
//          LOCKED USER INFORMATION
//       ------------------------------------------------ */

//       setUser({
//         username: normalized.username,
//         branch: normalized.branch,
//         semester: normalized.semester,
//         college: normalized.college,
//         gender: normalized.gender,
//       });

//       /* -----------------------------------------------
//          EDITABLE PROFILE INFORMATION
//       ------------------------------------------------ */

//       setProfileData({
//         dateOfBirth: normalized.dateOfBirth,
//         intro: normalized.intro,
//         interests: normalized.interests,
//         prompts: normalized.prompts,
//         images: normalized.images,
//       });
//     } catch (err) {
//       console.error("Get profile error:", err);

//       setError(
//         err.message || "Unable to load your profile."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =======================================================
//      GENERIC STATE UPDATE
//   ======================================================= */

//   const updateProfileState = (updates) => {
//     setProfileData((prev) => ({
//       ...prev,
//       ...updates,
//     }));

//     // Clear old messages when user starts editing
//     setSuccess("");
//     setError("");
//   };

//   /* =======================================================
//      DATE OF BIRTH
//   ======================================================= */

//   const handleDateChange = (value) => {
//     updateProfileState({
//       dateOfBirth: value,
//     });
//   };

//   /* =======================================================
//      INTRO
//   ======================================================= */

//   const handleIntroChange = (value) => {
//     if (value.length > 500) return;

//     updateProfileState({
//       intro: value,
//     });
//   };

//   /* =======================================================
//      INTERESTS
//   ======================================================= */

//   const toggleInterest = (interest) => {
//     setProfileData((prev) => {
//       const exists = prev.interests.includes(interest);

//       const updatedInterests = exists
//         ? prev.interests.filter(
//             (item) => item !== interest
//           )
//         : [...prev.interests, interest];

//       return {
//         ...prev,
//         interests: updatedInterests,
//       };
//     });

//     setSuccess("");
//     setError("");
//   };

//   const clearAllInterests = () => {
//     updateProfileState({
//       interests: [],
//     });
//   };

//   const visibleInterests = showMoreInterests
//     ? INTERESTS
//     : INTERESTS.slice(0, 16);

//   /* =======================================================
//      PROMPTS
//   ======================================================= */

//   const addPrompt = () => {
//     if (profileData.prompts.length >= 6) {
//       return;
//     }

//     updateProfileState({
//       prompts: [
//         ...profileData.prompts,
//         createEmptyPrompt(),
//       ],
//     });
//   };

//   const updatePrompt = (
//     index,
//     field,
//     value
//   ) => {
//     setProfileData((prev) => {
//       const prompts = [...prev.prompts];

//       prompts[index] = {
//         ...prompts[index],
//         [field]: value,
//       };

//       return {
//         ...prev,
//         prompts,
//       };
//     });

//     setSuccess("");
//     setError("");
//   };

//   const removePrompt = (index) => {
//     setProfileData((prev) => ({
//       ...prev,
//       prompts: prev.prompts.filter(
//         (_, i) => i !== index
//       ),
//     }));

//     setSuccess("");
//     setError("");
//   };

//   /* =======================================================
//      IMAGE HANDLING
     
//      NOTE:
//      This stores image as base64 in React state.
//      Your backend can later receive it with Update Profile.
//   ======================================================= */

//   const openImagePicker = (index) => {
//     setActivePhotoIndex(index);

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//       fileInputRef.current.click();
//     }
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setError("Please select a valid image.");
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setError("Image must be smaller than 5MB.");
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = () => {
//       const imageData = reader.result;

//       setProfileData((prev) => {
//         const images = [...prev.images];

//         images[activePhotoIndex] = imageData;

//         return {
//           ...prev,
//           images,
//         };
//       });

//       setSuccess("");
//       setError("");
//     };

//     reader.onerror = () => {
//       setError("Failed to read image.");
//     };

//     reader.readAsDataURL(file);
//   };

//   const removeImage = (index) => {
//     setProfileData((prev) => {
//       const images = [...prev.images];

//       images.splice(index, 1);

//       return {
//         ...prev,
//         images,
//       };
//     });

//     setSuccess("");
//     setError("");
//   };

//   /* =======================================================
//      UPDATE PROFILE
     
//      THIS IS THE ONLY PLACE WHERE PROFILE DATA IS SENT
//      TO THE BACKEND.
//   ======================================================= */

//   const handleUpdateProfile = async () => {
//     try {
//       setSaving(true);
//       setError("");
//       setSuccess("");

//       /* -----------------------------------------------
//          CLEAN PROMPTS BEFORE SENDING
//       ------------------------------------------------ */

//       const cleanedPrompts =
//         profileData.prompts
//           .slice(0, 6)
//           .map((prompt) => ({
//             ...(prompt._id
//               ? { _id: prompt._id }
//               : {}),
//             question:
//               String(
//                 prompt.question || ""
//               ).trim(),

//             answer:
//               String(
//                 prompt.answer || ""
//               ).trim(),

//             type: [
//               "text",
//               "voice",
//               "video",
//               "poll",
//             ].includes(prompt.type)
//               ? prompt.type
//               : "text",
//           }))
//           .filter(
//             (prompt) =>
//               prompt.question ||
//               prompt.answer
//           );

//       /* -----------------------------------------------
//          PAYLOAD
         
//          Username / branch / semester / college are
//          intentionally NOT included.
//       ------------------------------------------------ */

//       const payload = {
//         dateOfBirth:
//           profileData.dateOfBirth || null,

//         intro:
//           profileData.intro.trim(),

//         interests:
//           profileData.interests,

//         prompts:
//           cleanedPrompts,

//         images:
//           profileData.images,
//       };

//       console.log(
//         "Updating profile:",
//         payload
//       );

//       const res = await fetch(
//         "/api/updateprofile",
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type":
//               "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify(payload),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(
//           data.error ||
//             "Failed to update profile."
//         );
//       }

//       /* -----------------------------------------------
//          UPDATE STATE WITH BACKEND RESPONSE
//       ------------------------------------------------ */

//       const updatedProfile =
//         data.user ||
//         data.profile ||
//         data.users;

//       if (updatedProfile) {
//         const normalized =
//           normalizeProfile(
//             updatedProfile
//           );

//         setUser({
//           username:
//             normalized.username,

//           branch:
//             normalized.branch,

//           semester:
//             normalized.semester,

//           college:
//             normalized.college,

//           gender:
//             normalized.gender,
//         });

//         setProfileData({
//           dateOfBirth:
//             normalized.dateOfBirth,

//           intro:
//             normalized.intro,

//           interests:
//             normalized.interests,

//           prompts:
//             normalized.prompts,

//           images:
//             normalized.images,
//         });
//       } else {
//         /* ---------------------------------------------
//            If backend doesn't return profile,
//            keep our current state but normalize prompts.
//         --------------------------------------------- */

//         setProfileData((prev) => ({
//           ...prev,
//           prompts: cleanedPrompts,
//         }));
//       }

//       setSuccess(
//         "Profile updated successfully."
//       );
//     } catch (err) {
//       console.error(
//         "Update profile error:",
//         err
//       );

//       setError(
//         err.message ||
//           "Something went wrong while updating your profile."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* =======================================================
//      LOGOUT
//   ======================================================= */

//   const handleLogout = async () => {
//     try {
//       setLoggingOut(true);
//       setError("");

//       const res = await fetch(
//         "/api/logout",
//         {
//           method: "POST",
//           credentials: "include",
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(
//           data.error ||
//             "Logout failed."
//         );
//       }

//       window.location.href = "/login";
//     } catch (err) {
//       console.error(
//         "Logout error:",
//         err
//       );

//       setError(
//         err.message ||
//           "Unable to logout."
//       );

//       setLoggingOut(false);
//     }
//   };

//   /* =======================================================
//      AGE CALCULATOR
//   ======================================================= */

//   const calculateAge = (dob) => {
//     if (!dob) return null;

//     const birthDate =
//       new Date(dob);

//     if (Number.isNaN(
//       birthDate.getTime()
//     )) {
//       return null;
//     }

//     const today =
//       new Date();

//     let age =
//       today.getFullYear() -
//       birthDate.getFullYear();

//     const monthDifference =
//       today.getMonth() -
//       birthDate.getMonth();

//     if (
//       monthDifference < 0 ||
//       (monthDifference === 0 &&
//         today.getDate() <
//           birthDate.getDate())
//     ) {
//       age--;
//     }

//     return age;
//   };

//   const age = calculateAge(
//     profileData.dateOfBirth
//   );

//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (loading) {
//     return (
//       <main className="min-h-screen inset-0 z-60 fixed bg-[#fffaf2] flex items-center justify-center">
//         <div className="text-center">
//           <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#741337]/20 border-t-[#741337]" />

//           <p className="text-sm text-[#741337]/60">
//             Loading your profile...
//           </p>
//         </div>
//       </main>
//     );
//   }

//   /* =======================================================
//      PAGE
//   ======================================================= */
// // text-[#741337]
//   return (
//     <main className="min-h-screen inset-0 z-50 fixed overflow-y-auto  [&::-webkit-scrollbar]:hidden px-4 py-8 text-white sm:px-6 lg:px-8">
      
//       <div className="mx-auto max-w-2xl">

//         {/* =================================================
//             HEADER
//         ================================================= */}
        
//         <div className="mb-8">
//           <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
//             Your profile
//           </p>

//           <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
//             Edit Profile
//           </h1>

//           <p className="mt-2 max-w-xl text-sm leading-6 text-red-400">
//             {/* Make your profile feel more like you.
//             Changes will only be saved when you
//             press Update Profile. */}
//           </p>
//         </div>

//         {/* =================================================
//             ERROR
//         ================================================= */}

//         {error && (
//           <div className="mb-5 rounded-2xl  border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
//             {error}
//           </div>
//         )}

//         {/* =================================================
//             SUCCESS
//         ================================================= */}

//         {success && (
//           <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
//             {success}
//           </div>
//         )}

//         {/* =================================================
//             PROFILE CARD
//         ================================================= */}

//         <section className="rounded-[28px] border border-[#741337]/8 bg-white text-[#741337] p-5 shadow-[0_10px_40px_rgba(116,19,55,0.06)] sm:p-7">
//           <div className="flex "><div><button onClick={()=>router.push("/testroute")}><ArrowLeft/></button></div><div className="mx-2"><h1><a href="/testroute">Get Back to explore Page</a></h1></div></div>
//           {/* ===============================================
//               PHOTOS
//           =============================================== */}

//           <ProfileSection 
          
//             number="01"
//             title="Photos"
//             description="Choose the photos people will see on your profile."
//           >

//             <div className="grid grid-cols-3  gap-3 sm:grid-cols-6">

//               {Array.from({
//                 length: 6,
//               }).map((_, index) => {
//                 const image =
//                   profileData.images[
//                     index
//                   ];

//                 return (
//                   <div
//                     key={index}
//                     className="relative aspect-[3/4]"
//                   >
//                     {image ? (
//                       <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-[#f7efe8]">

//                         <img
//                           src={image}
//                           alt={`Profile photo ${
//                             index + 1
//                           }`}
//                           className="h-full w-full object-cover"
//                         />

//                         <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100">
//                           <div className="mb-2 flex gap-1">
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 openImagePicker(
//                                   index
//                                 )
//                               }
//                               className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#741337] "
//                             >
//                               Change
//                             </button>

//                             <button
//                               type="button"
//                               onClick={() =>
//                                 removeImage(
//                                   index
//                                 )
//                               }
//                               className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-red-600"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <button
//                         type="button"
//                         onClick={() =>
//                           openImagePicker(
//                             index
//                           )
//                         }
//                         className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#741337]/15 bg-[#fffaf2] text-[#741337]/50 transition hover:border-[#741337]/35 hover:bg-[#fdf3e9]"
//                       >
//                         <span className="text-2xl">
//                           +
//                         </span>

//                         <span className="mt-1 text-[11px]">
//                           Add
//                         </span>
//                       </button>
//                     )}
//                   </div>
//                 );
//               })}

//             </div>

//             <p className="mt-3 text-xs text-[#741337]/40">
//               Maximum 5MB per image.
//             </p>

//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="hidden"
//             />
//           </ProfileSection>

//           {/* ===============================================
//               BASIC INFORMATION
//           =============================================== */}

//           <ProfileSection
//             number="02"
//             title="Basic Information"
//             description="Some account information is fixed and cannot be edited here."
//           >

//             <div className="grid gap-4 sm:grid-cols-2">

//               {/* Username */}

//               <LockedField
//                 label="Username"
//                 value={
//                   user.username
//                 }
//               />

//               {/* Branch */}

//               <LockedField
//                 label="Branch"
//                 value={
//                   user.branch
//                 }
//               />

//               {/* Semester */}

//               <LockedField
//                 label="Year / Semester"
//                 value={
//                   user.semester
//                 }
//               />

//               {/* College */}

//               <LockedField
//                 label="College"
//                 value={
//                   user.college
//                 }
//               />

//             </div>
//           </ProfileSection>

//           {/* ===============================================
//               AGE / DOB
//           =============================================== */}

//           <ProfileSection
//             number="03"
//             title="Age"
//             description="Your date of birth is used to calculate your age."
//           >

//             <div className="grid gap-4 sm:grid-cols-2">

//               <div>
//                 <label className="mb-2 block text-sm font-medium">
//                   Date of Birth
//                 </label>

//                 <input
//                   type="date"
//                   value={
//                     profileData.dateOfBirth
//                   }
//                   onChange={(e) =>
//                     handleDateChange(
//                       e.target.value
//                     )
//                   }
//                   className="w-full rounded-2xl border border-[#741337]/10 bg-[#fffaf2] px-4 py-3 text-sm outline-none transition focus:border-[#741337]/30"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium">
//                   Age
//                 </label>

//                 <div className="flex h-[46px] items-center rounded-2xl border border-[#741337]/10 bg-[#f7efe8] px-4 text-sm">
//                   {age !== null
//                     ? `${age} years`
//                     : "Select your date of birth"}
//                 </div>
//               </div>

//             </div>
//           </ProfileSection>

//           {/* ===============================================
//               INTRO
//           =============================================== */}

//           <ProfileSection
//             number="04"
//             title="About You"
//             description="Give people a small idea of who you are."
//           >

//             <div>
//               <label className="mb-2 block text-sm font-medium">
//                 Intro
//               </label>

//               <textarea
//                 value={
//                   profileData.intro
//                 }
//                 onChange={(e) =>
//                   handleIntroChange(
//                     e.target.value
//                   )
//                 }
//                 maxLength={500}
//                 rows={5}
//                 placeholder="Tell people something about yourself..."
//                 className="w-full resize-none rounded-2xl border border-[#741337]/10 bg-[#fffaf2] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[#741337]/30 focus:border-[#741337]/30"
//               />

//               <div className="mt-2 text-right text-xs text-[#741337]/35">
//                 {
//                   profileData.intro
//                     .length
//                 }
//                 /500
//               </div>
//             </div>
//           </ProfileSection>

//           {/* ===============================================
//               INTERESTS
//           =============================================== */}

//           <ProfileSection
//             number="05"
//             title="Interests & Personality"
//             description="Tap interests to select or remove them."
//           >

//             <div className="flex items-center justify-between gap-3">

//               <p className="text-xs text-[#741337]/45">
//                 {
//                   profileData.interests
//                     .length
//                 }{" "}
//                 selected
//               </p>

//               {profileData.interests
//                 .length > 0 && (
//                 <button
//                   type="button"
//                   onClick={
//                     clearAllInterests
//                   }
//                   className="text-xs font-medium text-[#741337]/55 underline underline-offset-4"
//                 >
//                   Clear all
//                 </button>
//               )}

//             </div>

//             <div className="mt-4 flex flex-wrap gap-2">

//               {visibleInterests.map(
//                 (interest) => {
//                   const selected =
//                     profileData.interests.includes(
//                       interest
//                     );

//                   return (
//                     <button
//                       key={interest}
//                       type="button"
//                       onClick={() =>
//                         toggleInterest(
//                           interest
//                         )
//                       }
//                       className={`rounded-full border px-4 py-2 text-sm transition ${
//                         selected
//                           ? "border-[#741337] bg-[#741337] text-white shadow-sm"
//                           : "border-[#741337]/8 bg-[#fffaf2] text-[#741337]/55 hover:border-[#741337]/20 hover:text-[#741337]"
//                       }`}
//                     >
//                       {interest}
//                     </button>
//                   );
//                 }
//               )}

//             </div>

//             <button
//               type="button"
//               onClick={() =>
//                 setShowMoreInterests(
//                   (prev) => !prev
//                 )
//               }
//               className="mt-5 text-sm font-semibold underline underline-offset-4"
//             >
//               {showMoreInterests
//                 ? "Show less"
//                 : "More interests"}
//             </button>

//           </ProfileSection>

//           {/* ===============================================
//               PROMPTS
//           =============================================== */}

//           <ProfileSection
//             number="06"
//             title="Prompts"
//             description="Add up to 6 prompts to show more personality."
//           >

//             <div className="space-y-5">

//               {profileData.prompts.map(
//                 (prompt, index) => (
//                   <PromptCard
//                     key={
//                       prompt._id ||
//                       index
//                     }
//                     prompt={prompt}
//                     index={index}
//                     onChange={
//                       updatePrompt
//                     }
//                     onRemove={
//                       removePrompt
//                     }
//                   />
//                 )
//               )}

//             </div>

//             {profileData.prompts
//               .length < 6 && (
//               <button
//                 type="button"
//                 onClick={addPrompt}
//                 className="mt-5 w-full rounded-2xl border border-dashed border-[#741337]/15 bg-[#fffaf2] py-4 text-sm font-semibold transition hover:border-[#741337]/30 hover:bg-[#fdf3e9]"
//               >
//                 + Add another prompt
//               </button>
//             )}

//             <p className="mt-3 text-xs text-[#741337]/40">
//               {
//                 profileData.prompts
//                   .length
//               }{" "}
//               / 6 prompts
//             </p>

//           </ProfileSection>

//           {/* ===============================================
//               UPDATE + LOGOUT
//           =============================================== */}

//           <div className="mt-8 border-t border-[#741337]/8 pt-7">

//             <button
//               type="button"
//               onClick={
//                 handleUpdateProfile
//               }
//               disabled={
//                 saving ||
//                 loggingOut
//               }
//               className="w-full rounded-full bg-[#741337] py-4 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(116,19,55,0.18)] transition hover:bg-[#62102e] disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {saving
//                 ? "Updating Profile..."
//                 : "Update Profile"}
//             </button>

//             <button
//               type="button"
//               onClick={
//                 handleLogout
//               }
//               disabled={
//                 saving ||
//                 loggingOut
//               }
//               className="mt-4 w-full rounded-full border border-red-200 bg-white py-4 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loggingOut
//                 ? "Logging out..."
//                 : "Logout"}
//             </button>

//           </div>

//         </section>

//       </div>
//     </main>
//   );
// }

// /* =========================================================
//    PROFILE SECTION
// ========================================================= */

// function ProfileSection({
//   number,
//   title,
//   description,
//   children,
// }) {
//   return (
//     <section className="border-b border-[#741337]/8 py-7 first:pt-0 last:border-b-0">

//       <div className="mb-5 flex gap-4">

//         <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#741337]/8 text-xs font-semibold">
//           {number}
//         </div>

//         <div>
//           <h2 className="text-lg font-semibold">
//             {title}
//           </h2>

//           {description && (
//             <p className="mt-1 text-sm leading-5 text-[#741337]/45">
//               {description}
//             </p>
//           )}
//         </div>

//       </div>

//       {children}

//     </section>
//   );
// }

// /* =========================================================
//    LOCKED FIELD
// ========================================================= */

// function LockedField({
//   label,
//   value,
// }) {
//   return (
//     <div>
//       <label className="mb-2 block text-sm font-medium">
//         {label}
//       </label>

//       <div className="flex min-h-[46px] items-center justify-between rounded-2xl border border-[#741337]/8 bg-[#f7efe8] px-4">

//         <span className="text-sm text-[#741337]/65">
//           {value || "—"}
//         </span>

//         <span className="text-[10px] font-semibold uppercase tracking-wider text-[#741337]/30">
//           Locked
//         </span>

//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    PROMPT CARD
// ========================================================= */

// function PromptCard({
//   prompt,
//   index,
//   onChange,
//   onRemove,
// }) {
//   return (
//     <div className="rounded-3xl border border-[#741337]/8 bg-[#fffaf2] p-4 sm:p-5">

//       {/* HEADER */}

//       <div className="mb-4 flex items-center justify-between">

//         <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#741337]/40">
//           Prompt {index + 1}
//         </span>

//         <button
//           type="button"
//           onClick={() =>
//             onRemove(index)
//           }
//           className="text-xs font-medium text-red-500"
//         >
//           Remove
//         </button>

//       </div>

//       {/* QUESTION */}

//       <div>
//         <label className="mb-2 block text-sm font-medium">
//           Question
//         </label>

//         <input
//           type="text"
//           value={
//             prompt.question
//           }
//           onChange={(e) =>
//             onChange(
//               index,
//               "question",
//               e.target.value
//             )
//           }
//           placeholder="e.g. My ideal Sunday is..."
//           className="w-full rounded-2xl border border-[#741337]/10 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#741337]/25 focus:border-[#741337]/30"
//         />
//       </div>

//       {/* TYPE */}

//       <div className="mt-4">

//         <label className="mb-2 block text-sm font-medium">
//           Response type
//         </label>

//         <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

//           {PROMPT_TYPES.map(
//             (type) => {
//               const selected =
//                 prompt.type ===
//                 type.value;

//               return (
//                 <button
//                   key={
//                     type.value
//                   }
//                   type="button"
//                   onClick={() =>
//                     onChange(
//                       index,
//                       "type",
//                       type.value
//                     )
//                   }
//                   className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${
//                     selected
//                       ? "border-[#741337] bg-[#741337] text-white"
//                       : "border-[#741337]/8 bg-white text-[#741337]/50 hover:border-[#741337]/20"
//                   }`}
//                 >
//                   {type.label}
//                 </button>
//               );
//             }
//           )}

//         </div>

//       </div>

//       {/* ANSWER */}

//       <div className="mt-4">

//         <label className="mb-2 block text-sm font-medium">
//           Answer
//         </label>

//         {prompt.type ===
//         "text" ? (
//           <textarea
//             value={
//               prompt.answer
//             }
//             onChange={(e) =>
//               onChange(
//                 index,
//                 "answer",
//                 e.target.value
//               )
//             }
//             rows={4}
//             placeholder="Write your answer..."
//             className="w-full resize-none rounded-2xl border border-[#741337]/10 bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[#741337]/25 focus:border-[#741337]/30"
//           />
//         ) : prompt.type ===
//           "voice" ? (
//           <div className="rounded-2xl border border-dashed border-[#741337]/15 bg-white px-4 py-6 text-center">

//             <div className="text-2xl">
//               🎙️
//             </div>

//             <p className="mt-2 text-sm font-medium">
//               Voice answer
//             </p>

//             <p className="mt-1 text-xs text-[#741337]/40">
//               Voice upload can be connected
//               to your media upload API.
//             </p>

//           </div>
//         ) : prompt.type ===
//           "video" ? (
//           <div className="rounded-2xl border border-dashed border-[#741337]/15 bg-white px-4 py-6 text-center">

//             <div className="text-2xl">
//               🎥
//             </div>

//             <p className="mt-2 text-sm font-medium">
//               Video answer
//             </p>

//             <p className="mt-1 text-xs text-[#741337]/40">
//               Video upload can be connected
//               to your media upload API.
//             </p>

//           </div>
//         ) : (
//           <div className="rounded-2xl border border-dashed border-[#741337]/15 bg-white px-4 py-6 text-center">

//             <div className="text-2xl">
//               📊
//             </div>

//             <p className="mt-2 text-sm font-medium">
//               Poll
//             </p>

//             <p className="mt-1 text-xs text-[#741337]/40">
//               Poll options can be added
//               when the poll system is connected.
//             </p>

//           </div>
//         )}

//       </div>

//     </div>
//   );
// }

