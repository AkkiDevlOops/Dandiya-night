// app/api/users/males/route.js
import  connectDB  from '@/lib/db.js';
import  Profile  from '@/models/profile'; // 👈 Import your actual User/Profile model
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
      const cookieStore = await cookies();
      const tokenCookie = cookieStore.get("auth_token");
      const sessionUser = JSON.parse(tokenCookie.value);
      const sessionId = sessionUser.id; 

      console.log(sessionId)
    // 1. Ensure your app is actively connected to MongoDB
    await connectDB();

    const alreadyusername = await Profile.findOne({ id: sessionId });
    
    console.log(alreadyusername)
    

    // 3. Return the array list to the frontend
    return NextResponse.json({
      success: true,
      users: alreadyusername
    }); }

  catch (error) {
    console.error("Failed to fetch male users:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" }, 
      { status: 500 }
    );
  }
}
