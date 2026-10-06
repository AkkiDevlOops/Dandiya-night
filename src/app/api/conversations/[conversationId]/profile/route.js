import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/db";
import Conversation from "@/models/Conversation";
import Profile from "@/models/profile";
import { userlog } from "@/models/Registration";
import { getAuthenticatedEmail } from "@/lib/getAuthenticatedEmail";

export async function GET(request, { params }) {
  try {
    const { conversationId } = await params;

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid conversation ID",
        },
        { status: 400 }
      );
    }

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

    await connectDB();

    const currentUser = await userlog.findOne({
      email: email.toLowerCase(),
    });

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: currentUser._id,
    });

    if (!conversation) {
      return NextResponse.json(
        {
          success: false,
          message: "Conversation not found",
        },
        { status: 404 }
      );
    }

    // Find the OTHER user
    const otherUserId = conversation.participants.find(
      (id) => String(id) !== String(currentUser._id)
    );

    if (!otherUserId) {
      return NextResponse.json(
        {
          success: false,
          message: "Other participant not found",
        },
        { status: 404 }
      );
    }

    const otherUser = await userlog.findById(otherUserId).lean();

    if (!otherUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Other user not found",
        },
        { status: 404 }
      );
    }

    const profile = await Profile.findOne({
      email: otherUser.email,
    }).lean();

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      profile,
    });

  } catch (error) {
    console.error("GET CHAT PROFILE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load profile",
      },
      { status: 500 }
    );
  }
}