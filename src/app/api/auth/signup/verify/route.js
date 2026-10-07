import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import { userlog } from "@/models/Registration";

export async function POST(request) {
  try {
    await connectDB();

    const data = await request.json();

    let { number, otp } = data;

    // =========================
    // VALIDATION
    // =========================

    if (!number) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number is required.",
        },
        { status: 400 }
      );
    }

    if (!otp) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP is required.",
        },
        { status: 400 }
      );
    }

    // Normalize number
    number = String(number).replace(/\D/g, "");

    if (number.length === 10) {
      number = `+91${number}`;
    }

    otp = String(otp).trim();

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP must be 6 digits.",
        },
        { status: 400 }
      );
    }

    // =========================
    // FIND USER
    // =========================

    const existingUser = await userlog.findOne({
      mobileNumber: number,
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found. Please request OTP again.",
        },
        { status: 404 }
      );
    }

    // =========================
    // CHECK OTP
    // =========================

    const storedOtp =
      existingUser.tokenDetails?.tempOtp;

    const otpExpiresAt =
      existingUser.tokenDetails?.otpExpiresAt;

    if (!storedOtp || !otpExpiresAt) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP not found. Please request a new OTP.",
        },
        { status: 400 }
      );
    }

    // =========================
    // CHECK EXPIRY
    // =========================

    if (new Date() > new Date(otpExpiresAt)) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP has expired. Please request a new OTP.",
        },
        { status: 400 }
      );
    }

    // =========================
    // COMPARE OTP
    // =========================

    if (storedOtp !== otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP.",
        },
        { status: 400 }
      );
    }

    // =========================
    // CREATE JWT
    // =========================

    const sessionToken = jwt.sign(
      {
        email: existingUser.email || null,
        mobileNumber: existingUser.mobileNumber,
        userId: existingUser._id.toString(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "11d",
      }
    );

    // =========================
    // UPDATE USER
    // =========================

    existingUser.tokenDetails = {
      ...(existingUser.tokenDetails || {}),

      currentToken: sessionToken,

      tempOtp: null,
      otpExpiresAt: null,

      isLoggedIn: true,

      updatedAt: new Date(),
    };

    existingUser.markModified("tokenDetails");

    await existingUser.save();

    // =========================
    // RESPONSE
    // =========================

    const response = NextResponse.json(
      {
        success: true,
        message: "Mobile number verified successfully.",

        user: {
          id: existingUser._id,
          mobileNumber: existingUser.mobileNumber,
        },
      },
      { status: 200 }
    );

    // =========================
    // SESSION COOKIE
    // =========================

    response.cookies.set("session", sessionToken, {
      httpOnly: true,

      secure:
        process.env.NODE_ENV === "production",

      sameSite: "lax",

      maxAge: 11 * 24 * 60 * 60,

      path: "/",
    });

    return response;
  } catch (error) {
    console.error("VERIFY SIGNUP OTP ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "OTP verification failed. Please try again.",
      },
      { status: 500 }
    );
  }
}