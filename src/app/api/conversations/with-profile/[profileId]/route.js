import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/db";
import Conversation from "@/models/Conversation";
import Profile from "@/models/profile";
import DiscoverySchema from "@/models/DiscoverySchema";
import { userlog } from "@/models/Registration";
import { getAuthenticatedEmail } from "@/lib/getAuthenticatedEmail";

export async function GET(request, { params }) {
  try {
    await connectDB();

    // ============================================
    // 1. Authenticate using session cookie
    // ============================================

    const email = await getAuthenticatedEmail();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // ============================================
    // 2. Find current user's account
    // ============================================

    const currentUser = await userlog
      .findOne({
        email: email.toLowerCase(),
      })
      .select("_id email")
      .lean();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User account not found",
        },
        { status: 404 }
      );
    }

    // ============================================
    // 3. Get target Profile ID from URL
    // ============================================

    const { profileId } = await params;

    if (!profileId) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile ID is required",
        },
        { status: 400 }
      );
    }

    // Check valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid profile ID",
        },
        { status: 400 }
      );
    }

    // ============================================
    // 4. Find current user's Discovery document
    // ============================================

 const discovery = await DiscoverySchema.findOne({
  email: currentUser.email.toLowerCase(),
}).lean();

if (!discovery) {
  return NextResponse.json(
    {
      success: false,
      message: "Discovery profile not found",
    },
    { status: 404 }
  );
}

    // ============================================
    // 5. Check whether target is actually
    //    an active match
    // ============================================

    const isMatched = discovery.matches?.some(
      (match) =>
        String(match.profileId) === String(profileId) &&
        match.status === "active"
    );

    if (!isMatched) {
      return NextResponse.json(
        {
          success: false,
          message: "You can only chat with your matches",
        },
        { status: 403 }
      );
    }

    // ============================================
    // 6. Find target person's Profile
    // ============================================

    const targetProfile =
      await Profile.findById(profileId).lean();

    if (!targetProfile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile not found",
        },
        { status: 404 }
      );
    }

    // ============================================
    // 7. Find target person's userlog account
    //    using their profile email
    // ============================================

    const targetUser = await userlog
      .findOne({
        email: targetProfile.email.toLowerCase(),
      })
      .select("_id email")
      .lean();

    if (!targetUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Target user account not found",
        },
        { status: 404 }
      );
    }

    // ============================================
    // 8. Prevent chatting with yourself
    // ============================================

    if (
      String(currentUser._id) ===
      String(targetUser._id)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot chat with yourself",
        },
        { status: 400 }
      );
    }

    // ============================================
    // 9. Find existing conversation
    // ============================================

    let conversation = await Conversation.findOne({
      participants: {
        $all: [
          currentUser._id,
          targetUser._id,
        ],
      },
    }).lean();

    // ============================================
    // 10. Create conversation if it doesn't exist
    // ============================================

    if (!conversation) {
      const newConversation =
        await Conversation.create({
          participants: [
            currentUser._id,
            targetUser._id,
          ],
        });

      conversation = newConversation.toObject();
    }

    // ============================================
    // 11. Get participant accounts
    // ============================================

    const participantUsers = await userlog
      .find({
        _id: {
          $in: conversation.participants,
        },
      })
      .select("_id email")
      .lean();

    // ============================================
    // 12. Get participant profiles
    // ============================================

    const participantEmails = participantUsers
      .map((user) =>
        user.email?.toLowerCase()
      )
      .filter(Boolean);

    const participantProfiles =
      await Profile.find({
        email: {
          $in: participantEmails,
        },
      })
        .select(
          "_id email username images branch semester"
        )
        .lean();

    // ============================================
    // 13. Create profile lookup map
    // ============================================

    const profileMap = new Map(
      participantProfiles.map((profile) => [
        profile.email?.toLowerCase(),
        profile,
      ])
    );

    // ============================================
    // 14. Enrich participant information
    // ============================================

    const enrichedParticipants =
      participantUsers.map((user) => {
        const profile = profileMap.get(
          user.email?.toLowerCase()
        );

        return {
          _id: user._id,
          email: user.email,

          username:
            profile?.username ||
            "Unknown User",

          images:
            profile?.images || [],

          branch:
            profile?.branch || "",

          semester:
            profile?.semester || "",

          profileId:
            profile?._id || null,
        };
      });

    // ============================================
    // 15. Return conversation
    // ============================================

    return NextResponse.json({
      success: true,

      currentUserId: currentUser._id,

      conversation: {
        ...conversation,

        participants:
          enrichedParticipants,
      },
    });
  } catch (error) {
    console.error(
      "GET CHAT BY PROFILE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to find or create conversation",
      },
      { status: 500 }
    );
  }
}