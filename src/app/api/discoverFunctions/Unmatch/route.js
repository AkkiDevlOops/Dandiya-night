
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import mongoose from "mongoose";

import connectDB from "@/lib/db";
import Profile from "@/models/profile";
import DiscoverySchema from "@/models/DiscoverySchema";
import { clearDiscoveryCache } from "@/lib/redisCache"; 

const JWT_SECRET = process.env.JWT_SECRET;

// Delete only records belonging to this specific pair.
function removePairRecords(discovery, selfId, otherId) {
  if (!discovery) return;

  // Remove likes sent by this user to the other user.
  discovery.liked = (discovery.liked || []).filter(
    (like) => String(like.targetId) !== otherId
  );

  // Remove incoming likes from the other user.
  discovery.likedBy = (discovery.likedBy || []).filter((like) => {
    const fromOtherUser = String(like.profileId) === otherId;

    const targetsThisUser =
      !like.targetId || String(like.targetId) === selfId;

    return !(fromOtherUser && targetsThisUser);
  });

  // Remove the other user from matches.
  discovery.matches = (discovery.matches || []).filter(
    (match) => String(match.profileId) !== otherId
  );
}

export async function POST(request) {
  try {
    if (!JWT_SECRET) {
      return NextResponse.json(
        { success: false, message: "JWT secret is not configured." },
        { status: 500 }
      );
    }

    await connectDB();

    // 1. Authenticate the current user.
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Please log in first." },
        { status: 401 }
      );
    }

    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const email = payload.email;

    if (typeof email !== "string" || !email) {
      return NextResponse.json(
        { success: false, message: "Invalid session." },
        { status: 401 }
      );
    }

    // 2. Get the target profile ID.
    const body = await request.json().catch(() => ({}));
    const { targetProfileId } = body;

    if (
      !targetProfileId ||
      !mongoose.isValidObjectId(targetProfileId)
    ) {
      return NextResponse.json(
        { success: false, message: "Valid targetProfileId is required." },
        { status: 400 }
      );
    }

    // 3. Find both profiles.
    const currentProfile = await Profile.findOne({ email }).select(
      "_id email"
    );

    const targetProfile = await Profile.findById(targetProfileId).select(
      "_id email"
    );

    if (!currentProfile) {
      return NextResponse.json(
        { success: false, message: "Your profile was not found." },
        { status: 404 }
      );
    }

    if (!targetProfile) {
      return NextResponse.json(
        { success: false, message: "Target profile was not found." },
        { status: 404 }
      );
    }

    const currentId = String(currentProfile._id);
    const targetId = String(targetProfile._id);

    if (currentId === targetId) {
      return NextResponse.json(
        { success: false, message: "You cannot unmatch yourself." },
        { status: 400 }
      );
    }

    // 4. Fetch both discovery documents.
    const [currentDiscovery, targetDiscovery] = await Promise.all([
      DiscoverySchema.findOne({ email: currentProfile.email }),
      DiscoverySchema.findOne({ email: targetProfile.email }),
    ]);

    if (!currentDiscovery || !targetDiscovery) {
      return NextResponse.json(
        {
          success: false,
          message: "Discovery data for one or both users was not found.",
        },
        { status: 404 }
      );
    }

    // 5. Remove the pair's records in both directions.
    removePairRecords(currentDiscovery, currentId, targetId);
    removePairRecords(targetDiscovery, targetId, currentId);

    // 6. Save both users' updated records.
    await Promise.all([
      currentDiscovery.save(),
      targetDiscovery.save(),
    ]);

    // 7. Clear both discovery caches.
    await Promise.allSettled([
      clearDiscoveryCache(currentId),
      clearDiscoveryCache(targetId),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully unmatched. Pair records removed.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unmatch error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to unmatch users.",
      },
      { status: 500 }
    );
  }
}
