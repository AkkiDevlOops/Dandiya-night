
// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await connectDB();
    const { enrollmentNo, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // 1. Find user and verify password
    const user = await User.findOne({ enrollmentNo: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 2. Generate the JWT Token payload
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Data encoded inside the token
      process.env.JWT_SECRET,                  // Secret key
      { expiresIn: '7d' }                      // Token lifespan (e.g., 7 days)
    );

    // 3. Create the response object
    const response = NextResponse.json(
      { message: 'Login successful', user: { id: user._id, email: user.email } },
      { status: 200 }
    );

    // 4. Securely set the JWT inside an HttpOnly Cookie
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,                         // Prevents frontend JavaScript from stealing the token
      secure: process.env.NODE_ENV === 'production', // Requires HTTPS in production
      sameSite: 'strict',                     // Protection against CSRF attacks
      maxAge: 60 * 60 * 24 * 7,               // 7 days in seconds
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
