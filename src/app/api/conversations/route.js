import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Conversation from "@/models/Conversation";
import Profile from "@/models/profile";
import { userlog } from "@/models/Registration";
import { getAuthenticatedEmail } from "@/lib/getAuthenticatedEmail";

export async function GET() {
  try {
    await connectDB();

    // 1. Get logged-in user's email from session cookie
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

    // 2. Find actual user account
    const currentUser = await userlog
      .findOne({ email: email.toLowerCase() })
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

    // 3. Find conversations containing current user
    const conversations = await Conversation.find({
      participants: currentUser._id,
    })
      .sort({
        lastMessageAt: -1,
        createdAt: -1,
      })
      .lean();

    // No conversations
    if (conversations.length === 0) {
      return NextResponse.json({
        success: true,
        currentUserId: currentUser._id,
        conversations: [],
      });
    }

    // 4. Get all participant user IDs
    const participantIds = [
      ...new Set(
        conversations.flatMap((conversation) =>
          conversation.participants.map((id) => String(id))
        )
      ),
    ];

    // 5. Find userlog records
    const users = await userlog
      .find({
        _id: { $in: participantIds },
      })
      .select("_id email")
      .lean();

    // 6. Find their profiles using email
    const emails = users
      .map((user) => user.email?.toLowerCase())
      .filter(Boolean);

    const profiles = await Profile.find({
      email: { $in: emails },
    })
      .select(
        "_id email username images branch semester"
      )
      .lean();

    // 7. Create maps for quick lookup
    const userMap = new Map(
      users.map((user) => [
        String(user._id),
        user,
      ])
    );

    const profileMap = new Map(
      profiles.map((profile) => [
        profile.email?.toLowerCase(),
        profile,
      ])
    );

    // 8. Enrich conversation participants
    const enrichedConversations = conversations.map(
      (conversation) => {
        const participants = conversation.participants.map(
          (participantId) => {
            const user = userMap.get(
              String(participantId)
            );

            if (!user) {
              return {
                _id: participantId,
              };
            }

            const profile = profileMap.get(
              user.email?.toLowerCase()
            );

            return {
              _id: user._id,
              email: user.email,

              username:
                profile?.username || "Unknown User",

              images:
                profile?.images || [],

              branch:
                profile?.branch || "",

              semester:
                profile?.semester || "",

              profileId:
                profile?._id || null,
            };
          }
        );

        return {
          ...conversation,
          participants,
        };
      }
    );

    // 9. Send conversations to frontend
    return NextResponse.json({
      success: true,
      currentUserId: currentUser._id,
      conversations: enrichedConversations,
    });
  } catch (error) {
    console.error(
      "Get Conversations Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to get conversations",
      },
      { status: 500 }
    );
  }
}