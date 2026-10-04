import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Conversation from "@/models/Conversation";
import Message from "@/models/Message";
import { getUserFromRequest } from "@/lib/gettoken";

export async function GET(request, { params }) {
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

    const conversationId =
      params.conversationId;

    // Check whether user belongs to conversation
    const conversation =
      await Conversation.findOne({
        _id: conversationId,

        participants: user.userId,
      });

    if (!conversation) {
      return NextResponse.json(
        {
          success: false,
          message: "Conversation not found",
        },
        {
          status: 404,
        }
      );
    }

    const messages =
      await Message.find({
        conversationId,
      })
        .populate(
          "sender",
          "name username profileImage images"
        )
        .sort({
          createdAt: 1,
        });

    return NextResponse.json({
      success: true,
      messages,
    });

  } catch (error) {
    console.error(
      "Get Messages Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to get messages",
      },
      {
        status: 500,
      }
    );
  }
}
export async function POST(request, { params }) {
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

    const conversationId =
      params.conversationId;

    const body = await request.json();

    const text = body.text?.trim();

    if (!text) {
      return NextResponse.json(
        {
          success: false,
          message: "Message cannot be empty",
        },
        {
          status: 400,
        }
      );
    }

    // Check conversation access
    const conversation =
      await Conversation.findOne({
        _id: conversationId,
        participants: user.userId,
      });

    if (!conversation) {
      return NextResponse.json(
        {
          success: false,
          message: "Conversation not found",
        },
        {
          status: 404,
        }
      );
    }

    // Create message
    const newMessage =
      await Message.create({
        conversationId,
        sender: user.userId,
        text,
      });

    // Update conversation
    conversation.lastMessage = text;
    conversation.lastMessageAt =
      new Date();

    await conversation.save();

    // Populate sender before returning
    await newMessage.populate(
      "sender",
      "name username profileImage images"
    );

    return NextResponse.json(
      {
        success: true,
        message: newMessage,
      },
      {
        status: 201,
      }
    );

  } catch (error) {
    console.error(
      "Send Message Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message",
      },
      {
        status: 500,
      }
    );
  }
}