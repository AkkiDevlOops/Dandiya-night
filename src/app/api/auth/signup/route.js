// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';
import User from '@/models/user'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Parse registration data from the frontend request
    const data = await request.json();
    const { enrollmentNo, password } = data.current; 
    console.log(enrollmentNo);

   
    if (!enrollmentNo) {
      return NextResponse.json(
        { error: 'Please provide both enrollment' },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: 'Please provide password' },
        { status: 400 }
      );
    }

    if (password.length < 2) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

 

    // // 3. Verify if the user already exists in the database
    const existingUser = await User.findOne({ enrollmentNo: enrollmentNo });
    if (existingUser) {
        console.log(existingUser);
    }

    const dbpassword = existingUser.password;

     if(existingUser.password){
      const compare = await bcrypt.compare(password,dbpassword);
      if(!compare){
        return NextResponse.json(
        { error: 'Password not correct' },
        { status: 400 }
      );
      }
     }

    if(!existingUser.password){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findByIdAndUpdate(
  existingUser._id, 
  { password: hashedPassword }, // 👈 Added a comma here
  { 
    new: true,           
    runValidators: true  
  }
);

  

    console.log(updatedUser)
    }

     const response = NextResponse.json(
      { 
        message: 'Account created and logged in successfully!', 
        user: { name: existingUser.name } 
      },
      { status: 201 }
    );

    
   if(existingUser){
    // 6. Generate the JWT Token for immediate login session
    const token = jwt.sign(
      { userId:existingUser._id, enroll: existingUser.enrollmentNo }, // Data payload encoded inside token
      process.env.JWT_SECRET,                        // Secret encryption key from .env.local
      { expiresIn: '11d' }                            // Session duration (7 days)
    );

    const userSessionData = {
      id: existingUser._id,
      auth: true,
      enrollmentNo : existingUser.enrollmentNo,
      name:existingUser.name,
      token:token
    }


    // 8. Securely set the JWT inside an HttpOnly Cookie  
      response.cookies.set({
      name: 'auth_token',
      value: JSON.stringify(userSessionData),
      httpOnly: true,                         // Prevents front-end JavaScript scripts from stealing token data
      secure: process.env.NODE_ENV === 'production', // Requires HTTPS encryption in production environments
      sameSite: 'strict',                     // Cross-Site Request Forgery (CSRF) mitigation protection
      maxAge: 60 * 60 * 24 * 11,               // 7 days defined in seconds
      path: '/',                              // Cookie accessible across entire domain routing paths
    });

    localStorage.setItem("token", JSON.stringify(userSettings));
}
    // 7. Initialize the JSON response payload
  

  

    return response;

  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}
