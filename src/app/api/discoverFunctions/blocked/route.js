import connectDB from "@/lib/db.js";
import Profile from "@/models/profile";
import { userlog } from "@/models/Registration";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import { clearDiscoveryCache } from "@/lib/redisCache.js";

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
    console.error("BLOCK AUTH ERROR:", error);
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
    // AUTHENTICATE USER
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
    // READ REQUEST BODY
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

    // =====================================================
    // VALIDATE PROFILE ID
    // =====================================================

    if (!profileId) {
      return NextResponse.json(
        {
          success: false,
          message: "profileId is required.",
        },
        {
          status: 400,
        }
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
          message: "User account not found.",
        },
        {
          status: 404,
        }
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
          message: "Profile not found.",
        },
        {
          status: 404,
        }
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
        {
          status: 400,
        }
      );
    }

    // =====================================================
    // READ CURRENT DISCOVERY DATA
    // =====================================================

    const rawUser =
      await userlog.collection.findOne({
        _id: currentUser._id,
      });

    const discovery =
      rawUser?.discovery || {};

    // =====================================================
    // NORMALIZE ARRAYS
    // =====================================================

    const blocked =
      Array.isArray(
        discovery.blocked
      )
        ? discovery.blocked
        : [];

    const skipped =
      Array.isArray(
        discovery.skipped
      )
        ? discovery.skipped
        : [];

    const liked =
      Array.isArray(
        discovery.liked
      )
        ? discovery.liked
        : [];

    // =====================================================
    // CHECK IF ALREADY BLOCKED
    // =====================================================

    const alreadyBlocked =
      blocked.some(
        (item) => {
          const blockedId =
            typeof item ===
            "object"
              ? item?.profileId
              : item;

          return (
            String(blockedId) ===
            targetProfileId
          );
        }
      );

    // =====================================================
    // PREPARE BLOCKED ARRAY
    // =====================================================

    let updatedBlocked =
      blocked;

    if (!alreadyBlocked) {
      updatedBlocked = [
        ...blocked,
        {
          profileId:
            targetProfileId,
          createdAt:
            new Date(),
        },
      ];
    }

    // =====================================================
    // REMOVE FROM SKIPPED
    // =====================================================

    const updatedSkipped =
      skipped.filter(
        (item) => {
          const skippedId =
            typeof item ===
            "object"
              ? item?.profileId
              : item;

          return (
            String(skippedId) !==
            targetProfileId
          );
        }
      );

    // =====================================================
    // REMOVE OUTGOING LIKE
    // =====================================================

    const updatedLiked =
      liked.filter(
        (item) =>
          String(
            item?.targetId
          ) !==
          targetProfileId
      );

    // =====================================================
    // SAVE DISCOVERY DATA
    //
    // IMPORTANT:
    // chatgptroute also reads
    // userlog.discovery
    // =====================================================

    await userlog.collection.updateOne(
      {
        _id:
          currentUser._id,
      },
      {
        $set: {
          "discovery.blocked":
            updatedBlocked,

          "discovery.skipped":
            updatedSkipped,

          "discovery.liked":
            updatedLiked,
        },
      }
    );

    // =====================================================
    // CLEAR REDIS DISCOVERY CACHE
    //
    // This must happen AFTER the DB update.
    // =====================================================

    const cacheCleared =
      await clearDiscoveryCache(
        currentUser._id,
        limit
      );

    // =====================================================
    // LOGGING
    // =====================================================

    console.log(
      "========================================"
    );

    console.log(
      "🚫 PROFILE BLOCKED"
    );

    console.log(
      "👤 USER:",
      String(
        currentUser._id
      )
    );

    console.log(
      "🎯 PROFILE:",
      targetProfileId
    );

    console.log(
      "🗄️ BLOCK STORAGE:",
      "userlog.discovery.blocked"
    );

    console.log(
      "📦 BLOCKED COUNT:",
      updatedBlocked.length
    );

    console.log(
      "🗑️ DISCOVERY CACHE CLEARED:",
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
      cacheCleared,
      message:
        "Profile blocked successfully.",
    });

  } catch (error) {
    // =====================================================
    // ERROR
    // =====================================================

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
      {
        status: 500,
      }
    );
  }
}