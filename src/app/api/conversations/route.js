import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Conversation from "@/models/Conversation";
import { getUserFromRequest } from "@/lib/gettoken";

export async function GET(request) {
  try {
    await connectDB();

    const user = getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

const match = await Match.create({
  user1: currentUserId,
  user2: targetUserId,
});
const conversation =
  await Conversation.create({
    matchId: match._id,

    participants: [
      currentUserId,
      targetUserId,
    ],
  });

    const conversations =
      await Conversation.find({
        participants: user.userId,
      })
        .populate(
          "participants",
          "name username profileImage images branch semester"
        )
        .sort({
          lastMessageAt: -1,
          createdAt: -1,
        });

    return NextResponse.json({
      success: true,
      conversations,
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
      {
        status: 500,
      }
    );
  }
}