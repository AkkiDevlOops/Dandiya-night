import connectDB from "@/lib/db.js";
import Profile from "@/models/profile";
import { userlog } from "@/models/Registration";
import DiscoverySchema from "@/models/DiscoverySchema";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import { clearDiscoveryCache } from "@/lib/redisCache.js";

// =========================================================
// BACKWARD COMPATIBILITY
// =========================================================

function ensureDiscoveryFields(discovery) {
  // Old fields
  if (!discovery.liked) {
    discovery.liked = [];
  }

  if (!discovery.skipped) {
    discovery.skipped = [];
  }

  if (!discovery.blocked) {
    discovery.blocked = [];
  }

  if (!discovery.reported) {
    discovery.reported = [];
  }

  if (!discovery.likedBy) {
    discovery.likedBy = [];
  }

  if (!discovery.matches) {
    discovery.matches = [];
  }

  // =====================================================
  // DAILY LIKES
  // =====================================================

  if (!discovery.likes) {
    discovery.likes = {
      count: 3,
      lastReset: new Date(),
    };
  }

  if (
    typeof discovery.likes.count !==
    "number"
  ) {
    discovery.likes.count = 3;
  }

  if (!discovery.likes.lastReset) {
    discovery.likes.lastReset =
      new Date();
  }

  // =====================================================
  // REPORTS RECEIVED
  // =====================================================

  if (!discovery.reportsReceived) {
    discovery.reportsReceived = {
      count: 0,
      reports: [],
    };
  }

  if (
    typeof discovery.reportsReceived.count !==
    "number"
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

// =========================================================
// AUTHENTICATE USER
// =========================================================

async function getAuthenticatedUser() {
  try {
    const cookieStore =
      await cookies();

    const sessionToken =
      cookieStore.get("session")?.value;

    if (!sessionToken) {
      return null;
    }

    const secret =
      new TextEncoder().encode(
        process.env.JWT_SECRET
      );

    const { payload } =
      await jwtVerify(
        sessionToken,
        secret
      );

    if (!payload.email) {
      return null;
    }

    return {
      email: String(
        payload.email
      ).toLowerCase(),
    };

  } catch (error) {
    console.error(
      "BLOCK AUTH ERROR:",
      error
    );

    return null;
  }
}

// =========================================================
// POST - BLOCK PROFILE
// =========================================================

export async function POST(request) {
  try {
    await connectDB();

    // =====================================================
    // AUTHENTICATION
    // =====================================================

    const authenticatedUser =
      await getAuthenticatedUser();

    if (!authenticatedUser) {
      return NextResponse.json(
        {
          success: false,
          redirect: true,
          url: "/LoginRegister",
          message:
            "Session cookie missing or invalid. Please log in.",
        },
        { status: 401 }
      );
    }

    const email =
      authenticatedUser.email;

    // =====================================================
    // REQUEST BODY
    // =====================================================

    let body = {};

    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const {
      profileId,
      limit = 10,
    } = body;

    if (!profileId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "profileId is required.",
        },
        { status: 400 }
      );
    }

    const targetProfileId =
      String(profileId);

    // =====================================================
    // FIND CURRENT USER
    // =====================================================

    const currentUser =
      await userlog.findOne({
        email,
      });

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User account not found.",
        },
        { status: 404 }
      );
    }

    // =====================================================
    // FIND TARGET PROFILE
    // =====================================================

    const targetProfile =
      await Profile.findById(
        targetProfileId
      )
        .select(
          "_id email username"
        )
        .lean();

    if (!targetProfile) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Profile not found.",
        },
        { status: 404 }
      );
    }

    // =====================================================
    // PREVENT SELF BLOCK
    // =====================================================

    if (
      targetProfile.email?.toLowerCase() ===
      email
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You cannot block yourself.",
        },
        { status: 400 }
      );
    }

    // =====================================================
    // FIND DISCOVERY DOCUMENT
    // =====================================================

    let discovery =
      await DiscoverySchema.findOne({
        email,
      });

    // =====================================================
    // CREATE DISCOVERY IF NOT EXISTS
    // =====================================================

    if (!discovery) {
      discovery =
        await DiscoverySchema.create({
          email,

          liked: [],

          skipped: [],

          blocked: [],

          reported: [],

          likedBy: [],

          matches: [],

          likes: {
            count: 3,
            lastReset:
              new Date(),
          },

          reportsReceived: {
            count: 0,
            reports: [],
          },
        });
    }

    // =====================================================
    // BACKWARD COMPATIBILITY
    // =====================================================

    ensureDiscoveryFields(
      discovery
    );

    // =====================================================
    // CHECK IF ALREADY BLOCKED
    // =====================================================

    const alreadyBlocked =
      discovery.blocked.some(
        (item) => {

          const blockedId =
            typeof item === "object"
              ? item?.profileId
              : item;

          return (
            String(blockedId) ===
            targetProfileId
          );
        }
      );

    // =====================================================
    // REMOVE FROM SKIPPED
    // =====================================================

    discovery.skipped =
      discovery.skipped.filter(
        (item) => {

          const skippedId =
            typeof item === "object"
              ? item?.profileId
              : item;

          return (
            String(skippedId) !==
            targetProfileId
          );
        }
      );

    // =====================================================
    // REMOVE FROM LIKED
    // =====================================================

    discovery.liked =
      discovery.liked.filter(
        (item) => {

          const likedId =
            typeof item === "object"
              ? item?.profileId
              : item;

          return (
            String(likedId) !==
            targetProfileId
          );
        }
      );

    // =====================================================
    // ADD TO BLOCKED
    // =====================================================

    if (!alreadyBlocked) {
      discovery.blocked.push({
        profileId:
          targetProfileId,

        createdAt:
          new Date(),
      });
    }

    // =====================================================
    // SAVE DISCOVERY
    // =====================================================

    await discovery.save();

    // =====================================================
    // SAFE CACHE LIMIT
    // =====================================================

    const safeLimit =
      Math.min(
        Math.max(
          Number(limit) || 10,
          1
        ),
        20
      );

    // =====================================================
    // CLEAR DISCOVERY CACHE
    // =====================================================

    const cacheCleared =
      await clearDiscoveryCache(
        currentUser._id,
        safeLimit
      );

    // =====================================================
    // LOG
    // =====================================================

    console.log(
      "========================================"
    );

    console.log(
      "🚫 PROFILE BLOCKED"
    );

    console.log(
      "👤 USER:",
      email
    );

    console.log(
      "🎯 PROFILE:",
      targetProfileId
    );

    console.log(
      "🗄️ STORAGE:",
      "Discovery.blocked"
    );

    console.log(
      "🔢 BLOCKED COUNT:",
      discovery.blocked.length
    );

    console.log(
      "🗑️ CACHE CLEARED:",
      cacheCleared
    );

    console.log(
      "========================================"
    );

    // =====================================================
    // ALREADY BLOCKED RESPONSE
    // =====================================================

    if (alreadyBlocked) {
      return NextResponse.json({
        success: true,

        alreadyBlocked: true,

        action: "block",

        profileId:
          targetProfileId,

        cacheCleared,

        message:
          "Profile was already blocked.",
      });
    }

    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return NextResponse.json({
      success: true,

      action: "block",

      profileId:
        targetProfileId,

      username:
        targetProfile.username ||
        null,

      blocked: true,

      cacheCleared,

      message:
        "Profile blocked successfully.",
    });

  } catch (error) {

    console.error(
      "BLOCK PROFILE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal server error while blocking profile.",
      },
      { status: 500 }
    );
  }
}