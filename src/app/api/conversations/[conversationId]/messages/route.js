import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/db";
import Conversation from "@/models/Conversation";
import Message from "@/models/Message";
import Profile from "@/models/profile";
import { userlog } from "@/models/Registration";
import { getAuthenticatedEmail } from "@/lib/getAuthenticatedEmail";


// =====================================================
// GET MESSAGES
// =====================================================
export async function GET(request, { params }) {
  try {
    await connectDB();

    // 1. Get logged-in user's email
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

    // 2. Find logged-in user
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
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // 3. IMPORTANT:
    // params is a Promise in your Next.js version
    const { conversationId } = await params;

    console.log("conversationId:", conversationId);

    // 4. Validate conversation ID
    if (!conversationId) {
      return NextResponse.json(
        {
          success: false,
          message: "Conversation ID is required",
        },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid conversation ID",
        },
        { status: 400 }
      );
    }

    // 5. Check conversation
    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: currentUser._id,
    }).lean();

    if (!conversation) {
      return NextResponse.json(
        {
          success: false,
          message: "Conversation not found",
        },
        { status: 404 }
      );
    }

    // 6. Get messages
    const messages = await Message.find({
      conversationId: conversationId,
    })
      .sort({ createdAt: 1 })
      .lean();

    // 7. Get sender user IDs
    const senderIds = [
      ...new Set(
        messages.map((message) => String(message.sender))
      ),
    ];

    // 8. Find users
    const senders = await userlog
      .find({
        _id: {
          $in: senderIds,
        },
      })
      .select("_id email")
      .lean();

    // 9. Get sender emails
    const senderEmails = senders
      .map((user) => user.email?.toLowerCase())
      .filter(Boolean);

    // 10. Find profiles
    const profiles = await Profile.find({
      email: {
        $in: senderEmails,
      },
    })
      .select("_id email username images branch semester")
      .lean();

    // 11. Create profile map
    const profileMap = new Map(
      profiles.map((profile) => [
        profile.email?.toLowerCase(),
        profile,
      ])
    );

    // 12. Create sender map
    const senderMap = new Map(
      senders.map((user) => [
        String(user._id),
        user,
      ])
    );

    // 13. Enrich messages
    const enrichedMessages = messages.map((message) => {
      const sender = senderMap.get(
        String(message.sender)
      );

      const profile = sender
        ? profileMap.get(
            sender.email?.toLowerCase()
          )
        : null;

      return {
        ...message,

        sender: {
          _id: sender?._id || message.sender,
          email: sender?.email || "",
          username: profile?.username || "Unknown User",
          images: profile?.images || [],
          branch: profile?.branch || "",
          semester: profile?.semester || "",
          profileId: profile?._id || null,
        },
      };
    });

    return NextResponse.json({
      success: true,
      currentUserId: currentUser._id,
      conversationId: conversation._id,
      messages: enrichedMessages,
    });
  } catch (error) {
    console.error(
      "GET MESSAGES ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to fetch messages",
      },
      { status: 500 }
    );
  }
}


// =====================================================
// SEND MESSAGE
// =====================================================
export async function POST(request, { params }) {
  try {
    await connectDB();

    // 1. Get logged-in user
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

    // 2. Find current user
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
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // 3. IMPORTANT:
    // params is a Promise
    const { conversationId } = await params;

    console.log(
      "POST conversationId:",
      conversationId
    );

    // 4. Validate ID
    if (!conversationId) {
      return NextResponse.json(
        {
          success: false,
          message: "Conversation ID is required",
        },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid conversation ID",
        },
        { status: 400 }
      );
    }

    // 5. Check conversation membership
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

    // 6. Get request body
    const body = await request.json();

    const text = body?.text?.trim();

    if (!text) {
      return NextResponse.json(
        {
          success: false,
          message: "Message cannot be empty",
        },
        { status: 400 }
      );
    }

    // 7. Create message
    const message = await Message.create({
      conversationId: conversation._id,
      sender: currentUser._id,
      text,
    });

    // 8. Update conversation
    conversation.lastMessage = text;
    conversation.lastMessageAt = new Date();

    await conversation.save();

    // 9. Get sender profile
    const profile = await Profile.findOne({
      email: currentUser.email.toLowerCase(),
    })
      .select(
        "_id email username images branch semester"
      )
      .lean();

    // 10. Return enriched message
    return NextResponse.json({
      success: true,
      message: {
        ...message.toObject(),

        sender: {
          _id: currentUser._id,
          email: currentUser.email,
          username:
            profile?.username || "Unknown User",
          images: profile?.images || [],
          branch: profile?.branch || "",
          semester: profile?.semester || "",
          profileId: profile?._id || null,
        },
      },
    });
  } catch (error) {
    console.error(
      "POST MESSAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to send message",
      },
      { status: 500 }
    );
  }
}