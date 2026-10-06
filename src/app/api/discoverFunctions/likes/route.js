import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import connectDB from "@/lib/db";
import Profile from "@/models/profile";
import DiscoverySchema from "@/models/DiscoverySchema";

import { clearDiscoveryCache } from "@/lib/redisCache.js";

// ======================================================
// BACKWARD COMPATIBILITY
// ======================================================

function ensureDiscoveryFields(discovery) {
  // ----------------------------------------------------
  // OLD DISCOVERY FIELDS
  // ----------------------------------------------------

  if (!Array.isArray(discovery.liked)) {
    discovery.liked = [];
  }

  if (!Array.isArray(discovery.skipped)) {
    discovery.skipped = [];
  }

  if (!Array.isArray(discovery.blocked)) {
    discovery.blocked = [];
  }

  if (!Array.isArray(discovery.reported)) {
    discovery.reported = [];
  }

  if (!Array.isArray(discovery.likedBy)) {
    discovery.likedBy = [];
  }

  if (!Array.isArray(discovery.matches)) {
    discovery.matches = [];
  }

  // ----------------------------------------------------
  // DAILY LIKES
  // ----------------------------------------------------

  if (!discovery.likes) {
    discovery.likes = {
      count: 3,
      lastReset: new Date(),
    };
  }

  if (
    typeof discovery.likes.count !== "number" ||
    discovery.likes.count < 0
  ) {
    discovery.likes.count = 3;
  }

  if (!discovery.likes.lastReset) {
    discovery.likes.lastReset = new Date();
  }

  // ----------------------------------------------------
  // REPORTS RECEIVED
  // ----------------------------------------------------

  if (!discovery.reportsReceived) {
    discovery.reportsReceived = {
      count: 0,
      reports: [],
    };
  }

  if (
    typeof discovery.reportsReceived.count !== "number"
  ) {
    discovery.reportsReceived.count = 0;
  }

  if (
    !Array.isArray(
      discovery.reportsReceived.reports
    )
  ) {
    discovery.reportsReceived.reports = [];
  }

  return discovery;
}

// ======================================================
// CHECK / RESET DAILY LIKES
// ======================================================

function resetDailyLikesIfNeeded(discovery) {
  const now = new Date();

  const lastReset =
    discovery.likes?.lastReset
      ? new Date(discovery.likes.lastReset)
      : null;

  // If old/missing value
  if (!lastReset || isNaN(lastReset.getTime())) {
    discovery.likes = {
      count: 3,
      lastReset: now,
    };

    return true;
  }

  // ----------------------------------------------------
  // INDIA DATE (IST)
  // ----------------------------------------------------

  const getIndiaDate = (date) => {
    return new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    ).format(date);
  };

  const todayIndia =
    getIndiaDate(now);

  const lastResetIndia =
    getIndiaDate(lastReset);

  // ----------------------------------------------------
  // NEW DAY
  // ----------------------------------------------------

  if (
    todayIndia !==
    lastResetIndia
  ) {
    discovery.likes.count = 3;
    discovery.likes.lastReset = now;

    return true;
  }

  return false;
}

// ======================================================
// GET AUTHENTICATED USER
// ======================================================

async function getAuthenticatedUser() {
  try {
    const cookieStore =
      await cookies();

    const token =
      cookieStore
        .get("session")
        ?.value;

    if (!token) {
      return null;
    }

    const secret =
      new TextEncoder().encode(
        process.env.JWT_SECRET
      );

    const { payload } =
      await jwtVerify(
        token,
        secret
      );

    if (!payload.email) {
      return null;
    }

    return String(
      payload.email
    ).toLowerCase();

  } catch (error) {
    console.error(
      "AUTH ERROR:",
      error
    );

    return null;
  }
}

// ======================================================
// POST - SEND LIKE
// ======================================================

export async function POST(request) {
  try {
    await connectDB();

    console.log(
      "================================="
    );

    console.log(
      "LIKE POST STARTED"
    );

    console.log(
      "================================="
    );

    // ==================================================
    // 1. AUTHENTICATION
    // ==================================================

    const email =
      await getAuthenticatedUser();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // ==================================================
    // 2. REQUEST BODY
    // ==================================================

    let body = {};

    try {
      body =
        await request.json();
    } catch {
      body = {};
    }

    const {
      targetType = "profile",
      targetId,
      comment = "",
    } = body;

    console.log(
      "LIKE REQUEST"
    );

    console.log(
      "CURRENT EMAIL:",
      email
    );

    console.log(
      "TARGET ID:",
      targetId
    );

    console.log(
      "TARGET TYPE:",
      targetType
    );

    // ==================================================
    // 3. VALIDATE TARGET ID
    // ==================================================

    if (!targetId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Target profile ID is required.",
        },
        { status: 400 }
      );
    }

    // ==================================================
    // 4. FIND CURRENT PROFILE
    // ==================================================

    const currentProfile =
      await Profile.findOne({
        email,
      });

    if (!currentProfile) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Current profile not found.",
        },
        { status: 404 }
      );
    }

    // ==================================================
    // 5. FIND TARGET PROFILE
    // ==================================================

    const targetProfile =
      await Profile.findById(
        targetId
      );

    if (!targetProfile) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Target profile not found.",
        },
        { status: 404 }
      );
    }

    // ==================================================
    // 6. PREVENT SELF LIKE
    // ==================================================

    if (
      String(currentProfile._id) ===
      String(targetProfile._id)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You cannot like your own profile.",
        },
        { status: 400 }
      );
    }

    // ==================================================
    // 7. CURRENT USER DISCOVERY
    // ==================================================

    let currentDiscovery =
      await DiscoverySchema.findOne({
        email:
          currentProfile.email.toLowerCase(),
      });

    // ==================================================
    // 8. CREATE IF MISSING
    // ==================================================

    if (!currentDiscovery) {
      currentDiscovery =
        await DiscoverySchema.create({
          email:
            currentProfile.email.toLowerCase(),

          liked: [],

          skipped: [],

          blocked: [],

          reported: [],

          likedBy: [],

          matches: [],

          likes: {
            count: 3,
            lastReset: new Date(),
          },

          reportsReceived: {
            count: 0,
            reports: [],
          },
        });
    }

    // ==================================================
    // 9. UPGRADE OLD DISCOVERY DOCUMENT
    // ==================================================

    ensureDiscoveryFields(
      currentDiscovery
    );

    // ==================================================
    // 10. RESET DAILY LIKES IF NEW DAY
    // ==================================================

    const likesWereReset =
      resetDailyLikesIfNeeded(
        currentDiscovery
      );

    if (likesWereReset) {
      await currentDiscovery.save();
    }

    console.log(
      "DAILY LIKES AVAILABLE:",
      currentDiscovery.likes.count
    );

    // ==================================================
    // 11. CHECK DUPLICATE LIKE
    // ==================================================

    const alreadyLiked =
      currentDiscovery.liked.some(
        (like) =>
          String(like.profileId) ===
            String(currentProfile._id) &&
          String(like.targetId) ===
            String(targetProfile._id) &&
          (like.targetType ||
            "profile") ===
            targetType
      );

    console.log(
      "ALREADY LIKED:",
      alreadyLiked
    );

    // ==================================================
    // 12. DUPLICATE LIKE
    // ==================================================

    if (alreadyLiked) {
      return NextResponse.json(
        {
          success: true,

          alreadyLiked: true,

          likesRemaining:
            currentDiscovery.likes.count,

          message:
            "You already liked this profile.",
        },
        { status: 200 }
      );
    }

    // ==================================================
    // 13. CHECK BLOCKED / REPORTED
    // ==================================================

    const targetIdString =
      String(targetProfile._id);

    const isBlocked =
      currentDiscovery.blocked.some(
        (item) => {
          const id =
            typeof item === "object"
              ? item?.profileId
              : item;

          return (
            String(id) ===
            targetIdString
          );
        }
      );

    const isReported =
      currentDiscovery.reported.some(
        (item) => {
          const id =
            typeof item === "object"
              ? item?.profileId
              : item;

          return (
            String(id) ===
            targetIdString
          );
        }
      );

    if (
      isBlocked ||
      isReported
    ) {
      return NextResponse.json(
        {
          success: false,

          blocked: isBlocked,

          reported: isReported,

          message:
            "You cannot like this profile.",
        },
        { status: 403 }
      );
    }

    // ==================================================
    // 14. CHECK DAILY LIKE LIMIT
    // ==================================================

    if (
      currentDiscovery.likes.count <= 0
    ) {
      return NextResponse.json(
        {
          success: false,

          limitReached: true,

          likesRemaining: 0,

          message:
            "You have used all 3 likes for today. Try again tomorrow.",
        },
        { status: 429 }
      );
    }

    // ==================================================
    // 15. LIKE DATA
    // ==================================================

    const likeData = {
      profileId:
        currentProfile._id,

      targetType:
        targetType || "profile",

      targetId:
        String(targetProfile._id),

      comment:
        typeof comment === "string"
          ? comment
              .trim()
              .slice(0, 500)
          : "",

      acknowledge: false,

      createdAt:
        new Date(),
    };

    // ==================================================
    // 16. ADD TO CURRENT USER liked[]
    // ==================================================

    currentDiscovery.liked.push(
      likeData
    );

    // ==================================================
    // 17. CONSUME ONE DAILY LIKE
    // ==================================================

    currentDiscovery.likes.count -= 1;

    // ==================================================
    // 18. SAVE CURRENT DISCOVERY
    // ==================================================

    await currentDiscovery.save();

    console.log(
      "LIKE SAVED"
    );

    console.log(
      "LIKES REMAINING:",
      currentDiscovery.likes.count
    );

    // ==================================================
    // 19. TARGET USER DISCOVERY
    // ==================================================

    let targetDiscovery =
      await DiscoverySchema.findOne({
        email:
          targetProfile.email.toLowerCase(),
      });

    // ==================================================
    // 20. CREATE TARGET DISCOVERY
    // ==================================================

    if (!targetDiscovery) {
      targetDiscovery =
        await DiscoverySchema.create({
          email:
            targetProfile.email.toLowerCase(),

          liked: [],

          skipped: [],

          blocked: [],

          reported: [],

          likedBy: [],

          matches: [],

          likes: {
            count: 3,
            lastReset: new Date(),
          },

          reportsReceived: {
            count: 0,
            reports: [],
          },
        });
    }

    // ==================================================
    // 21. UPGRADE OLD TARGET DISCOVERY
    // ==================================================

    ensureDiscoveryFields(
      targetDiscovery
    );

    // ==================================================
    // 22. TARGET likedBy DUPLICATE
    // ==================================================

    const alreadyInLikedBy =
      targetDiscovery.likedBy.some(
        (like) =>
          String(like.profileId) ===
            String(currentProfile._id) &&
          String(like.targetId) ===
            String(targetProfile._id) &&
          (like.targetType ||
            "profile") ===
            targetType
      );

    // ==================================================
    // 23. ADD TO TARGET likedBy[]
    // ==================================================

    if (!alreadyInLikedBy) {
      const likedByData = {
        profileId:
          currentProfile._id,

        targetType:
          targetType || "profile",

        targetId:
          String(targetProfile._id),

        targetIdphoto:
          currentProfile.images?.[0] ||
          null,

        targetIdName:
          currentProfile.username ||
          null,

        comment:
          typeof comment === "string"
            ? comment
                .trim()
                .slice(0, 500)
            : "",

        acknowledge: false,

        createdAt:
          new Date(),
      };

      targetDiscovery.likedBy.push(
        likedByData
      );

      await targetDiscovery.save();
    }

    // ==================================================
    // 24. CLEAR DISCOVERY CACHE
    // ==================================================

    const cacheCleared =
      await clearDiscoveryCache(
        currentProfile._id,
        10
      );

    console.log(
      "DISCOVERY CACHE CLEARED:",
      cacheCleared
    );

    // ==================================================
    // 25. SUCCESS
    // ==================================================

    return NextResponse.json(
      {
        success: true,

        alreadyLiked: false,

        alreadyLikedBy:
          alreadyInLikedBy,

        likesRemaining:
          currentDiscovery.likes.count,

        dailyLimit: 3,

        cacheCleared,

        message:
          "Like sent successfully.",

        like: {
          profileId:
            currentProfile._id,

          targetId:
            targetProfile._id,

          targetType:
            targetType || "profile",

          comment:
            typeof comment === "string"
              ? comment
                  .trim()
                  .slice(0, 500)
              : "",

          acknowledge:
            false,
        },
      },
      { status: 200 }
    );

  } catch (error) {

    console.error(
      "================================="
    );

    console.error(
      "LIKE POST ERROR:",
      error
    );

    console.error(
      "ERROR MESSAGE:",
      error?.message
    );

    console.error(
      "ERROR STACK:",
      error?.stack
    );

    console.error(
      "================================="
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error?.message ||
          "Internal server error.",
      },
      { status: 500 }
    );
  }
}