import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

import connectDB from "@/lib/db";
import DiscoverySchema from "@/models/DiscoverySchema";
import Profile from "@/models/profile";

// =====================================================
// GET LOGGED-IN USER
// =====================================================

async function getAuthenticatedUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
  );

  const { payload } = await jwtVerify(
    token,
    secret
  );

  if (!payload.email) {
    return null;
  }

  return payload.email.toLowerCase();
}

// =====================================================
// GET - LIKES RECEIVED
// =====================================================

export async function GET() {
  try {
    await connectDB();

    // ============================================
    // AUTHENTICATE
    // ============================================

    const email = await getAuthenticatedUser();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first.",
        },
        { status: 401 }
      );
    }

    // ============================================
    // FIND CURRENT USER
    // ============================================

    const currentProfile = await Profile.findOne({
      email,
    })
      .select("_id email username images")
      .lean();

    if (!currentProfile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile not found.",
        },
        { status: 404 }
      );
    }

    // ============================================
    // FIND CURRENT USER'S DISCOVERY
    // ============================================

    const discovery = await DiscoverySchema.findOne({
      email,
    })
      .select("likedBy")
      .lean();

    if (!discovery) {
      return NextResponse.json({
        success: true,
        count: 0,
        likes: [],
      });
    }

    // ============================================
    // ONLY UNACKNOWLEDGED LIKES
    // ============================================

    const unacknowledgedLikes =
      (discovery.likedBy || []).filter(
        (like) => like.acknowledge !== true
      );

    const likedData = [];

    // ============================================
    // GET SENDER PROFILE
    // ============================================

    for (const like of unacknowledgedLikes) {
      const senderProfile =
        await Profile.findById(like.profileId)
          .select("_id email username images height branch semester gender college interests prompts")
          .lean();

      if (!senderProfile) {
        continue;
      }

      likedData.push({
        likeId: like._id,

        from: {
         profileId: senderProfile._id,
  username: senderProfile.username,
  images: senderProfile.images || [],

  height: senderProfile.height || "",
  branch: senderProfile.branch || "",
  semester: senderProfile.semester || "",
  gender: senderProfile.gender || "",
  college: senderProfile.college || "",

  interests: senderProfile.interests || [],
  prompts: senderProfile.prompts || [],
        },

        targetType:
          like.targetType || "profile",

        targetId:
          like.targetId || null,

        targetIdPhoto:
          like.targetIdphoto || null,

        targetIdName:
          like.targetIdName || null,

        comment:
          like.comment || "",

        acknowledge:
          like.acknowledge ?? false,

        needsAcknowledgement: true,

        createdAt:
          like.createdAt,
      });
    }

    // ============================================
    // RESPONSE
    // ============================================

    return NextResponse.json(
      {
        success: true,

        count: likedData.length,

        likes: likedData,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(
      "GET LIKES ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}







