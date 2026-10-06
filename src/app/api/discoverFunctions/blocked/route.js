import connectDB from "@/lib/db.js";
import Profile from "@/models/profile";
import { userlog } from "@/models/Registration";
import DiscoverySchema from "@/models/DiscoverySchema";

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
// POST - BLOCK PROFILE
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
        .select("_id email username")
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
    // FIND / CREATE DISCOVERY DOCUMENT
    //
    // DiscoverySchema is now the source of truth.
    // =====================================================

    let discovery =
      await DiscoverySchema.findOne({
        email,
      });

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
        });
    }

    // =====================================================
    // CHECK IF ALREADY BLOCKED
    // =====================================================

    const alreadyBlocked =
      discovery.blocked.some((item) => {
        const blockedId =
          typeof item === "object"
            ? item?.profileId
            : item;

        return (
          String(blockedId) ===
          targetProfileId
        );
      });

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
    //
    // Only add if it doesn't already exist.
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
    // SAVE DISCOVERY DOCUMENT
    // =====================================================

    await discovery.save();

    // =====================================================
    // CLEAR REDIS DISCOVERY CACHE
    // =====================================================

    const safeLimit = Math.min(
      Math.max(
        Number(limit) || 10,
        1
      ),
      20
    );

    const cacheCleared =
      await clearDiscoveryCache(
        currentUser._id,
        safeLimit
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
      "📦 BLOCKED COUNT:",
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
        blocked:
          discovery.blocked,
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

      blocked:
        discovery.blocked,

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