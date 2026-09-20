// app/api/profile/complete/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import Profile from '@/models/profile'
import connectDB from '@/lib/db';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';
// import { User } from '@/models/User'; // 👈 Import your actual Database Model here

export async function POST(request) {
  try {
    // 1. Authenticate the request via your secure cookie token
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("auth_token")?.value;

     if (!tokenCookie) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }
    
     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(tokenCookie, secret);

    await connectDB();

   

    // Optional: Extract the logged-in user's identifier from the cookie string/JWT
    // For this example, let's assume the token parsed out a userId or email
    const sessionUser = payload;
    const sessionId = sessionUser.userId; 
    console.log(sessionId);

    

    // 2. Parse the payload data sent from your frontend form handler
    const body = await request.json();
    const { username, branch, semester, college, gender, email } = body;

    // 3. 🛡️ Strict Backend Validation (Matches your frontend state constraints)
    if (!username || !username.trim() || username.trim().length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters long." }, { status: 400 });
    }
    if (!branch) {
      return NextResponse.json({ error: "Branch selection is required." }, { status: 400 });
    }
    if (!semester) {
      return NextResponse.json({ error: "Semester selection is required." }, { status: 400 });
    }
    if (!college) {
      return NextResponse.json({ error: "College selection is required." }, { status: 400 });
    }
    if (!gender) {
      return NextResponse.json({ error: "Gender selection is required." }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ error: "Email address is required." }, { status: 400 });
    }

    // console.log(body);

    const alreadyusername = await Profile.findOne({ username: username });

    if(alreadyusername){
        return NextResponse.json({ error: "username already registered." }, { status: 400 });
    }

     const alreadyemail = await Profile.findOne({ email : email });

    if(alreadyemail){
        return NextResponse.json({ error: "email already registered." }, { status: 400 });
    }


    // 4. Update the user document inside your database
    // Mock database update query structure:

      // const { username, branch, semester, college, gender, email } = body;
  
     const newProfile = new Profile({
      id:sessionId,
      username: username.trim(),
      branch: branch,
      intrest: [],
      height:'',
      promt1:'',
      promt2:'',
      semester:semester,
      college: college,
      gender:gender,
      email: email.trim(),
    });
    await newProfile.save();

    console.log("new profile"+newProfile);

    console.log("Saving user profile to database:", body);

      const token = jwt.sign(
          { userId: sessionId ,
          name : sessionUser.name,
          insertedData1:true} ,// Data encoded inside the token
          process.env.JWT_SECRET,                  // Secret key
          { expiresIn: '11d' }                      // Token lifespan (e.g., 7 days)
        );

    // 5. Send success response back to trigger frontend route shifts
    const response = NextResponse.json({ 
      success: true, 
      message: "Profile completed successfully!",
    });

     response.cookies.set({
      name: 'profile1token',
      value:token, // Store user info + token
      httpOnly: true,                         // Prevents frontend JavaScript from stealing the token
      secure: process.env.NODE_ENV === 'production', // Requires HTTPS in production
      sameSite: 'strict',                     // Protection against CSRF attacks
      maxAge: 60 * 60 * 24 * 11,               // 7 days in seconds
      path: '/',
    });

    return response;

  } catch (error) {
    console.error("Profile Completion API Error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
