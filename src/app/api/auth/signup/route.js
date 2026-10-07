import crypto from "crypto";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { userlog } from "@/models/Registration";


export async function POST(request) {
  try {
    await connectDB();

    const data = await request.json();

    let { number } = data;

    // =========================
    // VALIDATE NUMBER
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

    // Remove spaces, +91, -, etc.
    number = String(number).replace(/\D/g, "");

    // If frontend sends 10 digits
    if (number.length === 10) {
      number = `+91${number}`;
    }

    // Indian number validation
    if (!/^\+91[6-9]\d{9}$/.test(number)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid Indian mobile number.",
        },
        { status: 400 }
      );
    }

    // =========================
    // CHECK EXISTING USER
    // =========================

    const existingUser = await userlog.findOne({
      mobileNumber: number,
    });

    // =========================
    // GENERATE OTP
    // =========================

    const otp = crypto
      .randomInt(100000, 1000000)
      .toString();

    const otpExpiresAt = new Date(
      Date.now() + 5 * 60 * 1000
    );

    // =========================
    // EXISTING USER
    // =========================

    if (existingUser) {
      existingUser.tokenDetails = {
        ...(existingUser.tokenDetails || {}),
        tempOtp: otp,
        otpExpiresAt: otpExpiresAt,
        updatedAt: new Date(),
      };

      existingUser.markModified("tokenDetails");

      await existingUser.save();
    }

    // =========================
    // NEW USER
    // =========================

    else {
      const newUser = new userlog({
        mobileNumber: number,

        tokenDetails: {
          tempOtp: otp,
          otpExpiresAt: otpExpiresAt,

          isFirstPhaseCompleted: false,
          isPhotoUploaded: false,
          isProfileFullyUpdated: false,
          isLoggedIn: false,
        },
      });

      await newUser.save();
    }

    // =========================
    // SEND OTP
    // =========================

    await sendOtpSMS(number, otp);

    return NextResponse.json(
      {
        success: true,
        message: "OTP sent successfully.",
        mobileNumber: `${number.slice(0, 3)}******${number.slice(-2)}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("SIGNUP OTP ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send OTP. Please try again.",
      },
      { status: 500 }
    );
  }
}