// app/api/dashboard/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    // 1. Extract the token from cookies
    const tokenCookie = request.cookies.get('auth_token');
    const token = tokenCookie?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    // 2. Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Success! The user is verified. You have access to decoded.userId
    return NextResponse.json({ 
      message: 'Welcome to your private dashboard!',
      userId: decoded.userId 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}
