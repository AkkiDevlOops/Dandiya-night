// =========================================================
// Discovery route and Interest Page
// =========================================================

import connectDB from "@/lib/db.js";
import Profile from "@/models/profile";
import { userlog } from "@/models/Registration";
import DiscoverySchema from "@/models/DiscoverySchema";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import {
  getDiscoveryCache,
  setDiscoveryCache,
} from "@/lib/redisCache.js";

// =========================================================
// AUTHENTICATE USER
// =========================================================

async function getAuthenticatedUser() {
  try {
    const cookieStore = await cookies();

    const sessionToken =
      cookieStore.get("session")?.value;

    if (!sessionToken) {
      return null;
    }

    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET
    );

    const { payload } = await jwtVerify(
      sessionToken,
      secret
    );

    if (!payload.email) {
      return null;
    }

    return {
      email: String(payload.email).toLowerCase(),
    };
  } catch (error) {
    console.error(
      "DISCOVERY AUTH ERROR:",
      error
    );

    return null;
  }
}

// =========================================================
// POST
// =========================================================

export async function POST(request) {
  try {
    // =====================================================
    // CONNECT DATABASE
    // =====================================================

    await connectDB();

    // =====================================================
    // READ REQUEST
    // =====================================================

    let body = {};

    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const {
      action = "discover",
      limit = 10,
    } = body;

    // =====================================================
    // THIS ROUTE IS ONLY FOR DISCOVERY
    // =====================================================

    if (action !== "discover") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid action. This route only supports discovery.",
        },
        {
          status: 400,
        }
      );
    }

    // =====================================================
    // AUTHENTICATE
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
        {
          status: 401,
        }
      );
    }

    const email =
      authenticatedUser.email;

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
        {
          status: 404,
        }
      );
    }

    // =====================================================
    // SAFE LIMIT
    // =====================================================

    const safeLimit = Math.min(
      Math.max(
        Number(limit) || 10,
        1
      ),
      20
    );

    // =====================================================
    // REDIS DISCOVERY CACHE
    // =====================================================

    const cachedUsers =
      await getDiscoveryCache(
        currentUser._id,
        safeLimit
      );

    if (cachedUsers) {
      console.log(
        "🚀 DISCOVERY CACHE HIT"
      );

      return NextResponse.json({
        success: true,
        action: "discover",
        count: cachedUsers.length,
        hasMore:
          cachedUsers.length ===
          safeLimit,
        users: cachedUsers,
        cached: true,
      });
    }

    console.log(
      "🐌 DISCOVERY CACHE MISS"
    );

    // =====================================================
    // GET DISCOVERY DOCUMENT
    //
    // IMPORTANT:
    // DiscoverySchema is now the ONLY source
    // for liked / skipped / blocked / reported.
    // =====================================================

    let currentUserDiscovery =
      await DiscoverySchema.findOne({
        email,
      }).lean();

    // =====================================================
    // IF DISCOVERY DOCUMENT DOES NOT EXIST
    // =====================================================

    if (!currentUserDiscovery) {
      console.log(
        "ℹ️ No Discovery document found for user."
      );

      currentUserDiscovery = {
        liked: [],
        skipped: [],
        blocked: [],
        reported: [],
      };
    }

    // =====================================================
    // NORMALIZE DISCOVERY ARRAYS
    // =====================================================

    const liked =
      Array.isArray(
        currentUserDiscovery.liked
      )
        ? currentUserDiscovery.liked
        : [];

    const skipped =
      Array.isArray(
        currentUserDiscovery.skipped
      )
        ? currentUserDiscovery.skipped
        : [];

    const blocked =
      Array.isArray(
        currentUserDiscovery.blocked
      )
        ? currentUserDiscovery.blocked
        : [];

    const reported =
      Array.isArray(
        currentUserDiscovery.reported
      )
        ? currentUserDiscovery.reported
        : [];

    // =====================================================
    // DEBUG: BLOCKED USERS
    // =====================================================

    console.log(
      "🚫 BLOCKED FROM DiscoverySchema:",
      JSON.stringify(
        blocked,
        null,
        2
      )
    );

    // =====================================================
    // BUILD EXCLUDED PROFILE IDS
    //
    // blocked example:
    //
    // {
    //   profileId: "68abc123...",
    //   createdAt: "..."
    // }
    //
    // We only need profileId.
    // =====================================================

    const excludedIds = [
      ...liked.map((item) =>
        typeof item === "object"
          ? item?.profileId
          : item
      ),

      ...skipped.map((item) =>
        typeof item === "object"
          ? item?.profileId
          : item
      ),

      ...blocked.map((item) =>
        typeof item === "object"
          ? item?.profileId
          : item
      ),

      ...reported.map((item) =>
        typeof item === "object"
          ? item?.profileId
          : item
      ),
    ]
      .filter(Boolean)
      .map((id) =>
        String(id)
      );

    // =====================================================
    // REMOVE DUPLICATE IDS
    // =====================================================

    const uniqueExcludedIds = [
      ...new Set(excludedIds),
    ];

    // =====================================================
    // DEBUG EXCLUDED IDS
    // =====================================================

    console.log(
      "🚫 EXCLUDED PROFILE IDS:",
      uniqueExcludedIds
    );

    // =====================================================
    // FIND CURRENT USER PROFILE
    // =====================================================

    const myProfile =
      await Profile.findOne({
        email,
      })
        .select(
          "email gender username"
        )
        .lean();

    if (!myProfile) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Your profile has not been completed yet.",
        },
        {
          status: 404,
        }
      );
    }

    // =====================================================
    // GET CURRENT USER GENDER
    // =====================================================

    const gender =
      myProfile.gender
        ?.toLowerCase()
        .trim();

    if (!gender) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Your gender is not set.",
        },
        {
          status: 400,
        }
      );
    }

    // =====================================================
    // DETERMINE TARGET GENDER
    //
    // Female -> Male
    // Male   -> Female
    // =====================================================

    let targetGender;

    if (gender === "female") {
      targetGender = "male";
    } else if (gender === "male") {
      targetGender = "female";
    } else {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unsupported gender value.",
        },
        {
          status: 400,
        }
      );
    }

    // =====================================================
    // BUILD MONGODB QUERY
    // =====================================================

    const matchQuery = {
      gender: {
        $regex: new RegExp(
          `^${targetGender}$`,
          "i"
        ),
      },

      // Never show own profile
      email: {
        $ne: email,
      },
    };

    // =====================================================
    // EXCLUDE:
    //
    // LIKED
    // SKIPPED
    // BLOCKED
    // REPORTED
    // =====================================================

    if (
      uniqueExcludedIds.length > 0
    ) {
      matchQuery._id = {
        $nin: uniqueExcludedIds,
      };
    }

    // =====================================================
    // DEBUG FINAL QUERY
    // =====================================================

    console.log(
      "🔎 DISCOVERY QUERY:",
      JSON.stringify(
        matchQuery,
        null,
        2
      )
    );

    // =====================================================
    // GET RANDOMIZED PROFILES
    // =====================================================

    const profiles =
      await Profile.aggregate([
        {
          $match:
            matchQuery,
        },

        {
          $sample: {
            size: safeLimit,
          },
        },
      ]);

    // =====================================================
    // SAFETY CHECK
    //
    // Remove anything that somehow appears in the
    // excluded IDs before returning the response.
    // =====================================================

    const filteredProfiles =
      profiles.filter(
        (profile) =>
          !uniqueExcludedIds.includes(
            String(profile._id)
          )
      );

    // =====================================================
    // SAVE RESULT IN REDIS
    // =====================================================

    await setDiscoveryCache(
      currentUser._id,
      filteredProfiles,
      safeLimit
    );

    console.log(
      `💾 DISCOVERY CACHE SET: ${filteredProfiles.length} profiles`
    );

    // =====================================================
    // RETURN DISCOVERY FEED
    // =====================================================

    return NextResponse.json({
      success: true,
      action: "discover",
      count:
        filteredProfiles.length,

      hasMore:
        filteredProfiles.length ===
        safeLimit,

      users:
        filteredProfiles,

      cached: false,
    });

  } catch (error) {
    // =====================================================
    // ERROR
    // =====================================================

    console.error(
      "EXPLORE API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}