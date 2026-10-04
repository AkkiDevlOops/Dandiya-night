import { NextResponse } from "next/server";
import { userlog } from "@/models/Registration";
import connectDB from "@/lib/db";
import Registration from "@/models/Registration";
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { email, otp,number } = await request.json();

    const payload = {
  email: email,
};

    // 1. Validate input
    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and OTP are required",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const enteredOtp = otp.toString().trim();

    if (!/^\d{6}$/.test(enteredOtp)) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP must be a 6-digit code",
        },
        { status: 400 }
      );
    }

    // 2. Connect to MongoDB
    await connectDB();

    // 3. Find the user/registration
    const user = await userlog.findOne({
            $or: [
        { email: normalizedEmail },
        { mobileNumber: number }
      ]
        });
    
        console.log(user.tokenDetails.tempOtp);
       

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // 4. Check whether an OTP exists
    if (!user.tokenDetails.tempOtp || !user.tokenDetails.otpExpiresAt) {
      return NextResponse.json(
        {
          success: false,
          message: "No active verification code. Please request a new OTP.",
        },
        { status: 400 }
      );
    }

     const sessionToken = jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        { expiresIn: '11d' } // 🚀 Valid for exactly 11 days
      );

    // 5. Check OTP expiry
   if (new Date() > new Date(user.tokenDetails.otpExpiresAt)) {
      user.tokenDetails.tempOtp = null;
      user.tokenDetails.otpExpiresAt = null;
      await user.save();


      return NextResponse.json(
        {
          success: false,
          message: "OTP has expired. Please request a new one.",
        },
        { status: 400 }
      );
    }

    // 6. Compare OTP
    if (user.tokenDetails.tempOtp !== enteredOtp) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP",
        },
        { status: 401 }
      );
    }

    // // 7. OTP is valid
    // user.tokenDetails.tempOtp = null;
    // user.tokenDetails.otpExpiresAt = null;

    // Mark verification/login status
    user.tokenDetails.isLoggedIn = true;

    await user.save();
    const response = NextResponse.json({
      success: true,
      message: "OTP verified successfully",
      token : user.tokenDetails,
    });

    console.log("otp verified success")
    // 8. Return success
     response.cookies.set('session', sessionToken, {
    httpOnly: true, // 🛡️ Shields the cookie from frontend JS (XSS defense)
    value: sessionToken,
    secure: process.env.NODE_ENV === 'production', // Requires HTTPS in production
    sameSite: 'lax', // Protects against Cross-Site Request Forgery (CSRF)
    maxAge: 7 * 24 * 60 * 60, // 🚀 604,800 seconds (Lifespan: 7 Days)
    path: '/', // Accessible across your entire web application
  });

    return response;
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while verifying OTP",
      },
      { status: 500 }
    );
  }
}